import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderChildFolderMessageAttachmentCreateUploadSessionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "mailFolder-id1": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  AttachmentItem: z.object({
  attachmentType: z.enum(["file", "item", "reference"]).optional(),
  contentId: z.string().nullable().optional().describe("The CID or Content-Id of the attachment for referencing for the in-line attachments using the <img src='cid:contentId'> tag in HTML messages. Optional."),
  contentType: z.string().nullable().optional().describe("The nature of the data in the attachment. Optional."),
  isInline: z.boolean().nullable().optional().describe("true if the attachment is an inline attachment; otherwise, false. Optional."),
  name: z.string().nullable().optional().describe("The display name of the attachment. This can be a descriptive string and doesn't have to be the actual file name. Required."),
  size: z.number().nullable().optional().describe("The length of the attachment in bytes. Required."),
}).optional(),
})

export const UserMailFolderChildFolderMessageAttachmentCreateUploadSessionOutput = z.object({
  expirationDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time in UTC that the upload session expires. The complete file must be uploaded before this expiration time is reached. Each fragment uploaded during the session extends the expiration time."),
  nextExpectedRanges: z.array(z.string()).optional().describe("A collection of byte ranges that the server is missing for the file. These ranges are zero indexed and of the format 'start-end' (for example '0-26' to indicate the first 27 bytes of the file). When uploading files as Outlook attachments, instead of a collection of ranges, this property always indicates a single value '{start}', the location in the file where the next upload should begin."),
  uploadUrl: z.string().nullable().optional().describe("The URL endpoint that accepts PUT requests for byte ranges of the file."),
})

export const userMailFolderChildFolderMessageAttachmentCreateUploadSession = pikkuSessionlessFunc({
  description: "Create an upload session that allows an app to iteratively upload ranges of a file, so as to attach the file to the specified Outlook item. The item can be a message or event. Use this approach to attach a file if the file size is between 3 MB and 150 MB. To attach a file that's smaller than 3 MB, do a POST operation on the attachments navigation property of the Outlook item; see how to do this for a message or for an event. As part of the response, this action returns an upload URL that you can use in subsequent sequential PUT queries. Request headers for each PUT operation let you specify the exact range of bytes to be uploaded. This allows transfer to be resumed, in case the network connection is dropped during upload. The following are the steps to attach a file to an Outlook item using an upload session: See attach large files to Outlook messages or events for an example.",
  input: UserMailFolderChildFolderMessageAttachmentCreateUploadSessionInput,
  output: UserMailFolderChildFolderMessageAttachmentCreateUploadSessionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/attachments/microsoft.graph.createUploadSession", data) as any
  },
})
