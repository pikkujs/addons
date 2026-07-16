// User properties — This resource represents [user](#api-group-Users) properties and provides for storing custom data against a user. Use it to get, create, and delete user properties as well as get a list of property keys for a user. This resourse is designed for integrations and apps to store per-user data and settings. This enables data used to customized the user experience to be kept in the Jira Cloud instance's database. User properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/). This resource does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, MethodNotAllowedError } from '@pikku/core/errors'

export const SetUserPropertyInput = z.object({
  propertyKey: z.string().describe("The key of the user's property. The maximum length is 255 characters."),
  accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
  userKey: z.string().optional().describe("This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  username: z.string().optional().describe("This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  body: z.unknown(),
})

export const SetUserPropertyOutput = z.unknown()

export const setUserProperty = pikkuSessionlessFunc({
  description: "Sets the value of a user's property. Use this resource to store custom data against a user.\n\nNote: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in Jira.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to set a property on any user.\n *  Access to Jira, to set a property on the calling user's record.",
  input: SetUserPropertyInput,
  output: SetUserPropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, MethodNotAllowedError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/user/properties/{propertyKey}", data) as any
  },
})
