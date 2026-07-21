import { NotionService } from './notion-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { variables }
) => {
  const notion = new NotionService(variables)

  return { notion }
})
