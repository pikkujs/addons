import { SlackService } from './slack-api.service.js'
import type { SlackSecrets } from './slack.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<SlackSecrets>('SLACK_CREDENTIALS')
  const slack = new SlackService(creds)

  return { slack }
})
