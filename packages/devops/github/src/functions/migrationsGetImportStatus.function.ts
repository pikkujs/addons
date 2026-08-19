// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const MigrationsGetImportStatusInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const MigrationsGetImportStatusOutput = z.object({
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

export const migrationsGetImportStatus = pikkuSessionlessFunc({
  description: "View the progress of an import.\n\n**Import status**\n\nThis section includes details about the possible values of the `status` field of the Import Progress response.\n\nAn import that does not have errors will progress through these steps:\n\n*   `detecting` - the \"detection\" step of the import is in progress because the request did not include a `vcs` parameter. The import is identifying the type of source control present at the URL.\n*   `importing` - the \"raw\" step of the import is in progress. This is where commit data is fetched from the original repository. The import progress response will include `commit_count` (the total number of raw commits that will be imported) and `percent` (0 - 100, the current progress through the import).\n*   `mapping` - the \"rewrite\" step of the import is in progress. This is where SVN branches are converted to Git branches, and where author updates are applied. The import progress response does not include progress information.\n*   `pushing` - the \"push\" step of the import is in progress. This is where the importer updates the repository on GitHub. The import progress response will include `push_percent`, which is the percent value reported by `git push` when it is \"Writing objects\".\n*   `complete` - the import is complete, and the repository is ready on GitHub.\n\nIf there are problems, you will see one of these in the `status` field:\n\n*   `auth_failed` - the import requires authentication in order to connect to the original repository. To update authentication for the import, please see the [Update an import](https://docs.github.com/rest/migrations/source-imports#update-an-import) section.\n*   `error` - the import encountered an error. The import progress response will include the `failed_step` and an error message. Contact [GitHub Support](https://support.github.com/contact?tags=dotcom-rest-api) for more information.\n*   `detection_needs_auth` - the importer requires authentication for the originating repository to continue detection. To update authentication for the import, please see the [Update an import](https://docs.github.com/rest/migrations/source-imports#update-an-import) section.\n*   `detection_found_nothing` - the importer didn't recognize any source control at the URL. To resolve, [Cancel the import](https://docs.github.com/rest/migrations/source-imports#cancel-an-import) and [retry](https://docs.github.com/rest/migrations/source-imports#start-an-import) with the correct URL.\n*   `detection_found_multiple` - the importer found several projects or repositories at the provided URL. When this is the case, the Import Progress response will also include a `project_choices` field with the possible project choices as values. To update project choice, please see the [Update an import](https://docs.github.com/rest/migrations/source-imports#update-an-import) section.\n\n**The project_choices field**\n\nWhen multiple projects are found at the provided URL, the response hash will include a `project_choices` field, the value of which is an array of hashes each representing a project choice. The exact key/value pairs of the project hashes will differ depending on the version control type.\n\n**Git LFS related fields**\n\nThis section includes details about Git LFS related fields that may be present in the Import Progress response.\n\n*   `use_lfs` - describes whether the import has been opted in or out of using Git LFS. The value can be `opt_in`, `opt_out`, or `undecided` if no action has been taken.\n*   `has_large_files` - the boolean value describing whether files larger than 100MB were found during the `importing` step.\n*   `large_files_size` - the total size in gigabytes of files larger than 100MB found in the originating repository.\n*   `large_files_count` - the total number of files larger than 100MB found in the originating repository. To see a list of these files, make a \"Get Large Files\" request.",
  input: MigrationsGetImportStatusInput,
  output: MigrationsGetImportStatusOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/import", data) as any
  },
})
