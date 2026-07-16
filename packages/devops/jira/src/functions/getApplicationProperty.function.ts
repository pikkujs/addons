// Jira settings — This resource represents various settings in Jira. Use it to get and update Jira settings and properties.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetApplicationPropertyInput = z.object({
  key: z.string().optional().describe("The key of the application property."),
  permissionLevel: z.string().optional().describe("The permission level of all items being returned in the list."),
  keyFilter: z.string().optional().describe("When a `key` isn't provided, this filters the list of results by the application property `key` using a regular expression. For example, using `jira.lf.*` will return all application properties with keys that start with *jira.lf.*."),
})

export const GetApplicationPropertyOutput = z.array(z.object({
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

export const getApplicationProperty = pikkuSessionlessFunc({
  description: "Returns all application properties or an application property.\n\nIf you specify a value for the `key` parameter, then an application property is returned as an object (not in an array). Otherwise, an array of all editable application properties is returned. See [Set application property](#api-rest-api-3-application-properties-id-put) for descriptions of editable properties.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetApplicationPropertyInput,
  output: GetApplicationPropertyOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/application-properties", data) as any
  },
})
