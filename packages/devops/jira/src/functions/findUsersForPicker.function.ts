// User search — This resource represents various ways to search for and find users. Use it to obtain list of users including users assignable to projects and issues, users with permissions, user lists for pickup fields, and user lists generated using structured queries. Note that the operations in this resource only return users found within the first 1000 users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, TooManyRequestsError } from '@pikku/core/errors'

export const FindUsersForPickerInput = z.object({
  query: z.string().describe("A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return. The total number of matched users is returned in `total`."),
  showAvatar: z.boolean().optional().default(false).describe("Include the URI to the user's avatar."),
  exclude: z.array(z.string()).optional().describe("This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  excludeAccountIds: z.array(z.string()).optional().describe("A list of account IDs to exclude from the search results. This parameter accepts a comma-separated list. Multiple account IDs can also be provided using an ampersand-separated list. For example, `excludeAccountIds=5b10a2844c20165700ede21g,5b10a0effa615349cb016cd8&excludeAccountIds=5b10ac8d82e05b22cc7d4ef5`. Cannot be provided with `exclude`."),
  avatarSize: z.string().optional(),
  excludeConnectUsers: z.boolean().optional().default(false),
})

export const FindUsersForPickerOutput = z.object({
  header: z.string().optional().describe("Header text indicating the number of users in the response and the total number of users found in the search."),
  total: z.number().int().optional().describe("The total number of users found in the search."),
  users: z.array(z.object({
    accountId: z.string().optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
    avatarUrl: z.string().url().optional().describe("The avatar URL of the user."),
    displayName: z.string().optional().describe("The display name of the user. Depending on the user’s privacy setting, this may be returned as null."),
    html: z.string().optional().describe("The display name, email address, and key of the user with the matched query string highlighted with the HTML bold tag."),
    key: z.string().optional().describe("This property is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
    name: z.string().optional().describe("This property is no longer available . See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  })).optional(),
}).describe("The list of users found in a search, including header text (Showing X of Y matching users) and total of matched users.")

export const findUsersForPicker = pikkuSessionlessFunc({
  description: "Returns a list of users whose attributes match the query term. The returned object includes the `html` field where the matched query term is highlighted with the HTML strong tag. A list of account IDs can be provided to exclude users from the results.\n\nThis operation takes the users in the range defined by `maxResults`, up to the thousandth user, and then returns only the users from that range that match the query term. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the query term, use [Get all users](#api-rest-api-3-users-search-get) and filter the records in your code.\n\nPrivacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the [Profile visibility overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls and calls by users without the required permission return search results for an exact name match only.",
  input: FindUsersForPickerInput,
  output: FindUsersForPickerOutput,
  errors: [BadRequestError, UnauthorizedError, TooManyRequestsError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/picker", data) as any
  },
})
