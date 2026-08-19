import OpenAI from 'openai'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const apiKey = (await secrets.getSecret('OPENAI_API_KEY')).reveal()
  const openai = new OpenAI({ apiKey })

  return { openai }
})
