import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AutocompleteProblemsInput = z.object({
  text: z.string().optional().describe("The text to search for"),
})

export const AutocompleteProblemsOutput = z.record(z.string(), z.unknown())

export const autocompleteProblems = pikkuSessionlessFunc({
  description: "Returns tickets whose type is \"problem\" and whose subject contains the string specified in the `text` parameter.\n\nYou can specify the `text` parameter in the request body rather than the query string. Example:\n\n`{\"text\": \"fire\"}`\n\n#### Allowed For\n\n* Agents",
  input: AutocompleteProblemsInput,
  output: AutocompleteProblemsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/problems/autocomplete", data) as any
  },
})
