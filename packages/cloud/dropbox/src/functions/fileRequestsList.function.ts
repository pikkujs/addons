import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileRequestsListInput = z.object({
  body: z.unknown(),
})

export const FileRequestsListOutput = z.object({
  file_requests: z.array(z.object({
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
  })).optional().describe("The file requests owned by this user. Apps with the app folder permission will only see file requests in their app folder."),
}).describe("Result for :route:`list`.\nfile_requests: The file requests owned by this user. Apps with the app folder permission will only see file requests in their app folder.\n")

export const fileRequestsList = pikkuSessionlessFunc({
  description: "Returns a list of file requests owned by this user. For apps with the app folder permission, this will only return file requests with destinations in the app folder.",
  input: FileRequestsListInput,
  output: FileRequestsListOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_requests/list", data) as any
  },
})
