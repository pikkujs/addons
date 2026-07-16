// search — Look for stuff on GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const SearchUsersInput = z.object({
  q: z.string().describe("The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/reference/search#constructing-a-search-query). See \"[Searching users](https://docs.github.com/search-github/searching-on-github/searching-users)\" for a detailed list of qualifiers."),
  sort: z.enum(["followers", "repositories", "joined"]).optional().describe("Sorts the results of your query by number of `followers` or `repositories`, or when the person `joined` GitHub. Default: [best match](https://docs.github.com/rest/reference/search#ranking-search-results)"),
  order: z.enum(["desc", "asc"]).optional().default("desc").describe("Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const SearchUsersOutput = z.object({
  incomplete_results: z.boolean(),
  items: z.array(z.object({
    avatar_url: z.string().url(),
    bio: z.string().nullable().optional(),
    blog: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    created_at: z.string().datetime().optional(),
    email: z.string().email().nullable().optional(),
    events_url: z.string(),
    followers: z.number().int().optional(),
    followers_url: z.string().url(),
    following: z.number().int().optional(),
    following_url: z.string(),
    gists_url: z.string(),
    gravatar_id: z.string().nullable(),
    hireable: z.boolean().nullable().optional(),
    html_url: z.string().url(),
    id: z.number().int(),
    location: z.string().nullable().optional(),
    login: z.string(),
    name: z.string().nullable().optional(),
    node_id: z.string(),
    organizations_url: z.string().url(),
    public_gists: z.number().int().optional(),
    public_repos: z.number().int().optional(),
    received_events_url: z.string().url(),
    repos_url: z.string().url(),
    score: z.number(),
    site_admin: z.boolean(),
    starred_url: z.string(),
    subscriptions_url: z.string().url(),
    suspended_at: z.string().datetime().nullable().optional(),
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
    type: z.string(),
    updated_at: z.string().datetime().optional(),
    url: z.string().url(),
  })),
  total_count: z.number().int(),
})

export const searchUsers = pikkuSessionlessFunc({
  description: "Find users via various criteria. This method returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination).\n\nWhen searching for users, you can get text match metadata for the issue **login**, public **email**, and **name** fields when you pass the `text-match` media type. For more details about highlighting search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata).\n\nFor example, if you're looking for a list of popular users, you might try this query:\n\n`q=tom+repos:%3E42+followers:%3E1000`\n\nThis query searches for users with the name `tom`. The results are restricted to users with more than 42 repositories and over 1,000 followers.",
  input: SearchUsersInput,
  output: SearchUsersOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/search/users", data) as any
  },
})
