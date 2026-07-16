import { GoogleBigQueryService } from './google-big-query-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleBigQuery = new GoogleBigQueryService(secrets, variables)

  return { googleBigQuery }
})
