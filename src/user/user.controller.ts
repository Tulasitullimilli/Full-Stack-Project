import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from './guards/user.guard';
import { Roles } from './guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { LoggerInterceptor } from './interceptor/interceptor';

@UseInterceptors(LoggerInterceptor)
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('register')
    addUser(@Body() body:{name:string,email:string,password:string,role:string}){
        return this.userService.addUser(body.name,body.email,body.password,body.role)
    }

    @Post('login')
    login(@Body() body:{email:string,password:string}){
        return this.userService.login(body.email,body.password)
    }

    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @Roles('employee')
    @Post('leave')
    applyLeave(@Req() req,@Body() body:{startDate:string,endDate:string,leaveType:('casualLeave'|'sickLeave'),status:string}){
        return this.userService.applyLeave(req.user.id,body.startDate,body.endDate,body.leaveType,body.status)
    }

    
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @Roles('manager')
    @Patch(':id')
    approveStatus(@Param('id') id:number,@Body() body:{status:('approved'|'rejected')}){
        return this.userService.approveStatus(id,body.status)
    }

    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @Roles('manager')
    @Get('fetchmanager')
    allPendingList(){
        return this.userService.allPendingLeaves()
    }

   @UseGuards(AuthGuard('jwt'),RoleGuard)
    @Roles('hr')
    @Get('leaveReport')
    viewLeaves(){
        return this.userService.viewLeaves()
    }

    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @Roles('employee')
    @Get('employee')
    employeeView(@Req() req){
        return this.userService.employeeView(req.user.id)
    }
}
