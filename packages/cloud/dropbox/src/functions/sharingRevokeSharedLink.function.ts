import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SharingRevokeSharedLinkInput = z.object({
  url: z.string().optional().describe("URL of the shared link."),
})

export const SharingRevokeSharedLinkOutput = z.unknown()

export const sharingRevokeSharedLink = pikkuSessionlessFunc({
  description: "Revoke a shared link.\nNote that even after revoking a shared link to a file, the file may be accessible if there are shared links leading to any of the file parent folders. To list all shared links that enable access to a specific file, you can use the :route:`list_shared_links` with the file as the :field:`ListSharedLinksArg.path` argument.",
  input: SharingRevokeSharedLinkInput,
  output: SharingRevokeSharedLinkOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/revoke_shared_link", data) as any
  },
})
