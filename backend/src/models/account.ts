import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Investor from './investor';
import Investment from './investment';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Transaction from './transaction';

@Table({
    timestamps: true,
    tableName: 'account'
})
export default class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @Column({
        type: DataType.ENUM('USD', 'EUR', 'GBP', 'JPY', 'INR'),
        allowNull: false,
    })
    currency!: string;

    @ForeignKey(() => Investor)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    investorId!: number | null;

    @BelongsTo(() => Investor)
    investor?: Investor;

    @HasMany(() => Transaction)
    transactions?: Transaction[];

    // Add the relationship for investments
    @HasMany(() => Investment)
    investments?: Investment[];
}