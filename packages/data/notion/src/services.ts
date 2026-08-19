import { NotionService } from './notion-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { variables }
) => {
  const notion = new NotionService(variables)

  return { notion }
})
