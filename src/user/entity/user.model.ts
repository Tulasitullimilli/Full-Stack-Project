import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Leave } from "./leave.model";

@Table({tableName:'user'})
export class User extends Model<User>{
    @AutoIncrement
    @PrimaryKey
    @Column({
        type:DataType.INTEGER
    })
    declare id:number;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare name:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare email:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare password:string;

    @Column({
        type:DataType.ENUM('employee','manager','hr'),
        allowNull:false
    })
    declare role:('employee'|'manager'|'hr')

    @HasMany(()=>Leave)
    leave:Leave;
}