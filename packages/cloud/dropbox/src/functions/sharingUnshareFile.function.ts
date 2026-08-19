import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingUnshareFileInput = z.object({
  file: z.string().optional().describe("The file to unshare."),
})

export const SharingUnshareFileOutput = z.unknown()

export const sharingUnshareFile = pikkuSessionlessFunc({
  description: "Remove all members from this file. Does not remove inherited members.",
  input: SharingUnshareFileInput,
  output: SharingUnshareFileOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/unshare_file", data) as any
  },
})
