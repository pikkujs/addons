import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const openThesaurusBaseUrlSchema = z.enum(["https://www.openthesaurus.de"]).default("https://www.openthesaurus.de")

wireVariable({
  name: 'OPEN_THESAURUS_BASE_URL',
  displayName: 'openthesaurus Base URL',
  description: 'The base URL for the openthesaurus API.',
  variableId: 'OPEN_THESAURUS_BASE_URL',
  schema: openThesaurusBaseUrlSchema,
})
