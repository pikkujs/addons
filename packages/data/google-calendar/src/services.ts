import { GoogleCalendarService } from './google-calendar-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleCalendar = new GoogleCalendarService(secrets, variables)

  return { googleCalendar }
})
