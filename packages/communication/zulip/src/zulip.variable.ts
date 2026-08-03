import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const zulipBaseUrlSchema = z.enum(["https://your-org.zulipchat.com/api/v1"]).default("https://your-org.zulipchat.com/api/v1")

defineVariable({
  name: 'ZULIP_BASE_URL',
  displayName: 'Zulip Base URL',
  description: 'The base URL for the Zulip API.',
  variableId: 'ZULIP_BASE_URL',
  schema: zulipBaseUrlSchema,
})
