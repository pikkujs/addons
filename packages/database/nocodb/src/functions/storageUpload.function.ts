import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const StorageUploadInput = z.object({
  path: z.string().describe("Target File Path"),
  scope: z.enum(["workspacePics", "profilePics", "organizationPics"]).optional().describe("The scope of the attachment"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  files: z.array(z.object({
  mimetype: z.string().optional().describe("The mimetype of the file"),
  fieldname: z.string().optional().describe("The name of the input used to upload the file"),
  originalname: z.string().optional().describe("The original name of the file"),
  size: z.number().optional().describe("The size of the file"),
  encoding: z.string().optional().describe("The encoding of the file"),
  buffer: z.unknown().optional().describe("An buffer array containing the file content"),
})).optional(),
})

export const storageUpload = pikkuSessionlessFunc({
  description: "Upload attachment",
  input: StorageUploadInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/storage/upload", data)
  },
})
