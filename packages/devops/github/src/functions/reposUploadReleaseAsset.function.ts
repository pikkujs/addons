// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposUploadReleaseAssetInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  release_id: z.number().int().describe("The unique identifier of the release."),
  name: z.string(),
  label: z.string().optional(),
  body: z.string().describe("The raw file data"),
})

export const ReposUploadReleaseAssetOutput = z.object({
  browser_download_url: z.string().url(),
  content_type: z.string(),
  created_at: z.string().datetime(),
  download_count: z.number().int(),
  id: z.number().int(),
  label: z.string().nullable(),
  name: z.string().describe("The file name of the asset."),
  node_id: z.string(),
  size: z.number().int(),
  state: z.enum(["uploaded", "open"]).describe("State of the release asset."),
  updated_at: z.string().datetime(),
  uploader: z.object({
    avatar_url: z.string().url(),
    email: z.string().nullable().optional(),
    events_url: z.string(),
    followers_url: z.string().url(),
    following_url: z.string(),
    gists_url: z.string(),
    gravatar_id: z.string().nullable(),
    html_url: z.string().url(),
    id: z.number().int(),
    login: z.string(),
    name: z.string().nullable().optional(),
    node_id: z.string(),
    organizations_url: z.string().url(),
    received_events_url: z.string().url(),
    repos_url: z.string().url(),
    site_admin: z.boolean(),
    starred_at: z.string().optional(),
    starred_url: z.string(),
    subscriptions_url: z.string().url(),
    type: z.string(),
    url: z.string().url(),
  }).nullable().describe("A GitHub user."),
  url: z.string().url(),
}).describe("Data related to a release.")

export const reposUploadReleaseAsset = pikkuSessionlessFunc({
  description: "This endpoint makes use of [a Hypermedia relation](https://docs.github.com/rest/overview/resources-in-the-rest-api#hypermedia) to determine which URL to access. The endpoint you call to upload release assets is specific to your release. Use the `upload_url` returned in\nthe response of the [Create a release endpoint](https://docs.github.com/rest/releases/releases#create-a-release) to upload a release asset.\n\nYou need to use an HTTP client which supports [SNI](http://en.wikipedia.org/wiki/Server_Name_Indication) to make calls to this endpoint.\n\nMost libraries will set the required `Content-Length` header automatically. Use the required `Content-Type` header to provide the media type of the asset. For a list of media types, see [Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml). For example: \n\n`application/zip`\n\nGitHub expects the asset data in its raw binary form, rather than JSON. You will send the raw binary content of the asset as the request body. Everything else about the endpoint is the same as the rest of the API. For example,\nyou'll still need to pass your authentication to be able to upload an asset.\n\nWhen an upstream failure occurs, you will receive a `502 Bad Gateway` status. This may leave an empty asset with a state of `starter`. It can be safely deleted.\n\n**Notes:**\n*   GitHub renames asset filenames that have special characters, non-alphanumeric characters, and leading or trailing periods. The \"[List assets for a release](https://docs.github.com/rest/reference/repos#list-assets-for-a-release)\"\nendpoint lists the renamed filenames. For more information and help, contact [GitHub Support](https://support.github.com/contact?tags=dotcom-rest-api).\n*   To find the `release_id` query the [`GET /repos/{owner}/{repo}/releases/latest` endpoint](https://docs.github.com/rest/releases/releases#get-the-latest-release). \n*   If you upload an asset with the same filename as another uploaded asset, you'll receive an error and must delete the old file before you can re-upload the new asset.",
  input: ReposUploadReleaseAssetInput,
  output: ReposUploadReleaseAssetOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/releases/{release_id}/assets", data) as any
  },
})
