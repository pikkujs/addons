// Dynamic modules — This resource represents [modules registered dynamically](https://developer.atlassian.com/cloud/jira/platform/dynamic-modules/) by [Connect apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const DynamicModulesResourceRemoveModulesDeleteInput = z.object({
  moduleKey: z.array(z.string()).optional().describe("The key of the module to remove. To include multiple module keys, provide multiple copies of this parameter.\nFor example, `moduleKey=dynamic-attachment-entity-property&moduleKey=dynamic-select-field`.\nNonexistent keys are ignored."),
})

export const dynamicModulesResourceRemoveModulesDelete = pikkuSessionlessFunc({
  description: "Remove all or a list of modules registered by the calling app.\n\n**[Permissions](#permissions) required:** Only Connect apps can make this request.",
  input: DynamicModulesResourceRemoveModulesDeleteInput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/atlassian-connect/1/app/module/dynamic", data)
  },
})
