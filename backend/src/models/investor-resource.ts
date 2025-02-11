import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import Investor from './investor';
import Resource from './resource';
@Table({
    timestamps: true,
    tableName: 'investor_resource'
})
export default class InvestorResource extends Model<InferAttributes<InvestorResource>, InferCreationAttributes<InvestorResource>> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @ForeignKey(() => Resource)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    resourceId!: number;

    @ForeignKey(() => Investor)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    investorId!: number;
}