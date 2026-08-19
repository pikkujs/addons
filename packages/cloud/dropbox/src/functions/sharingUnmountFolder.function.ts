import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingUnmountFolderInput = z.object({
  shared_folder_id: z.string().optional().describe("The ID for the shared folder."),
})

export const SharingUnmountFolderOutput = z.unknown()

export const sharingUnmountFolder = pikkuSessionlessFunc({
  description: "The current user unmounts the designated folder. They can re-mount the folder at a later time using :route:`mount_folder`.\nApps must have full Dropbox access to use this endpoint.",
  input: SharingUnmountFolderInput,
  output: SharingUnmountFolderOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/unmount_folder", data) as any
  },
})
