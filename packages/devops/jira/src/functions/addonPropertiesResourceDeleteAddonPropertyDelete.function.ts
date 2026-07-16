// App properties — This resource represents app properties. Use it to store arbitrary data for your [Connect app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AddonPropertiesResourceDeleteAddonPropertyDeleteInput = z.object({
  addonKey: z.string().describe("The key of the app, as defined in its descriptor."),
  propertyKey: z.string().describe("The key of the property."),
})

export const addonPropertiesResourceDeleteAddonPropertyDelete = pikkuSessionlessFunc({
  description: "Deletes an app's property.\n\n**[Permissions](#permissions) required:** Only a Connect app whose key matches `addonKey` can make this request.",
  input: AddonPropertiesResourceDeleteAddonPropertyDeleteInput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}", data)
  },
})
