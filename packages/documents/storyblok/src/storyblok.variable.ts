import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const storyblokBaseUrlSchema = z.enum(["https://mapi.storyblok.com"]).default("https://mapi.storyblok.com")

defineVariable({
  name: 'STORYBLOK_BASE_URL',
  displayName: 'Storyblok Base URL',
  description: 'The base URL for the Storyblok API.',
  variableId: 'STORYBLOK_BASE_URL',
  schema: storyblokBaseUrlSchema,
})
