import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const zulipBaseUrlSchema = z.enum(["https://your-org.zulipchat.com/api/v1"]).default("https://your-org.zulipchat.com/api/v1")

wireVariable({
  name: 'ZULIP_BASE_URL',
  displayName: 'Zulip Base URL',
  description: 'The base URL for the Zulip API.',
  variableId: 'ZULIP_BASE_URL',
  schema: zulipBaseUrlSchema,
})
