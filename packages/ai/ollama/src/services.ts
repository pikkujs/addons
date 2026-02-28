import { createOpenAI } from '@ai-sdk/openai'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (_config, { variables }) => {
  const baseURL = (await variables.get('OLLAMA_BASE_URL')) ?? 'http://localhost:11434/v1'

  const ollama = createOpenAI({
    baseURL,
    apiKey: 'ollama',
  })

  return { ollama }
})
