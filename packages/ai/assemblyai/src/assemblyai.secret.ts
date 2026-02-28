import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const assemblyaiSecretsSchema = z.string().describe('AssemblyAI API Key')

export type AssemblyaiSecrets = z.infer<typeof assemblyaiSecretsSchema>

wireSecret({
  name: 'api_key',
  displayName: 'AssemblyAI API Key',
  description: 'AssemblyAI API key for speech-to-text',
  secretId: 'ASSEMBLYAI_API_KEY',
  schema: assemblyaiSecretsSchema,
})
