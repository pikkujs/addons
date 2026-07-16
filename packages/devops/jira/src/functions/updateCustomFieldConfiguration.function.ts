// Issue custom field configuration (apps) — This resource represents configurations stored against a custom field context by a [Forge app](https://developer.atlassian.com/platform/forge/). Configurations are information used by the Forge app at runtime to determine how to handle or process the data in a custom field in a given context. Use this resource to set and read configurations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateCustomFieldConfigurationInput = z.object({
  fieldIdOrKey: z.string().describe("The ID or key of the custom field, for example `customfield_10000`."),
  configurations: z.array(z.object({
  configuration: z.unknown().optional().describe("The field configuration."),
  fieldContextId: z.string().describe("The ID of the field context the configuration is associated with."),
  id: z.string().describe("The ID of the configuration."),
  schema: z.unknown().optional().describe("The field value schema."),
})).min(1).max(1000).describe("The list of custom field configuration details."),
})

export const UpdateCustomFieldConfigurationOutput = z.unknown()

export const updateCustomFieldConfiguration = pikkuSessionlessFunc({
  description: "Update the configuration for contexts of a custom field created by a [Forge app](https://developer.atlassian.com/platform/forge/).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the Forge app that created the custom field.",
  input: UpdateCustomFieldConfigurationInput,
  output: UpdateCustomFieldConfigurationOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/app/field/{fieldIdOrKey}/context/configuration", data) as any
  },
})
