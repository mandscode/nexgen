import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'resource'
})
export default class Resource extends Model<InferAttributes<Resource>, InferCreationAttributes<Resource>> {

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
    location!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    sourceId?: string;

    @Column({
        type: DataType.ENUM('file', 'audio', 'video', 'pdf', 'doc', 'xls', 'ppt', 'image'),
        allowNull: false,
    })
    type!: string;

    @Column({
        type: DataType.ENUM('legal', 'broucher', 'misc'),
        allowNull: false,
    })
    group!: string;
}