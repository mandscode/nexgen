import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import User from './user';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Entity from './entity';

@Table({
    timestamps: true,
    tableName: 'user_entities'
})
export default class UserEntities extends Model<InferAttributes<UserEntities>, InferCreationAttributes<UserEntities>> {


    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @ForeignKey(() => Entity)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    entityId!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;
}