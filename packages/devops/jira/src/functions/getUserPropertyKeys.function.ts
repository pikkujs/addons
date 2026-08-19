// User properties — This resource represents [user](#api-group-Users) properties and provides for storing custom data against a user. Use it to get, create, and delete user properties as well as get a list of property keys for a user. This resourse is designed for integrations and apps to store per-user data and settings. This enables data used to customized the user experience to be kept in the Jira Cloud instance's database. User properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/). This resource does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetUserPropertyKeysInput = z.object({
  accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
  userKey: z.string().optional().describe("This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  username: z.string().optional().describe("This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
})

export const GetUserPropertyKeysOutput = z.object({
  keys: z.array(z.object({
    key: z.string().optional().describe("The key of the property."),
    self: z.string().optional().describe("The URL of the property."),
  })).optional().describe("Property key details."),
}).describe("List of property keys.")

export const getUserPropertyKeys = pikkuSessionlessFunc({
  description: "Returns the keys of all properties for a user.\n\nNote: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in Jira.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to access the property keys on any user.\n *  Access to Jira, to access the calling user's property keys.",
  input: GetUserPropertyKeysInput,
  output: GetUserPropertyKeysOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/properties", data) as any
  },
})
