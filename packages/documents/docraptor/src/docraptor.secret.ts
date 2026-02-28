import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const docraptorSecretsSchema = z.string()
  .describe('DocRaptor API key')

export type DocraptorSecrets = z.infer<typeof docraptorSecretsSchema>

wireSecret({
  name: 'docraptor',
  displayName: 'DocRaptor API Key',
  description: 'API key for DocRaptor document generation',
  secretId: 'DOCRAPTOR_CREDENTIALS',
  schema: docraptorSecretsSchema,
})
