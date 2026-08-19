// search — Look for stuff on GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SearchTopicsInput = z.object({
  q: z.string().describe("The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/reference/search#constructing-a-search-query)."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const SearchTopicsOutput = z.object({
  incomplete_results: z.boolean(),
  items: z.array(z.object({
    aliases: z.array(z.object({
      topic_relation: z.object({
        id: z.number().int().optional(),
        name: z.string().optional(),
        relation_type: z.string().optional(),
        topic_id: z.number().int().optional(),
      }).optional(),
    })).nullable().optional(),
    created_at: z.string().datetime(),
    created_by: z.string().nullable(),
    curated: z.boolean(),
    description: z.string().nullable(),
    display_name: z.string().nullable(),
    featured: z.boolean(),
    logo_url: z.string().url().nullable().optional(),
    name: z.string(),
    related: z.array(z.object({
      topic_relation: z.object({
        id: z.number().int().optional(),
        name: z.string().optional(),
        relation_type: z.string().optional(),
        topic_id: z.number().int().optional(),
      }).optional(),
    })).nullable().optional(),
    released: z.string().nullable(),
    repository_count: z.number().int().nullable().optional(),
    score: z.number(),
    short_description: z.string().nullable(),
    text_matches: z.array(z.object({
      fragment: z.string().optional(),
      matches: z.array(z.object({
        indices: z.array(z.number().int()).optional(),
        text: z.string().optional(),
      })).optional(),
      object_type: z.string().nullable().optional(),
      object_url: z.string().optional(),
      property: z.string().optional(),
    })).optional(),
    updated_at: z.string().datetime(),
  })),
  total_count: z.number().int(),
})

export const searchTopics = pikkuSessionlessFunc({
  description: "Find topics via various criteria. Results are sorted by best match. This method returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination). See \"[Searching topics](https://docs.github.com/articles/searching-topics/)\" for a detailed list of qualifiers.\n\nWhen searching for topics, you can get text match metadata for the topic's **short\\_description**, **description**, **name**, or **display\\_name** field when you pass the `text-match` media type. For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata).\n\nFor example, if you want to search for topics related to Ruby that are featured on https://github.com/topics. Your query might look like this:\n\n`q=ruby+is:featured`\n\nThis query searches for topics with the keyword `ruby` and limits the results to find only topics that are featured. The topics that are the best match for the query appear first in the search results.",
  input: SearchTopicsInput,
  output: SearchTopicsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/search/topics", data) as any
  },
})
