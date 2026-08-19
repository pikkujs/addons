import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingCreateSharedLinkInput = z.object({
  path: z.string().optional().describe("The path to share."),
  pending_upload: z.object({
  ".tag": z.enum(["file", "folder"]).optional(),
}).optional().describe("Flag to indicate pending upload default (for linking to not-yet-existing paths).\nfile: Assume pending uploads are files.\nfolder: Assume pending uploads are folders.\n"),
  short_url: z.boolean().optional().describe("Whether to return a shortened URL."),
})

export const SharingCreateSharedLinkOutput = z.object({
  url: z.string().optional().describe("URL of the shared link."),
  path: z.string().optional().describe("Path in user's Dropbox."),
  expires: z.string().optional().describe("Expiration time, if set. By default the link won't expire."),
  visibility: z.object({
    ".tag": z.enum(["public", "team_only", "password", "team_and_password", "shared_folder_only", "other"]).optional(),
  }).optional().describe("Who can access a shared link. The most open visibility is :field:`public`. The default depends on many aspects, such as team and user preferences and shared folder settings.\npublic: Anyone who has received the link can access it. No login required.\nteam_only: Only members of the same team can access the link. Login is required.\npassword: A link-specific password is required to access the link. Login is not required.\nteam_and_password: Only members of the same team who have the link-specific password can access the link.\nshared_folder_only: Only members of the shared folder containing the linked file can access the link. Login is required.\nother: None\n"),
}).describe("Metadata for a path-based shared link.\nurl: URL of the shared link.\nvisibility: Who can access the link.\npath: Path in user's Dropbox.\nexpires: Expiration time, if set. By default the link won't expire.\n")

export const sharingCreateSharedLink = pikkuSessionlessFunc({
  description: "Create a shared link.\nIf a shared link already exists for the given path, that link is returned.\nNote that in the returned :type:`PathLinkMetadata`, the :field:`PathLinkMetadata.url` field is the shortened URL if :field:`CreateSharedLinkArg.short_url` argument is set to :val:`true`.\nPreviously, it was technically possible to break a shared link by moving or renaming the corresponding file or folder. In the future, this will no longer be the case, so your app shouldn't rely on this behavior. Instead, if your app needs to revoke a shared link, use :route:`revoke_shared_link`.",
  input: SharingCreateSharedLinkInput,
  output: SharingCreateSharedLinkOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/create_shared_link", data) as any
  },
})
