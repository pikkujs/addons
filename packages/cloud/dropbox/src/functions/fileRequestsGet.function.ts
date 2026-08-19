import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileRequestsGetInput = z.object({
  id: z.string().optional().describe("The ID of the file request to retrieve."),
})

export const FileRequestsGetOutput = z.object({
  title: z.string().optional().describe("The title of the file request."),
  url: z.string().optional().describe("The URL of the file request."),
  destination: z.string().optional().describe("The path of the folder in the Dropbox where uploaded files will be sent. This can be :val:`null` if the destination was removed. For apps with the app folder permission, this will be relative to the app folder."),
  created: z.string().optional().describe("When this file request was created."),
  file_count: z.number().optional().describe("The number of files this file request has received."),
  deadline: z.object({
    deadline: z.string().optional().describe("The deadline for this file request."),
    allow_late_uploads: z.object({
      ".tag": z.enum(["one_day", "two_days", "seven_days", "thirty_days", "always", "other"]).optional(),
    }).optional().describe("one_day: None\ntwo_days: None\nseven_days: None\nthirty_days: None\nalways: None\nother: None\n"),
  }).optional().describe("deadline: The deadline for this file request.\nallow_late_uploads: If set, allow uploads after the deadline has passed. These     uploads will be marked overdue.\n"),
  id: z.string().optional().describe("The ID of the file request."),
  is_open: z.boolean().optional().describe("Whether or not the file request is open. If the file request is closed, it will not accept any more file submissions."),
}).describe("A :link:`file request https://www.dropbox.com/help/9090` for receiving files into the user's Dropbox account.\nid: The ID of the file request.\nurl: The URL of the file request.\ntitle: The title of the file request.\ncreated: When this file request was created.\nis_open: Whether or not the file request is open. If the file request is closed, it will not accept any more file submissions.\nfile_count: The number of files this file request has received.\ndestination: The path of the folder in the Dropbox where uploaded files will be sent. This can be :val:`null` if the destination was removed. For apps with the app folder permission, this will be relative to the app folder.\ndeadline: The deadline for this file request. Only set if the request has a deadline.\n")

export const fileRequestsGet = pikkuSessionlessFunc({
  description: "Returns the specified file request.",
  input: FileRequestsGetInput,
  output: FileRequestsGetOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_requests/get", data) as any
  },
})
