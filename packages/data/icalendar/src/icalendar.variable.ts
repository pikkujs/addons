// DELETE THIS FILE if the package has no configurable variables.
// Variables are for non-secret runtime configuration (base URLs, feature flags, etc.)

import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const icalendarVariableSchema = z.string().optional().describe('TODO: describe this variable')

wireVariable({
  name: 'icalendar_variable',
  displayName: 'ICalendar Variable',
  description: 'TODO: describe this variable',
  variableId: 'ICALENDAR_VARIABLE',
  schema: icalendarVariableSchema,
})
