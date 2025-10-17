import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entity/user.model';
import { CreationAttributes } from 'sequelize';
import { Leave } from './entity/leave.model';
import * as bcrypt from 'bcrypt'
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel:typeof User,@InjectModel(Leave) private leaveModel:typeof Leave,private jwtService:JwtService){}

   async addUser(name:string,email:string,password:string,role:string){
    const hash = await bcrypt.hash(password,10)
    return this.userModel.create({name,email,password:hash,role}as CreationAttributes<User>)
   }

   async login(email:string,password:string){
    const validUser =await  this.userModel.findOne({where:{email}});
    console.log('validuser',validUser)
    if(!validUser){
        throw new BadRequestException('user not found')
    }
    const hashPass = await bcrypt.compare(password,validUser.password);
    if(!hashPass){
        throw new NotFoundException('invalid Credentials')
    }
    const payload = {id:validUser.id,email:validUser.email,name:validUser.name,role:validUser.role}
    console.log('payload:',payload)
    const token =this.jwtService.sign(payload);
    return {
        access_token :token
    }
   }

   applyLeave(userId:number,startDate:string,endDate:string,leaveType:('casualLeave'|'sickLeave'),status:string){
    return this.leaveModel.create({userId,startDate,endDate,leaveType,status}as unknown as CreationAttributes<Leave>)
   }

   async approveStatus(id:number,status:'approved' | 'rejected'){
    const employee =await this.leaveModel.findOne({where:{id}});

    if(!employee){
        throw new BadRequestException('employee not found')
    }
    employee.status = status;
    await employee.save();

    return employee;
   
   }

   async allPendingLeaves(){
    return this.leaveModel.findAll({where:{status:"pending"},  include: [
    {
      model: User,
      attributes: ['name', 'email'],
    },
  ],})
   }

  async viewLeaves() {
  return this.leaveModel.findAll({
    include: [
      {
        model: this.userModel,
        attributes: ['id', 'name', 'email'],
      },
    ],
    order: [['id', 'DESC']],
  });
}


   async employeeView(userId:number){
   const employeeId = await  this.leaveModel.findAll({where:{userId}})
   console.log('employeewitb ID',employeeId)
   return employeeId;
   }
}
