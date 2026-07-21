import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SharingTransferFolderInput = z.object({
  shared_folder_id: z.string().optional().describe("The ID for the shared folder."),
  to_dropbox_id: z.string().optional().describe("A account or team member ID to transfer ownership to."),
})

export const SharingTransferFolderOutput = z.unknown()

export const sharingTransferFolder = pikkuSessionlessFunc({
  description: "Transfer ownership of a shared folder to a member of the shared folder.\nUser must have :field:`AccessLevel.owner` access to the shared folder to perform a transfer.\nApps must have full Dropbox access to use this endpoint.",
  input: SharingTransferFolderInput,
  output: SharingTransferFolderOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/transfer_folder", data) as any
  },
})
