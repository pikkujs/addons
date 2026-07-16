import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const zoomBaseUrlSchema = z.enum(["https://api.zoom.us/v2"]).default("https://api.zoom.us/v2")

wireVariable({
  name: 'ZOOM_BASE_URL',
  displayName: 'Zoom Base URL',
  description: 'The base URL for the Zoom API.',
  variableId: 'ZOOM_BASE_URL',
  schema: zoomBaseUrlSchema,
})
