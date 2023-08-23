import { Sequelize } from 'sequelize'
import { Database } from 'sqlite3'

import { logger } from '../lib/logger'

new Database('ag-online-casino.sqlite')
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: logger.debug.bind(logger),
    storage: 'ag-online-casino.sqlite',
})