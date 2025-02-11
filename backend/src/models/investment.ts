import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Account from './account';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
@Table({
    timestamps: true,
    tableName: 'investment'
})
export default class Investment extends Model<InferAttributes<Investment>, InferCreationAttributes<Investment>> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @Column({
        type: DataType.ENUM('variable', 'fixed'),
        allowNull: false,
    })
    investmentType!: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    amount!: number;

    @ForeignKey(() => Account)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    accountId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    modifiedBy?: string;

    @BelongsTo(() => Account)
    account?: Account;
}