// Dynamic modules — This resource represents [modules registered dynamically](https://developer.atlassian.com/cloud/jira/platform/dynamic-modules/) by [Connect apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const DynamicModulesResourceRegisterModulesPostInput = z.object({
  modules: z.array(z.record(z.string(), z.unknown())).describe("A list of app modules in the same format as the `modules` property in the\n[app descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/)."),
})

export const dynamicModulesResourceRegisterModulesPost = pikkuSessionlessFunc({
  description: "Registers a list of modules.\n\n**[Permissions](#permissions) required:** Only Connect apps can make this request.",
  input: DynamicModulesResourceRegisterModulesPostInput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/atlassian-connect/1/app/module/dynamic", data)
  },
})
