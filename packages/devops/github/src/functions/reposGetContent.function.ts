// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReposGetContentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  path: z.string().describe("path parameter"),
  ref: z.string().optional().describe("The name of the commit/branch/tag. Default: the repository’s default branch (usually `master`)"),
})

export const ReposGetContentOutput = z.union([z.array(z.object({
  _links: z.object({
    git: z.string().url().nullable(),
    html: z.string().url().nullable(),
    self: z.string().url(),
  }),
  content: z.string().optional(),
  download_url: z.string().url().nullable(),
  git_url: z.string().url().nullable(),
  html_url: z.string().url().nullable(),
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  size: z.number().int(),
  type: z.enum(["dir", "file", "submodule", "symlink"]),
  url: z.string().url(),
})), z.object({
  _links: z.object({
    git: z.string().url().nullable(),
    html: z.string().url().nullable(),
    self: z.string().url(),
  }),
  content: z.string(),
  download_url: z.string().url().nullable(),
  encoding: z.string(),
  git_url: z.string().url().nullable(),
  html_url: z.string().url().nullable(),
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  size: z.number().int(),
  submodule_git_url: z.string().optional(),
  target: z.string().optional(),
  type: z.literal("file"),
  url: z.string().url(),
}), z.object({
  _links: z.object({
    git: z.string().url().nullable(),
    html: z.string().url().nullable(),
    self: z.string().url(),
  }),
  download_url: z.string().url().nullable(),
  git_url: z.string().url().nullable(),
  html_url: z.string().url().nullable(),
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  size: z.number().int(),
  target: z.string(),
  type: z.literal("symlink"),
  url: z.string().url(),
}), z.object({
  _links: z.object({
    git: z.string().url().nullable(),
    html: z.string().url().nullable(),
    self: z.string().url(),
  }),
  download_url: z.string().url().nullable(),
  git_url: z.string().url().nullable(),
  html_url: z.string().url().nullable(),
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  size: z.number().int(),
  submodule_git_url: z.string().url(),
  type: z.literal("submodule"),
  url: z.string().url(),
})])

export const reposGetContent = pikkuSessionlessFunc({
  description: "Gets the contents of a file or directory in a repository. Specify the file path or directory in `:path`. If you omit\n`:path`, you will receive the contents of the repository's root directory. See the description below regarding what the API response includes for directories. \n\nFiles and symlinks support [a custom media type](https://docs.github.com/rest/reference/repos#custom-media-types) for\nretrieving the raw content or rendered HTML (when supported). All content types support [a custom media\ntype](https://docs.github.com/rest/reference/repos#custom-media-types) to ensure the content is returned in a consistent\nobject format.\n\n**Notes**:\n*   To get a repository's contents recursively, you can [recursively get the tree](https://docs.github.com/rest/reference/git#trees).\n*   This API has an upper limit of 1,000 files for a directory. If you need to retrieve more files, use the [Git Trees\nAPI](https://docs.github.com/rest/reference/git#get-a-tree).\n *  Download URLs expire and are meant to be used just once. To ensure the download URL does not expire, please use the contents API to obtain a fresh download URL for each download.\n#### Size limits\nIf the requested file's size is:\n* 1 MB or smaller: All features of this endpoint are supported.\n* Between 1-100 MB: Only the `raw` or `object` [custom media types](https://docs.github.com/rest/repos/contents#custom-media-types-for-repository-contents) are supported. Both will work as normal, except that when using the `object` media type, the `content` field will be an empty string and the `encoding` field will be `\"none\"`. To get the contents of these larger files, use the `raw` media type.\n * Greater than 100 MB: This endpoint is not supported.\n\n#### If the content is a directory\nThe response will be an array of objects, one object for each item in the directory.\nWhen listing the contents of a directory, submodules have their \"type\" specified as \"file\". Logically, the value\n_should_ be \"submodule\". This behavior exists in API v3 [for backwards compatibility purposes](https://git.io/v1YCW).\nIn the next major version of the API, the type will be returned as \"submodule\".\n\n#### If the content is a symlink \nIf the requested `:path` points to a symlink, and the symlink's target is a normal file in the repository, then the\nAPI responds with the content of the file (in the format shown in the example. Otherwise, the API responds with an object \ndescribing the symlink itself.\n\n#### If the content is a submodule\nThe `submodule_git_url` identifies the location of the submodule repository, and the `sha` identifies a specific\ncommit within the submodule repository. Git uses the given URL when cloning the submodule repository, and checks out\nthe submodule at that specific commit.\n\nIf the submodule repository is not hosted on github.com, the Git URLs (`git_url` and `_links[\"git\"]`) and the\ngithub.com URLs (`html_url` and `_links[\"html\"]`) will have null values.",
  input: ReposGetContentInput,
  output: ReposGetContentOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/contents/{path}", data) as any
  },
})
