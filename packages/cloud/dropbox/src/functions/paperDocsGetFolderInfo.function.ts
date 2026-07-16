import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaperDocsGetFolderInfoInput = z.object({
  doc_id: z.string().optional().describe("The Paper doc ID."),
})

export const PaperDocsGetFolderInfoOutput = z.object({
  folders: z.array(z.object({
    id: z.string().optional().describe("Paper folder ID. This ID uniquely identifies the folder."),
    name: z.string().optional().describe("Paper folder name."),
  })).optional().describe("The folder path. If present the first folder is the root folder."),
  folder_sharing_policy_type: z.object({
    ".tag": z.enum(["team", "invite_only"]).optional(),
  }).optional().describe("The sharing policy of a Paper folder.\n\nNote: The sharing policy of subfolders is inherited from the root folder.\nteam: Everyone in your team and anyone directly invited can access this folder.\ninvite_only: Only people directly invited can access this folder.\n"),
}).describe("Metadata about Paper folders containing the specififed Paper doc.\nfolder_sharing_policy_type: The sharing policy of the folder containing the Paper doc.\nfolders: The folder path. If present the first folder is the root folder.\n")

export const paperDocsGetFolderInfo = pikkuSessionlessFunc({
  description: "Retrieves folder information for the given Paper doc. This includes:\n  - folder sharing policy; permissions for subfolders are set by the top-level folder.\n  - full 'filepath', i.e. the list of folders (both folderId and folderName) from     the root folder to the folder directly containing the Paper doc.\n\nNote: If the Paper doc is not in any folder (aka unfiled) the response will be empty.",
  input: PaperDocsGetFolderInfoInput,
  output: PaperDocsGetFolderInfoOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/get_folder_info", data) as any
  },
})
