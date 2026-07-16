import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const philipsHueBaseUrlSchema = z.enum(["https://philips-hue.local"]).default("https://philips-hue.local")

wireVariable({
  name: 'PHILIPS_HUE_BASE_URL',
  displayName: 'philipshue Base URL',
  description: 'The base URL for the philipshue API.',
  variableId: 'PHILIPS_HUE_BASE_URL',
  schema: philipsHueBaseUrlSchema,
})
