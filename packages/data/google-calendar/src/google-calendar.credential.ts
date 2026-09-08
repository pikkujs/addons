import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleCalendarTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'googleCalendar',
  displayName: 'Google Calendar',
  description: 'Google Calendar integration for Pikku',
  type: 'wire',
  schema: googleCalendarTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_CALENDAR_OAUTH_APP',
    tokenSecretId: 'GOOGLE_CALENDAR_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.events.readonly', 'https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/calendar.settings.readonly'],
  },
})
