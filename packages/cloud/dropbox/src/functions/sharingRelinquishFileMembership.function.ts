import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingRelinquishFileMembershipInput = z.object({
  file: z.string().optional().describe("The path or id for the file."),
})

export const SharingRelinquishFileMembershipOutput = z.unknown()

export const sharingRelinquishFileMembership = pikkuSessionlessFunc({
  description: "The current user relinquishes their membership in the designated file. Note that the current user may still have inherited access to this file through the parent folder.\nApps must have full Dropbox access to use this endpoint.",
  input: SharingRelinquishFileMembershipInput,
  output: SharingRelinquishFileMembershipOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/relinquish_file_membership", data) as any
  },
})
