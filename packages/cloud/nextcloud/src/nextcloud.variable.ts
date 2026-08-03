import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const nextcloudBaseUrlSchema = z.enum(["https://nextcloud.example.com"]).default("https://nextcloud.example.com")

defineVariable({
  name: 'NEXTCLOUD_BASE_URL',
  displayName: 'Nextcloud Base URL',
  description: 'The base URL for the Nextcloud API.',
  variableId: 'NEXTCLOUD_BASE_URL',
  schema: nextcloudBaseUrlSchema,
})
