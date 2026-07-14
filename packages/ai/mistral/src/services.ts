import { Mistral } from '@mistralai/mistralai'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecret('MISTRAL_API_KEY')
  const mistral = new Mistral({ apiKey })

  return { mistral }
})
