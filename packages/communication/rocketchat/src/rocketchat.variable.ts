import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const rocketchatBaseUrlSchema = z.enum(["https://your-instance.rocket.chat/api/v1"]).default("https://your-instance.rocket.chat/api/v1")

defineVariable({
  name: 'ROCKETCHAT_BASE_URL',
  displayName: 'RocketChat Base URL',
  description: 'The base URL for the RocketChat API.',
  variableId: 'ROCKETCHAT_BASE_URL',
  schema: rocketchatBaseUrlSchema,
})
