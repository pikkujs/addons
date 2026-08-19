import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AutocompleteTagsPostInput = z.object({
  name: z.string().optional().describe("A substring of a tag to search for. Example: \"att\""),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
})

export const AutocompleteTagsPostOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const autocompleteTagsPost = pikkuSessionlessFunc({
  description: "Returns an array of registered and recent tag names that start with the characters specified in the `name` parameter. This includes tags where any word within the tag (separated by underscores, hyphens, spaces, or other punctuation) starts with the specified characters. You must specify at least 2 characters.\n\nThis endpoint accepts the same parameters as the [GET method](#search-tags) but they are specified in the request body instead of the query string.\n\n#### How tag matching works\n\nWhen tags contain delimiters like underscores, hyphens, or spaces, each word is indexed separately. A tag matches if the tag itself or any word within it starts with your search term.\n\nFor example, searching for `trig` will match the tag `set_by_this_trigger` because one of its words (\"trigger\") starts with \"trig\". However, searching for `rigger` won't match this tag because neither the full tag nor any of its individual words (\"set\", \"by\", \"this\", \"trigger\") start with \"rigger\".\n\n#### Autocomplete limitations\n\nAutocomplete returns up to 15 suggestions from the most commonly used ticket tags in the last 60 days. Tags that match the prefix but aren't in that top set won't appear in the results.\n\n#### Allowed For\n\n* Agents",
  input: AutocompleteTagsPostInput,
  output: AutocompleteTagsPostOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/autocomplete/tags", data) as any
  },
})
