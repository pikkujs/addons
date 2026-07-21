// User properties — This resource represents [user](#api-group-Users) properties and provides for storing custom data against a user. Use it to get, create, and delete user properties as well as get a list of property keys for a user. This resourse is designed for integrations and apps to store per-user data and settings. This enables data used to customized the user experience to be kept in the Jira Cloud instance's database. User properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/). This resource does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteUserPropertyInput = z.object({
  propertyKey: z.string().describe("The key of the user's property."),
  accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
  userKey: z.string().optional().describe("This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  username: z.string().optional().describe("This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
})

export const deleteUserProperty = pikkuSessionlessFunc({
  description: "Deletes a property from a user.\n\nNote: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in Jira.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to delete a property from any user.\n *  Access to Jira, to delete a property from the calling user's record.",
  input: DeleteUserPropertyInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/user/properties/{propertyKey}", data)
  },
})
