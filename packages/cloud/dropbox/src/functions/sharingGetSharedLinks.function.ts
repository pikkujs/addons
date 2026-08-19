import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingGetSharedLinksInput = z.object({
  path: z.string().optional().describe("See :route:`get_shared_links` description."),
})

export const SharingGetSharedLinksOutput = z.object({
  links: z.array(z.object({
    url: z.string().optional().describe("URL of the shared link."),
    expires: z.string().optional().describe("Expiration time, if set. By default the link won't expire."),
    visibility: z.object({
      ".tag": z.enum(["public", "team_only", "password", "team_and_password", "shared_folder_only", "other"]).optional(),
    }).optional().describe("Who can access a shared link. The most open visibility is :field:`public`. The default depends on many aspects, such as team and user preferences and shared folder settings.\npublic: Anyone who has received the link can access it. No login required.\nteam_only: Only members of the same team can access the link. Login is required.\npassword: A link-specific password is required to access the link. Login is not required.\nteam_and_password: Only members of the same team who have the link-specific password can access the link.\nshared_folder_only: Only members of the shared folder containing the linked file can access the link. Login is required.\nother: None\n"),
  })).optional().describe("Shared links applicable to the path argument."),
}).describe("links: Shared links applicable to the path argument.\n")

export const sharingGetSharedLinks = pikkuSessionlessFunc({
  description: "Returns a list of :type:`LinkMetadata` objects for this user, including collection links.\nIf no path is given, returns a list of all shared links for the current user, including collection links, up to a maximum of 1000 links.\nIf a non-empty path is given, returns a list of all shared links that allow access to the given path.  Collection links are never returned in this case.\nNote that the url field in the response is never the shortened URL.",
  input: SharingGetSharedLinksInput,
  output: SharingGetSharedLinksOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/get_shared_links", data) as any
  },
})
