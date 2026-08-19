// Issue attachments — This resource represents issue attachments and the attachment settings for Jira. Use it to get the metadata for an attachment, delete an attachment, and view the metadata for the contents of an attachment. Also, use it to get the attachment settings for Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const ExpandAttachmentForHumansInput = z.object({
  id: z.string().describe("The ID of the attachment."),
})

export const ExpandAttachmentForHumansOutput = z.object({
  entries: z.array(z.object({
    index: z.number().int().optional().describe("The position of the item within the archive."),
    label: z.string().optional().describe("The label for the archive item."),
    mediaType: z.string().optional().describe("The MIME type of the archive item."),
    path: z.string().optional().describe("The path of the archive item."),
    size: z.string().optional().describe("The size of the archive item."),
  })).optional().describe("The list of the items included in the archive."),
  id: z.number().int().optional().describe("The ID of the attachment."),
  mediaType: z.string().optional().describe("The MIME type of the attachment."),
  name: z.string().optional().describe("The name of the archive file."),
  totalEntryCount: z.number().int().optional().describe("The number of items included in the archive."),
}).describe("Metadata for an archive (for example a zip) and its contents.")

export const expandAttachmentForHumans = pikkuSessionlessFunc({
  description: "Returns the metadata for the contents of an attachment, if it is an archive, and metadata for the attachment itself. For example, if the attachment is a ZIP archive, then information about the files in the archive is returned and metadata for the ZIP archive. Currently, only the ZIP archive format is supported.\n\nUse this operation to retrieve data that is presented to the user, as this operation returns the metadata for the attachment itself, such as the attachment's ID and name. Otherwise, use [ Get contents metadata for an expanded attachment](#api-rest-api-3-attachment-id-expand-raw-get), which only returns the metadata for the attachment's contents.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** For the issue containing the attachment:\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: ExpandAttachmentForHumansInput,
  output: ExpandAttachmentForHumansOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/attachment/{id}/expand/human", data) as any
  },
})
