import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import Account from './account';
import Project from './project';
@Table({
    timestamps: true,
    tableName: 'transaction'
})
export default class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {

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
    details!: string

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    projectId!: number;

    @ForeignKey(() => Account)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    accountId!: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    amount!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    credited!: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    modifiedBy?: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    intrestRate!: number;

    @Column({
        type: DataType.DATE,
        allowNull: true, // Optional, allows flexibility
    })
    transactionDate?: Date;    
}