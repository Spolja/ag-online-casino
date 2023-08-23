import type {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize'
import {
    DataTypes,
    Model,
} from 'sequelize'

import { sequelize } from '../sequelize.client'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare public balance: number

    declare public createdAt: Date

    declare public id: number

    declare public name: string

    declare public updatedAt: Date
}

User.init(
    {
        balance: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: DataTypes.STRING(128),
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'users',
    }
)