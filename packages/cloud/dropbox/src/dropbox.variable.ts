import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const dropboxBaseUrlSchema = z.enum(["https://api.dropbox.com/2"]).default("https://api.dropbox.com/2")

defineVariable({
  name: 'DROPBOX_BASE_URL',
  displayName: 'Dropbox Base URL',
  description: 'The base URL for the Dropbox API.',
  variableId: 'DROPBOX_BASE_URL',
  schema: dropboxBaseUrlSchema,
})
