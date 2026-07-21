// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const MigrationsStartImportInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  tfvc_project: z.string().optional().describe("For a tfvc import, the name of the project that is being imported."),
  vcs: z.enum(["subversion", "git", "mercurial", "tfvc"]).optional().describe("The originating VCS type. Without this parameter, the import job will take additional time to detect the VCS type before beginning the import. This detection step will be reflected in the response."),
  vcs_password: z.string().optional().describe("If authentication is required, the password to provide to `vcs_url`."),
  vcs_url: z.string().describe("The URL of the originating repository."),
  vcs_username: z.string().optional().describe("If authentication is required, the username to provide to `vcs_url`."),
})

export const MigrationsStartImportOutput = z.object({
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

export const migrationsStartImport = pikkuSessionlessFunc({
  description: "Start a source import to a GitHub repository using GitHub Importer. Importing into a GitHub repository with GitHub Actions enabled is not supported and will return a status `422 Unprocessable Entity` response.",
  input: MigrationsStartImportInput,
  output: MigrationsStartImportOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/import", data) as any
  },
})
