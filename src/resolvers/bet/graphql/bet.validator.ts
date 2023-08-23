import { z } from 'zod'

export const createBetMutationValidator = z.object({
    amount: z.number().min(1),
    balance: z.number(),
    chance: z.number().min(0)
        .max(100),
    userId: z.number().min(1),
}).refine((data) => {
    if (data.balance < data.amount) {
        throw new Error(`Not enough $$$ in your balance(${data.balance}), top up your balance before betting again!`)
    }

    return data
})
