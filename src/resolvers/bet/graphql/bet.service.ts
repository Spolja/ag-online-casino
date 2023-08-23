import { container } from 'tsyringe'

import {
    Bet,
    User,
} from '../../../database/models/models'
import { SequelizeClient } from '../../../database/sequelize.client'
import { findOneOrThrow } from '../../../lib/find-one-or-throw'
import { logger } from '../../../lib/logger'

import { createBetMutationValidator } from './bet.validator'

export class BetService {
    constructor(private readonly database: SequelizeClient = container.resolve(SequelizeClient)) {}

    public async createBet(userId: number, amount: number, chance: number): Promise<Bet> {
        const user = await findOneOrThrow(User, { where: { id: userId } })
        const validated = createBetMutationValidator.parse({ amount, balance: user.balance, chance, userId })

        // Could be further more simplified
        const win = Math.random() <= 0.5

        const bet = Bet.build({
            amount: validated.amount,
            chance: validated.chance,
            createdAt: new Date(),
            payout: win ? (validated.amount / validated.chance) * 100 : 0,
            updatedAt: new Date(),
            userId,
            win,
        })

        if (bet.win) {
            user.balance += (bet.payout - bet.amount)
        } else {
            user.balance -= amount
        }

        await Promise.all([
            await bet.save(),
            await user.save(),
        ])

        logger.info(`Thank you for playing the game, you've ${win ? 'WON' : 'LOST'}, your updated balance is: ${user.balance}`)

        return bet
    }

    public async getBestBetsPerUser(limit: number): Promise<Bet[]> {
        return Bet.findAll({
            attributes: [
                'userId',
                [this.database.client.fn('MAX', this.database.client.col('payout')), 'payout'],
                'amount',
                'win',
                'chance',
                'id',
            ],
            group: ['userId'],
            include: [
                {
                    as: 'user',
                    attributes: [],
                    model: User,
                },
            ],
            limit,
            where: {
                win: true,
            },
        })
    }

    public async getBet(id: number): Promise<Bet> {
        return findOneOrThrow(Bet, { where: { id } })
    }

    public async getBetList(): Promise<Bet[]> {
        return Bet.findAll()
    }

    public async getBetUser(userId: number): Promise<User> {
        return findOneOrThrow(User, { where: { id: userId } })
    }
}
