// User search — This resource represents various ways to search for and find users. Use it to obtain list of users including users assignable to projects and issues, users with permissions, user lists for pickup fields, and user lists generated using structured queries. Note that the operations in this resource only return users found within the first 1000 users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const FindUserKeysByQueryInput = z.object({
  query: z.string().describe("The search query."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(100).describe("The maximum number of items to return per page."),
})

export const FindUserKeysByQueryOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Returns *unknown* if the record is deleted and corrupted, for example, as the result of a server import."),
    key: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const findUserKeysByQuery = pikkuSessionlessFunc({
  description: "Finds users with a structured query and returns a [paginated](#pagination) list of user keys.\n\nThis operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and then returns only the users from that range that match the structured query. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the structured query, use [Get all users](#api-rest-api-3-users-search-get) and filter the records in your code.\n\n**[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n\nThe query statements are:\n\n *  `is assignee of PROJ` Returns the users that are assignees of at least one issue in project *PROJ*.\n *  `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the issues *PROJ-1* or *PROJ-2*.\n *  `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the issues *PROJ-1* or *PROJ-2*.\n *  `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the issues *PROJ-1* or *PROJ-2*.\n *  `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues *PROJ-1* or *PROJ-2*.\n *  `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment on the issues *PROJ-1* or *PROJ-2*.\n *  `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a transition on issues *PROJ-1* or *PROJ-2*.\n *  `[propertyKey].entity.property.path is \"property value\"` Returns users with the entity property value.\n\nThe list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ... PROJ-n)*. Statements can be combined using the `AND` and `OR` operators to form more complex queries. For example:\n\n`is assignee of PROJ AND [propertyKey].entity.property.path is \"property value\"`",
  input: FindUserKeysByQueryInput,
  output: FindUserKeysByQueryOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/search/query/key", data) as any
  },
})
