import type {
    FindOptions,
    Model,
    ModelStatic,
} from 'sequelize'

// Used to encapsulated NOT_FOUND logic, could be separated in a Repository class of its own
export const findOneOrThrow = async <ModelType extends Model>(
    model: ModelStatic<ModelType>,
    options: FindOptions,
) => {
    const result = await model.findOne(options)

    if (!result) {
        throw new Error(`Entity with options: ${JSON.stringify(options)} not found`)
    }

    return result
}