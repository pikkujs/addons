// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const MigrationsSetLfsPreferenceInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  use_lfs: z.enum(["opt_in", "opt_out"]).describe("Whether to store large files during the import. `opt_in` means large files will be stored using Git LFS. `opt_out` means large files will be removed during the import."),
})

export const MigrationsSetLfsPreferenceOutput = z.object({
  authors_count: z.number().int().nullable().optional(),
  authors_url: z.string().url(),
  commit_count: z.number().int().nullable().optional(),
  error_message: z.string().nullable().optional(),
  failed_step: z.string().nullable().optional(),
  has_large_files: z.boolean().optional(),
  html_url: z.string().url(),
  import_percent: z.number().int().nullable().optional(),
  large_files_count: z.number().int().optional(),
  large_files_size: z.number().int().optional(),
  message: z.string().optional(),
  project_choices: z.array(z.object({
    human_name: z.string().optional(),
    tfvc_project: z.string().optional(),
    vcs: z.string().optional(),
  })).optional(),
  push_percent: z.number().int().nullable().optional(),
  repository_url: z.string().url(),
  status: z.enum(["auth", "error", "none", "detecting", "choose", "auth_failed", "importing", "mapping", "waiting_to_push", "pushing", "complete", "setup", "unknown", "detection_found_multiple", "detection_found_nothing", "detection_needs_auth"]),
  status_text: z.string().nullable().optional(),
  svc_root: z.string().optional(),
  svn_root: z.string().optional(),
  tfvc_project: z.string().optional(),
  url: z.string().url(),
  use_lfs: z.boolean().optional(),
  vcs: z.string().nullable(),
  vcs_url: z.string().describe("The URL of the originating repository."),
}).describe("A repository import from an external source.")

export const migrationsSetLfsPreference = pikkuSessionlessFunc({
  description: "You can import repositories from Subversion, Mercurial, and TFS that include files larger than 100MB. This ability is powered by [Git LFS](https://git-lfs.com). You can learn more about our LFS feature and working with large files [on our help site](https://docs.github.com/repositories/working-with-files/managing-large-files).",
  input: MigrationsSetLfsPreferenceInput,
  output: MigrationsSetLfsPreferenceOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/import/lfs", data) as any
  },
})
