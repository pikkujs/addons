import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesUploadSessionAppendInput = z.object({
  session_id: z.string().optional().describe("The upload session ID (returned by :route:`upload_session/start`)."),
  offset: z.number().optional().describe("The amount of data that has been uploaded so far. We use this to make sure upload data isn't lost or duplicated in the event of a network error."),
})

export const FilesUploadSessionAppendOutput = z.unknown()

export const filesUploadSessionAppend = pikkuSessionlessFunc({
  description: "Append more data to an upload session.\nA single request should not upload more than 150 MB. The maximum size of a file one can upload to an upload session is 350 GB.",
  input: FilesUploadSessionAppendInput,
  output: FilesUploadSessionAppendOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/upload_session/append", data) as any
  },
})
