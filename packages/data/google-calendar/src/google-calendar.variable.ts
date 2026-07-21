import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleCalendarBaseUrlSchema = z.enum(["https://www.googleapis.com/calendar/v3"]).default("https://www.googleapis.com/calendar/v3")

wireVariable({
  name: 'GOOGLE_CALENDAR_BASE_URL',
  displayName: 'Google Calendar Base URL',
  description: 'The base URL for the Google Calendar API.',
  variableId: 'GOOGLE_CALENDAR_BASE_URL',
  schema: googleCalendarBaseUrlSchema,
})
