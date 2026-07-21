import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionTriggerButtonInput = z.object({
  tableId: z.string(),
  fieldId: z.string(),
  passThrough: z.boolean().optional().describe("Trigger AI action with custom record data provided in request body as rows"),
  customRows: z.array(z.unknown()).optional(),
  rowIds: z.array(z.string()).optional(),
  customField: z.record(z.string(), z.unknown()).optional(),
})

export const ActionTriggerButtonOutput = z.record(z.string(), z.unknown())

export const actionTriggerButton = pikkuSessionlessFunc({
  description: "Trigger a button action",
  input: ActionTriggerButtonInput,
  output: ActionTriggerButtonOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/tables/:tableId/button/:fieldId", data) as any
  },
})
