import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import Project from './project';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'entity'
})
export default class Entity extends Model<InferAttributes<Entity>, InferCreationAttributes<Entity>> {

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
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    country!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    regId?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    ownerId?: string;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    settings?: { [key: string]: any };

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    caId?: string;

    @HasMany(() => Project)
    projects?: Project[];
}