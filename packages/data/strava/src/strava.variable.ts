import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const stravaBaseUrlSchema = z.enum(["https://www.strava.com/api/v3"]).default("https://www.strava.com/api/v3")

wireVariable({
  name: 'STRAVA_BASE_URL',
  displayName: 'Strava Base URL',
  description: 'The base URL for the Strava API.',
  variableId: 'STRAVA_BASE_URL',
  schema: stravaBaseUrlSchema,
})
