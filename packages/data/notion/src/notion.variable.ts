import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const notionBaseUrlSchema = z.enum(["https://api.notion.com"]).default("https://api.notion.com")

defineVariable({
  name: 'NOTION_BASE_URL',
  displayName: 'Notion Base URL',
  description: 'The base URL for the Notion API.',
  variableId: 'NOTION_BASE_URL',
  schema: notionBaseUrlSchema,
})
