import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Project from './project';
import Resource from './resource';
@Table({
    timestamps: true,
    tableName: 'project_resource'
})
export default class ProjectResource extends Model<InferAttributes<ProjectResource>, InferCreationAttributes<ProjectResource>> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    projectId!: number;

    @ForeignKey(() => Resource)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    resourceId!: number;
}