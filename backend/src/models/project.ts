import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import Entity from './entity';
import ProjectResource from './project-resource';
import Resource from './resource';
import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'project'
})
export default class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {

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
        type: DataType.JSON,
        allowNull: false,
    })
    address!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    countryName!: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
    })
    latitude?: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
    })
    longitude?: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    startDate!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    actualMaturityDate?: Date;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
    })
    overallCost?: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    ownerName?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    legalId?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    maturityLockingPeriod?: number;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    settings?: { [key: string]: any };

    @ForeignKey(() => Entity)
    @Column
    entityID!: number;

    @BelongsTo(() => Entity)
    entity?: Entity;

    @BelongsToMany(() => Resource, () => ProjectResource)
    resources?: Resource[];

    getEntity!: BelongsToGetAssociationMixin<Entity>;

    addResources!: BelongsToManyAddAssociationMixin<Resource[], number>;
    getResources!: BelongsToManyGetAssociationsMixin<Resource[]>;
}