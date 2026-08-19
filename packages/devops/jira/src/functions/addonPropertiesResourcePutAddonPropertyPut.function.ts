// App properties — This resource represents app properties. Use it to store arbitrary data for your [Connect app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const AddonPropertiesResourcePutAddonPropertyPutInput = z.object({
  addonKey: z.string().describe("The key of the app, as defined in its descriptor."),
  propertyKey: z.string().describe("The key of the property."),
  body: z.unknown(),
})

export const AddonPropertiesResourcePutAddonPropertyPutOutput = z.object({
  message: z.string().describe("The human-readable message that describes the result."),
  statusCode: z.number().int().describe("The status code of the response."),
})

export const addonPropertiesResourcePutAddonPropertyPut = pikkuSessionlessFunc({
  description: "Sets the value of an app's property. Use this resource to store custom data for your app.\n\nThe value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.\n\n**[Permissions](#permissions) required:** Only a Connect app whose key matches `addonKey` can make this request.",
  input: AddonPropertiesResourcePutAddonPropertyPutInput,
  output: AddonPropertiesResourcePutAddonPropertyPutOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}", data) as any
  },
})
