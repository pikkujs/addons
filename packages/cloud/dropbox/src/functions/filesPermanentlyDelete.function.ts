import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesPermanentlyDeleteInput = z.object({
  path: z.string().optional().describe("Path in the user's Dropbox to delete."),
  parent_rev: z.string().optional().describe("Perform delete if given \"rev\" matches the existing file's latest \"rev\". This field does not support deleting a folder."),
})

export const FilesPermanentlyDeleteOutput = z.unknown()

export const filesPermanentlyDelete = pikkuSessionlessFunc({
  description: "Permanently delete the file or folder at a given path (see https://www.dropbox.com/en/help/40).\nNote: This endpoint is only available for Dropbox Business apps.",
  input: FilesPermanentlyDeleteInput,
  output: FilesPermanentlyDeleteOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/permanently_delete", data) as any
  },
})
