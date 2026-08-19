// Issue attachments — This resource represents issue attachments and the attachment settings for Jira. Use it to get the metadata for an attachment, delete an attachment, and view the metadata for the contents of an attachment. Also, use it to get the attachment settings for Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const ExpandAttachmentForMachinesInput = z.object({
  id: z.string().describe("The ID of the attachment."),
})

export const ExpandAttachmentForMachinesOutput = z.object({
  entries: z.array(z.object({
    abbreviatedName: z.string().optional(),
    entryIndex: z.number().int().optional(),
    mediaType: z.string().optional(),
    name: z.string().optional(),
    size: z.number().int().optional(),
  })).optional().describe("The list of the items included in the archive."),
  totalEntryCount: z.number().int().optional().describe("The number of items in the archive."),
})

export const expandAttachmentForMachines = pikkuSessionlessFunc({
  description: "Returns the metadata for the contents of an attachment, if it is an archive. For example, if the attachment is a ZIP archive, then information about the files in the archive is returned. Currently, only the ZIP archive format is supported.\n\nUse this operation if you are processing the data without presenting it to the user, as this operation only returns the metadata for the contents of the attachment. Otherwise, to retrieve data to present to the user, use [ Get all metadata for an expanded attachment](#api-rest-api-3-attachment-id-expand-human-get) which also returns the metadata for the attachment itself, such as the attachment's ID and name.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** For the issue containing the attachment:\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: ExpandAttachmentForMachinesInput,
  output: ExpandAttachmentForMachinesOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/attachment/{id}/expand/raw", data) as any
  },
})
