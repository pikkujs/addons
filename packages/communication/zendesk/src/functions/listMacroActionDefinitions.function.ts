import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListMacroActionDefinitionsOutput = z.object({
  definitions: z.object({
    actions: z.array(z.record(z.string(), z.unknown())).optional(),
  }).optional(),
})

export const listMacroActionDefinitions = pikkuSessionlessFunc({
  description: "Returns the definitions of the actions a macro can perform. For example,\none action can set the status of a ticket. The definition of the action\nincludes a title (\"Status\"), a type (\"list\"), and possible values. For a\nlist of support actions, see [Actions reference](/documentation/ticketing/reference-guides/actions-reference).\n\n#### Allowed For\n\n* Agents",
  output: ListMacroActionDefinitionsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/macros/definitions") as any
  },
})
