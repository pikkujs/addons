// Jira settings — This resource represents various settings in Jira. Use it to get and update Jira settings and properties.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAdvancedSettingsOutput = z.array(z.object({
  allowedValues: z.array(z.string()).optional().describe("The allowed values, if applicable."),
  defaultValue: z.string().optional().describe("The default value of the application property."),
  desc: z.string().optional().describe("The description of the application property."),
  example: z.string().optional(),
  id: z.string().optional().describe("The ID of the application property. The ID and key are the same."),
  key: z.string().optional().describe("The key of the application property. The ID and key are the same."),
  name: z.string().optional().describe("The name of the application property."),
  type: z.string().optional().describe("The data type of the application property."),
  value: z.string().optional().describe("The new value."),
}))

export const getAdvancedSettings = pikkuSessionlessFunc({
  description: "Returns the application properties that are accessible on the *Advanced Settings* page. To navigate to the *Advanced Settings* page in Jira, choose the Jira icon > **Jira settings** > **System**, **General Configuration** and then click **Advanced Settings** (in the upper right).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetAdvancedSettingsOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/application-properties/advanced-settings") as any
  },
})
