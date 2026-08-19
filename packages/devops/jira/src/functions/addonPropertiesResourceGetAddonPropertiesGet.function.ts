// App properties — This resource represents app properties. Use it to store arbitrary data for your [Connect app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const AddonPropertiesResourceGetAddonPropertiesGetInput = z.object({
  addonKey: z.string().describe("The key of the app, as defined in its descriptor."),
})

export const AddonPropertiesResourceGetAddonPropertiesGetOutput = z.object({
  keys: z.array(z.object({
    key: z.string().optional().describe("The key of the property."),
    self: z.string().optional().describe("The URL of the property."),
  })).optional().describe("Property key details."),
}).describe("List of property keys.")

export const addonPropertiesResourceGetAddonPropertiesGet = pikkuSessionlessFunc({
  description: "Gets all the properties of an app.\n\n**[Permissions](#permissions) required:** Only a Connect app whose key matches `addonKey` can make this request.\nAdditionally, Forge apps published on the Marketplace can access properties of Connect apps they were [migrated from](https://developer.atlassian.com/platform/forge/build-a-connect-on-forge-app/).",
  input: AddonPropertiesResourceGetAddonPropertiesGetInput,
  output: AddonPropertiesResourceGetAddonPropertiesGetOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/atlassian-connect/1/addons/{addonKey}/properties", data) as any
  },
})
