import { GrafanaService } from './grafana-api.service.js'
import type { GrafanaSecrets } from './grafana.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<GrafanaSecrets>('GRAFANA_CREDENTIALS')
  const grafana = new GrafanaService(creds)

  return { grafana }
})
