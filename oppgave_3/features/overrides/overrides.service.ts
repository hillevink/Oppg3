import * as overrideRepo from './overrides.repository'

export const create = async ({id, day, name}) => {
  const override = await overrideRepo.exist({id, day, name})
  if (!override.status) return {status: false, error: override.error}

  if (override.data) {
    return {status: false, error: {message: 'Name already exists'}}
  }

  const createdOverride = await overrideRepo.create({id, day, name})

  if (!createdOverride.status) return {status: false, error: createdOverride.error}
  return {status: true, data: createdOverride.data}
}