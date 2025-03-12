import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'currency'
})
export default class Currency extends Model<InferAttributes<Currency>, InferCreationAttributes<Currency>> {

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
        unique: true
    })
    code!: string; // Currency code (e.g., USD, EUR)

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string; // Currency name (e.g., US Dollar, Euro)

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    symbol!: string; // Currency symbol (e.g., $, €)
}
