import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesUploadSessionAppendV2Input = z.object({
  cursor: z.object({
  session_id: z.string().optional().describe("The upload session ID (returned by :route:`upload_session/start`)."),
  offset: z.number().optional().describe("The amount of data that has been uploaded so far. We use this to make sure upload data isn't lost or duplicated in the event of a network error."),
}).optional().describe("session_id: The upload session ID (returned by :route:`upload_session/start`).\noffset: The amount of data that has been uploaded so far. We use this to make sure upload data isn't lost or duplicated in the event of a network error.\n"),
  close: z.boolean().optional().describe("If true, the current session will be closed, at which point you won't be able to call :route:`upload_session/append_v2` anymore with the current session."),
})

export const FilesUploadSessionAppendV2Output = z.unknown()

export const filesUploadSessionAppendV2 = pikkuSessionlessFunc({
  description: "Append more data to an upload session.\nWhen the parameter close is set, this call will close the session.\nA single request should not upload more than 150 MB. The maximum size of a file one can upload to an upload session is 350 GB.",
  input: FilesUploadSessionAppendV2Input,
  output: FilesUploadSessionAppendV2Output,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/upload_session/append_v2", data) as any
  },
})
