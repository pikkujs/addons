import { WebhookSigningSecret } from '@pikku/core/hmac'
import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleCalendarService } from './google-calendar-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleCalendar')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Calendar connection — connect Google Calendar first')
    }
    const googleCalendar = new GoogleCalendarService(cred, variables)

    return { googleCalendar }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  googleCalendarWebhookSecret: new WebhookSigningSecret(
    'Google Calendar',
    await secrets
      .getSecret('GOOGLE_CALENDAR_WEBHOOK_CHANNEL_TOKEN')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
