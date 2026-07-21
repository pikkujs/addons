// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MigrationsUpdateImportInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  tfvc_project: z.string().optional().describe("For a tfvc import, the name of the project that is being imported."),
  vcs: z.enum(["subversion", "tfvc", "git", "mercurial"]).optional().describe("The type of version control system you are migrating from."),
  vcs_password: z.string().optional().describe("The password to provide to the originating repository."),
  vcs_username: z.string().optional().describe("The username to provide to the originating repository."),
})

export const MigrationsUpdateImportOutput = z.object({
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

export const migrationsUpdateImport = pikkuSessionlessFunc({
  description: "An import can be updated with credentials or a project choice by passing in the appropriate parameters in this API\nrequest. If no parameters are provided, the import will be restarted.\n\nSome servers (e.g. TFS servers) can have several projects at a single URL. In those cases the import progress will\nhave the status `detection_found_multiple` and the Import Progress response will include a `project_choices` array.\nYou can select the project to import by providing one of the objects in the `project_choices` array in the update request.",
  input: MigrationsUpdateImportInput,
  output: MigrationsUpdateImportOutput,
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/import", data) as any
  },
})
