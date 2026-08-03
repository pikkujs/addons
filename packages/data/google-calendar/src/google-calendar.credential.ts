import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const googleCalendarTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleCalendarOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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

defineSecret({
  name: 'googleCalendarOAuthApp',
  displayName: 'Google Calendar OAuth App',
  description: 'OAuth2 app credentials for Google Calendar',
  secretId: 'GOOGLE_CALENDAR_OAUTH_APP',
  schema: googleCalendarOAuthAppSchema,
})
