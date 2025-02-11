import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'role'
})
export default class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
}