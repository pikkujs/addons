import { GrafanaService } from './grafana-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('GRAFANA_CREDENTIALS')
  const grafana = new GrafanaService(creds)

  return { grafana }
})
