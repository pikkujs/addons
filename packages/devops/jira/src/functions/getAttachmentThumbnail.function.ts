// Issue attachments — This resource represents issue attachments and the attachment settings for Jira. Use it to get the metadata for an attachment, delete an attachment, and view the metadata for the contents of an attachment. Also, use it to get the attachment settings for Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetAttachmentThumbnailInput = z.object({
  id: z.string().describe("The ID of the attachment."),
  redirect: z.boolean().optional().default(true).describe("Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can set this to `false` to avoid making multiple requests to download the attachment."),
  fallbackToDefault: z.boolean().optional().default(true).describe("Whether a default thumbnail is returned when the requested thumbnail is not found."),
  width: z.number().int().optional().describe("The maximum width to scale the thumbnail to."),
  height: z.number().int().optional().describe("The maximum height to scale the thumbnail to."),
})

export const GetAttachmentThumbnailOutput = z.record(z.string(), z.unknown())

export const getAttachmentThumbnail = pikkuSessionlessFunc({
  description: "Returns the thumbnail of an attachment.\n\nTo return the attachment contents, use [Get attachment content](#api-rest-api-3-attachment-content-id-get).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** For the issue containing the attachment:\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: GetAttachmentThumbnailInput,
  output: GetAttachmentThumbnailOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/attachment/thumbnail/{id}", data) as any
  },
})
