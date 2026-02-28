import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const ollamaBaseUrlSchema = z.string().default('http://localhost:11434/v1').describe('Base URL for the Ollama API')

wireVariable({
  name: 'ollama_base_url',
  displayName: 'Ollama Base URL',
  description: 'Base URL for the Ollama API',
  variableId: 'OLLAMA_BASE_URL',
  schema: ollamaBaseUrlSchema,
})
