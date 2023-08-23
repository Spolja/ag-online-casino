import {
    Bet,
    User,
} from '../../../database/models/models'
import { findOneOrThrow } from '../../../lib/find-one-or-throw'

export class UserService {
    public async getUser(id: number): Promise<User> {
        return findOneOrThrow<User>(User, { where: { id } })
    }

    public async getUserBets(userId: number): Promise<Bet[]> {
        return Bet.findAll({ where: { userId } })
    }

    public async getUserList(): Promise<User[]> {
        return User.findAll()
    }
}

