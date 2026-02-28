import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const grafanaSecretsSchema = z.object({
  apiKey: z.string().describe('Grafana API key'),
  baseUrl: z.string().describe('Grafana instance URL (e.g., https://your-grafana.com)'),
})

export type GrafanaSecrets = z.infer<typeof grafanaSecretsSchema>

wireSecret({
  name: 'grafana',
  displayName: 'Grafana API',
  description: 'Observability platform',
  secretId: 'GRAFANA_CREDENTIALS',
  schema: grafanaSecretsSchema,
})
