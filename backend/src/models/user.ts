import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, BelongsToMany } from 'sequelize-typescript';
import Role from './role';
import UserRole from './user-role';
import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Exclude } from 'class-transformer';
import Entity from './entity';
import UserEntities from './user-entities';

@Table({
    timestamps: true,
    tableName: 'user'
})
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: CreationOptional<number>;  // Auto-incrementing primary key

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    password?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isMasterAdmin!: boolean;

    @Column({
        type: DataType.JSON,
        allowNull: true
    })
    personalDetails?: { [key: string]: any };

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    googleId?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'active', // Example default value
    })
    status!: string;    

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    picture?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,  // Default to true for new users
    })
    isFirstLogin!: boolean;

    addRoles!: BelongsToManyAddAssociationMixin<Role[], number>;
    setRoles!: BelongsToManySetAssociationsMixin<Role[], number>;
    getRoles!: BelongsToManyGetAssociationsMixin<Role[]>;

    @Exclude()
    @BelongsToMany(() => Role, () => UserRole)
    roles?: Role[]


    addEntities!: BelongsToManyAddAssociationMixin<Entity[], number>;
    setEntities!: BelongsToManySetAssociationsMixin<Entity[], number>;
    getEntities!: BelongsToManyGetAssociationsMixin<Role[]>;

    @Exclude()
    @BelongsToMany(() => Entity, () => UserEntities)
    entities?: Entity[];
}