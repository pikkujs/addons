import OpenAI from 'openai'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecretJSON<string>('OPENAI_API_KEY')
  const openai = new OpenAI({ apiKey })

  return { openai }
})
