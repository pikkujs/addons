// App properties — This resource represents app properties. Use it to store arbitrary data for your [Connect app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AddonPropertiesResourceGetAddonPropertyGetInput = z.object({
  addonKey: z.string().describe("The key of the app, as defined in its descriptor."),
  propertyKey: z.string().describe("The key of the property."),
})

export const AddonPropertiesResourceGetAddonPropertyGetOutput = z.object({
  key: z.string().optional().describe("The key of the property. Required on create and update."),
  value: z.unknown().optional().describe("The value of the property. Required on create and update."),
}).describe("An entity property, for more information see [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).")

export const addonPropertiesResourceGetAddonPropertyGet = pikkuSessionlessFunc({
  description: "Returns the key and value of an app's property.\n\n**[Permissions](#permissions) required:** Only a Connect app whose key matches `addonKey` can make this request.\nAdditionally, Forge apps published on the Marketplace can access properties of Connect apps they were [migrated from](https://developer.atlassian.com/platform/forge/build-a-connect-on-forge-app/).",
  input: AddonPropertiesResourceGetAddonPropertyGetInput,
  output: AddonPropertiesResourceGetAddonPropertyGetOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}", data) as any
  },
})
