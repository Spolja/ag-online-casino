import { Sequelize } from 'sequelize'
import { Database } from 'sqlite3'
import { singleton } from 'tsyringe'

import { logger } from '../lib/logger'

new Database('ag-online-casino.sqlite')

@singleton()
export class SequelizeClient {
    public readonly client: Sequelize

    constructor() {
        this.client = new Sequelize({
            dialect: 'sqlite',
            logging: logger.debug.bind(logger),
            storage: 'ag-online-casino.sqlite',
        })
    }

    public async connect(): Promise<void> {
        await this.client.authenticate()
        logger.info('Connection to the database established successfully!')
    }
}