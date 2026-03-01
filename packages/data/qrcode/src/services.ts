import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (_config, { content }) => {
  if (!content) {
    throw new Error('Content service is required for the qrcode addon')
  }
  return {
    content,
  }
})
