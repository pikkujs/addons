import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const mauticBaseUrlSchema = z.enum(["https://your-instance.mautic.net/api"]).default("https://your-instance.mautic.net/api")

wireVariable({
  name: 'MAUTIC_BASE_URL',
  displayName: 'Mautic Base URL',
  description: 'The base URL for the Mautic API.',
  variableId: 'MAUTIC_BASE_URL',
  schema: mauticBaseUrlSchema,
})
