// Issue attachments — This resource represents issue attachments and the attachment settings for Jira. Use it to get the metadata for an attachment, delete an attachment, and view the metadata for the contents of an attachment. Also, use it to get the attachment settings for Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const RemoveAttachmentInput = z.object({
  id: z.string().describe("The ID of the attachment."),
})

export const removeAttachment = pikkuSessionlessFunc({
  description: "Deletes an attachment from an issue.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** For the project holding the issue containing the attachment:\n\n *  *Delete own attachments* [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment created by the calling user.\n *  *Delete all attachments* [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment created by any user.",
  input: RemoveAttachmentInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/attachment/{id}", data)
  },
})
