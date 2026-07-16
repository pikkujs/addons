// Issue attachments — This resource represents issue attachments and the attachment settings for Jira. Use it to get the metadata for an attachment, delete an attachment, and view the metadata for the contents of an attachment. Also, use it to get the attachment settings for Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetAttachmentMetaOutput = z.object({
  enabled: z.boolean().optional().describe("Whether the ability to add attachments is enabled."),
  uploadLimit: z.number().int().optional().describe("The maximum size of attachments permitted, in bytes."),
}).describe("Details of the instance's attachment settings.")

export const getAttachmentMeta = pikkuSessionlessFunc({
  description: "Returns the attachment settings, that is, whether attachments are enabled and the maximum attachment size allowed.\n\nNote that there are also [project permissions](https://confluence.atlassian.com/x/yodKLg) that restrict whether users can create and delete attachments.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  output: GetAttachmentMetaOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/attachment/meta") as any
  },
})
