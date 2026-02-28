import OpenAI from 'openai'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecretJSON<string>('OPENAI_API_KEY')
  const openai = new OpenAI({ apiKey })

  return { openai }
})
