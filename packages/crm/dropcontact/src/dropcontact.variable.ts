import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const dropcontactBaseUrlSchema = z.enum(["https://api.dropcontact.io"]).default("https://api.dropcontact.io")

wireVariable({
  name: 'DROPCONTACT_BASE_URL',
  displayName: 'Dropcontact Base URL',
  description: 'The base URL for the Dropcontact API.',
  variableId: 'DROPCONTACT_BASE_URL',
  schema: dropcontactBaseUrlSchema,
})
