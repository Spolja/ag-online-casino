import 'reflect-metadata'
import {
    Bet,
    User,
} from './database/models/models'
import { Server } from './server/server'

// Decided to sync DB with models here, could be resolved better with proper migrations.
void Promise.all([
    User.sync(),
    Bet.sync(),
    new Server().start(),
])