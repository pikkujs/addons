import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesUploadSessionStartInput = z.object({
  close: z.boolean().optional().describe("If true, the current session will be closed, at which point you won't be able to call :route:`upload_session/append_v2` anymore with the current session."),
})

export const FilesUploadSessionStartOutput = z.object({
  session_id: z.string().optional().describe("A unique identifier for the upload session. Pass this to :route:`upload_session/append_v2` and :route:`upload_session/finish`."),
}).describe("session_id: A unique identifier for the upload session. Pass this to :route:`upload_session/append_v2` and :route:`upload_session/finish`.\n")

export const filesUploadSessionStart = pikkuSessionlessFunc({
  description: "Upload sessions allow you to upload a single file in one or more requests, for example where the size of the file is greater than 150 MB.  This call starts a new upload session with the given data. You can then use :route:`upload_session/append_v2` to add more data and :route:`upload_session/finish` to save all the data to a file in Dropbox.\nA single request should not upload more than 150 MB. The maximum size of a file one can upload to an upload session is 350 GB.\nAn upload session can be used for a maximum of 48 hours. Attempting to use an :field:`UploadSessionStartResult.session_id` with :route:`upload_session/append_v2` or :route:`upload_session/finish` more than 48 hours after its creation will return a :field:`UploadSessionLookupError.not_found`.",
  input: FilesUploadSessionStartInput,
  output: FilesUploadSessionStartOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/upload_session/start", data) as any
  },
})
