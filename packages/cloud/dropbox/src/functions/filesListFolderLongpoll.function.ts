import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesListFolderLongpollInput = z.object({
  cursor: z.string().optional().describe("A cursor as returned by :route:`list_folder` or :route:`list_folder/continue`. Cursors retrieved by setting :field:`ListFolderArg.include_media_info` to :val:`true` are not supported."),
  timeout: z.number().optional().describe("A timeout in seconds. The request will block for at most this length of time, plus up to 90 seconds of random jitter added to avoid the thundering herd problem. Care should be taken when using this parameter, as some network infrastructure does not support long timeouts."),
})

export const FilesListFolderLongpollOutput = z.object({
  changes: z.boolean().optional().describe("Indicates whether new changes are available. If true, call :route:`list_folder/continue` to retrieve the changes."),
  backoff: z.number().optional().describe("If present, backoff for at least this many seconds before calling :route:`list_folder/longpoll` again."),
}).describe("changes: Indicates whether new changes are available. If true, call :route:`list_folder/continue` to retrieve the changes.\nbackoff: If present, backoff for at least this many seconds before calling :route:`list_folder/longpoll` again.\n")

export const filesListFolderLongpoll = pikkuSessionlessFunc({
  description: "A longpoll endpoint to wait for changes on an account. In conjunction with :route:`list_folder/continue`, this call gives you a low-latency way to monitor an account for file changes. The connection will block until there are changes available or a timeout occurs. This endpoint is useful mostly for client-side apps. If you're looking for server-side notifications, check out our :link:`webhooks documentation https://www.dropbox.com/developers/reference/webhooks`.",
  input: FilesListFolderLongpollInput,
  output: FilesListFolderLongpollOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/list_folder/longpoll", data) as any
  },
})
