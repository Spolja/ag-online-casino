import type {
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize'
import {
    DataTypes,
    Model,
} from 'sequelize'

import { SequelizeClient } from '../sequelize.client'

export class Bet extends Model<InferAttributes<Bet>, InferCreationAttributes<Bet>> {
    declare public amount: number

    declare public chance: number

    declare public createdAt: CreationOptional<Date>

    declare public id: CreationOptional<number>

    declare public payout: number

    declare public updatedAt: CreationOptional<Date>

    declare public userId: ForeignKey<User['id']>

    declare public win: boolean
}

Bet.init(
    {
        amount: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        chance: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        payout: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },
        win: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize: new SequelizeClient().client,
        tableName: 'bets',
    }
)

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare public balance: number

    declare public createdAt: CreationOptional<Date>

    declare public id: CreationOptional<number>

    declare public name: string

    declare public updatedAt: CreationOptional<Date>
}

User.init(
    {
        balance: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(128),
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },
    },
    {
        sequelize: new SequelizeClient().client,
        tableName: 'users',
    }
)

User.hasMany(Bet, {
    as: 'bets',
    foreignKey: 'userId',
    sourceKey: 'id',
})
Bet.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
})
