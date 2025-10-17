import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { toDefaultValue } from "sequelize/lib/utils";

@Table({tableName:"leavetReq"})
export class Leave extends Model<Leave>{
    @AutoIncrement
    @PrimaryKey
    @Column({
        type:DataType.INTEGER
    })
    declare id:number;

    @ForeignKey(()=>User)
    @Column({
        type:DataType.INTEGER
    })
    userId:number;

    @BelongsTo(()=>User)
    user:User;

    @Column({
        type:DataType.DATEONLY,
        allowNull:false
    })
    startDate:Date;

    @Column({
        type:DataType.DATEONLY,
        allowNull:false
    })
    endDate:Date;

    @Column({
        type:DataType.ENUM('casualLeave','sickLeave'),
        allowNull:false
    })
    leaveType:('casualLeave'|'sickLeave')

    @Column({
        type:DataType.ENUM('approved','rejected','pending'),
        allowNull:false,
        defaultValue:'pending'
    })
    declare status:('approved'|'rejected'|'pending')
}