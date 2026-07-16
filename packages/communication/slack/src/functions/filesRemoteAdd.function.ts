import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesRemoteAddInput = z.object({
  external_id: z.string().optional().describe("Creator defined GUID for the file."),
  external_url: z.string().optional().describe("URL of the remote file."),
  filetype: z.string().optional().describe("type of file"),
  indexable_file_contents: z.string().optional().describe("A text file (txt, pdf, doc, etc.) containing textual search terms that are used to improve discovery of the remote file."),
  preview_image: z.string().optional().describe("Preview of the document via `multipart/form-data`."),
  title: z.string().optional().describe("Title of the file being shared."),
  token: z.string().optional().describe("Authentication token. Requires scope: `remote_files:write`"),
})

export const FilesRemoteAddOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const filesRemoteAdd = pikkuSessionlessFunc({
  description: "Adds a file from a remote service",
  input: FilesRemoteAddInput,
  output: FilesRemoteAddOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/files.remote.add", data) as any
  },
})
