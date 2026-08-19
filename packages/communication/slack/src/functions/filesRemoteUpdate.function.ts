import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesRemoteUpdateInput = z.object({
  external_id: z.string().optional().describe("Creator defined GUID for the file."),
  external_url: z.string().optional().describe("URL of the remote file."),
  file: z.string().optional().describe("Specify a file by providing its ID."),
  filetype: z.string().optional().describe("type of file"),
  indexable_file_contents: z.string().optional().describe("File containing contents that can be used to improve searchability for the remote file."),
  preview_image: z.string().optional().describe("Preview of the document via `multipart/form-data`."),
  title: z.string().optional().describe("Title of the file being shared."),
  token: z.string().optional().describe("Authentication token. Requires scope: `remote_files:write`"),
})

export const FilesRemoteUpdateOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const filesRemoteUpdate = pikkuSessionlessFunc({
  description: "Updates an existing remote file.",
  input: FilesRemoteUpdateInput,
  output: FilesRemoteUpdateOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/files.remote.update", data) as any
  },
})
