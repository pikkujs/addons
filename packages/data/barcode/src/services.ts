import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (_config, { content }) => {
  if (!content) {
    throw new Error('Content service is required for the barcode addon')
  }
  return {
    content,
  }
})
