// Dynamic modules — This resource represents [modules registered dynamically](https://developer.atlassian.com/cloud/jira/platform/dynamic-modules/) by [Connect apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const DynamicModulesResourceGetModulesGetOutput = z.object({
  modules: z.array(z.record(z.string(), z.unknown())).describe("A list of app modules in the same format as the `modules` property in the\n[app descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/)."),
})

export const dynamicModulesResourceGetModulesGet = pikkuSessionlessFunc({
  description: "Returns all modules registered dynamically by the calling app.\n\n**[Permissions](#permissions) required:** Only Connect apps can make this request.",
  output: DynamicModulesResourceGetModulesGetOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/atlassian-connect/1/app/module/dynamic") as any
  },
})
