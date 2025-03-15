import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Investor from './investor';
import Investment from './investment';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Transaction from './transaction';
import Currency from './currency';

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
        type: DataType.INTEGER,
        allowNull: false,
    })
    currency!: number;

    @BelongsTo(() => Currency, { foreignKey: 'currency' }) // Map `currency` field to Currency
    currencyDetails?: Currency; // Add this property to access the Currency model

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