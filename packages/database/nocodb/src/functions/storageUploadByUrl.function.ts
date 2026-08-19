import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const StorageUploadByUrlInput = z.object({
  path: z.string().describe("Target File Path"),
  scope: z.enum(["workspacePics", "profilePics", "organizationPics"]).optional().describe("The scope of the attachment"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.array(z.object({
  mimetype: z.string().optional().describe("The mimetype of the attachment"),
  path: z.string().optional().describe("The file path of the attachment"),
  size: z.number().optional().describe("The size of the attachment"),
  title: z.string().optional().describe("The title of the attachment used in UI"),
  url: z.string().optional().describe("Attachment URL to be uploaded via upload-by-url"),
  fileName: z.string().optional().describe("The name of the attachment file name"),
})),
})

export const storageUploadByUrl = pikkuSessionlessFunc({
  description: "Upload attachment by URL. Used in Airtable Migration.",
  input: StorageUploadByUrlInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/storage/upload-by-url", data)
  },
})
