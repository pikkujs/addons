import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTemplatesLookupInput = z.object({
  slug: z.string().describe("The slug of the template to get the fallback for"),
  is_custom: z.string().optional().describe("Indicates if a template is custom or part of the template hierarchy"),
  template_prefix: z.string().optional().describe("The template prefix for the created template. This is used to extract the main template type, e.g. in `taxonomy-books` extracts the `taxonomy`"),
})

export const listTemplatesLookup = pikkuSessionlessFunc({
  input: ListTemplatesLookupInput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/templates/lookup", data)
  },
})
