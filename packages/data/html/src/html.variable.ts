// DELETE THIS FILE if the package has no configurable variables.
// Variables are for non-secret runtime configuration (base URLs, feature flags, etc.)

import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const htmlVariableSchema = z.string().optional().describe('TODO: describe this variable')

wireVariable({
  name: 'html_variable',
  displayName: 'HTML Variable',
  description: 'TODO: describe this variable',
  variableId: 'HTML_VARIABLE',
  schema: htmlVariableSchema,
})
