// User properties — This resource represents [user](#api-group-Users) properties and provides for storing custom data against a user. Use it to get, create, and delete user properties as well as get a list of property keys for a user. This resourse is designed for integrations and apps to store per-user data and settings. This enables data used to customized the user experience to be kept in the Jira Cloud instance's database. User properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/). This resource does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetUserPropertyInput = z.object({
  propertyKey: z.string().describe("The key of the user's property."),
  accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
  userKey: z.string().optional().describe("This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  username: z.string().optional().describe("This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
})

export const GetUserPropertyOutput = z.object({
  key: z.string().optional().describe("The key of the property. Required on create and update."),
  value: z.unknown().optional().describe("The value of the property. Required on create and update."),
}).describe("An entity property, for more information see [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).")

export const getUserProperty = pikkuSessionlessFunc({
  description: "Returns the value of a user's property. If no property key is provided [Get user property keys](#api-rest-api-3-user-properties-get) is called.\n\nNote: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in Jira.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to get a property from any user.\n *  Access to Jira, to get a property from the calling user's record.",
  input: GetUserPropertyInput,
  output: GetUserPropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/properties/{propertyKey}", data) as any
  },
})
