import { SlackService } from './slack-api.service.js'
import type { SlackSecrets } from './slack.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<SlackSecrets>('SLACK_CREDENTIALS')
  const slack = new SlackService(creds)

  return { slack }
})
