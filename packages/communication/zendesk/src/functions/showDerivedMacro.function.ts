import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowDerivedMacroInput = z.object({
  macro_id: z.number().int().describe("The ID of the macro to replicate. Example: 25"),
  ticket_id: z.number().int().describe("The ID of the ticket from which to build a macro replica. Example: 35436"),
})

export const ShowDerivedMacroOutput = z.object({
  macro: z.object({
    actions: z.array(z.object({
      field: z.string().optional().describe("The name of a ticket field to modify"),
      value: z.string().optional().describe("The new value of the field"),
    })).describe("Each action describes what the macro will do. See [Actions reference](/documentation/ticketing/reference-guides/actions-reference)"),
    active: z.boolean().optional().describe("Useful for determining if the macro should be displayed"),
    created_at: z.string().datetime().optional().describe("The time the macro was created"),
    default: z.boolean().optional().describe("If true, the macro is a default macro"),
    description: z.string().nullable().optional().describe("The description of the macro"),
    id: z.number().int().optional().describe("The id automatically assigned when a macro is created"),
    position: z.number().int().optional().describe("The position of the macro"),
    raw_title: z.string().optional().describe("The raw format of the title of the macro"),
    restriction: z.record(z.string(), z.unknown()).nullable().optional().describe("Access to this macro. A null value allows unrestricted access for all users in the account"),
    title: z.string().describe("The title of the macro"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the macro"),
    url: z.string().optional().describe("A URL to access the macro's details"),
    app_installation: z.string().nullable().optional().describe("The app installation that requires each macro, if present"),
    categories: z.string().nullable().optional().describe("The macro categories"),
    permissions: z.string().nullable().optional().describe("Permissions for each macro"),
    usage_1h: z.number().int().optional().describe("The number of times each macro has been used in the past hour"),
    usage_7d: z.number().int().optional().describe("The number of times each macro has been used in the past week"),
    usage_24h: z.number().int().optional().describe("The number of times each macro has been used in the past day"),
    usage_30d: z.number().int().optional().describe("The number of times each macro has been used in the past thirty days"),
  }).optional(),
})

export const showDerivedMacro = pikkuSessionlessFunc({
  description: "Returns an unpersisted macro representation derived from a ticket or macro.\n\nThe endpoint takes one of the following query parameters: `macro_id` or `ticket_id`. If you include both, `macro_id` is used.\n\n#### Allowed For\n* Agents",
  input: ShowDerivedMacroInput,
  output: ShowDerivedMacroOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/macros/new", data) as any
  },
})
