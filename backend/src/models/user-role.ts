import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import Role from './role';
import User from './user';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'user_role'
})
export default class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {


    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    roleId!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;
}