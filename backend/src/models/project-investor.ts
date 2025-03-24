import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Investor from './investor';
import Project from './project';
@Table({
    timestamps: true,
    tableName: 'project_investor'
})
export default class ProjectInvestor extends Model<InferAttributes<ProjectInvestor>, InferCreationAttributes<ProjectInvestor>> {

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

    @ForeignKey(() => Investor)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    investorId!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    lockInPeriod!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    earning?: number;
}