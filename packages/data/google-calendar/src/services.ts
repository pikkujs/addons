import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleCalendarService } from './google-calendar-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

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
