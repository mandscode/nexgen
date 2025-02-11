import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';


@Table({
    timestamps: true,
    tableName: 'content'
})
export default class Content extends Model<InferAttributes<Content>, InferCreationAttributes<Content>> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    imageUrl?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description!: string;
}
