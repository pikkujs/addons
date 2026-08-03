import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleSlidesBaseUrlSchema = z.enum(["https://slides.googleapis.com/v1"]).default("https://slides.googleapis.com/v1")

defineVariable({
  name: 'GOOGLE_SLIDES_BASE_URL',
  displayName: 'Google Slides Base URL',
  description: 'The base URL for the Google Slides API.',
  variableId: 'GOOGLE_SLIDES_BASE_URL',
  schema: googleSlidesBaseUrlSchema,
})
