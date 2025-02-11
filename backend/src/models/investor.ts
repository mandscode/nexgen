import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import User from './user';
import Account from './account';
import Project from './project';
import ProjectInvestor from './project-investor';
import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import InvestorResource from './investor-resource';
import Resource from './resource';

@Table({
    timestamps: true,
    tableName: 'investor'
})
export default class Investor extends Model<InferAttributes<Investor>, InferCreationAttributes<Investor>> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    nomineeDetails?: { [key: string]: any };

    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    emergencyContact!: { [key: string]: any };

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    personalDetails?: { [key: string]: any };

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    documents?: { id: string; docName: string; docUrl: string; status: boolean }[]; // New documents field

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @BelongsTo(() => User)
    user?: User;

    @HasMany(() => Account)
    accounts?: Account[];

    @BelongsToMany(() => Project, () => ProjectInvestor)
    projects?: Project[];

    @BelongsToMany(() => Resource, () => InvestorResource)
    resources?: Resource[];

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    settings?: { [key: string]: any };


    addProjects!: BelongsToManyAddAssociationMixin<Project[], number>;
    setProjects!: BelongsToManySetAssociationsMixin<Project[], number>;
    getProjects!: BelongsToManyGetAssociationsMixin<Project[]>;

    addResources!: BelongsToManyAddAssociationMixin<Resource[], number>;
    getResources!: BelongsToManyGetAssociationsMixin<Resource[]>;
}