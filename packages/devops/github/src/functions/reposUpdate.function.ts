// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposUpdateInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  allow_auto_merge: z.boolean().optional().default(false).describe("Either `true` to allow auto-merge on pull requests, or `false` to disallow auto-merge."),
  allow_forking: z.boolean().optional().default(false).describe("Either `true` to allow private forks, or `false` to prevent private forks."),
  allow_merge_commit: z.boolean().optional().default(true).describe("Either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits."),
  allow_rebase_merge: z.boolean().optional().default(true).describe("Either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging."),
  allow_squash_merge: z.boolean().optional().default(true).describe("Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging."),
  allow_update_branch: z.boolean().optional().default(false).describe("Either `true` to always allow a pull request head branch that is behind its base branch to be updated even if it is not required to be up to date before merging, or false otherwise."),
  archived: z.boolean().optional().default(false).describe("Whether to archive this repository. `false` will unarchive a previously archived repository."),
  default_branch: z.string().optional().describe("Updates the default branch for this repository."),
  delete_branch_on_merge: z.boolean().optional().default(false).describe("Either `true` to allow automatically deleting head branches when pull requests are merged, or `false` to prevent automatic deletion."),
  description: z.string().optional().describe("A short description of the repository."),
  has_issues: z.boolean().optional().default(true).describe("Either `true` to enable issues for this repository or `false` to disable them."),
  has_projects: z.boolean().optional().default(true).describe("Either `true` to enable projects for this repository or `false` to disable them. **Note:** If you're creating a repository in an organization that has disabled repository projects, the default is `false`, and if you pass `true`, the API returns an error."),
  has_wiki: z.boolean().optional().default(true).describe("Either `true` to enable the wiki for this repository or `false` to disable it."),
  homepage: z.string().optional().describe("A URL with more information about the repository."),
  is_template: z.boolean().optional().default(false).describe("Either `true` to make this repo available as a template repository or `false` to prevent it."),
  merge_commit_message: z.enum(["PR_BODY", "PR_TITLE", "BLANK"]).optional().describe("The default value for a merge commit message.\n\n- `PR_TITLE` - default to the pull request's title.\n- `PR_BODY` - default to the pull request's body.\n- `BLANK` - default to a blank commit message."),
  merge_commit_title: z.enum(["PR_TITLE", "MERGE_MESSAGE"]).optional().describe("The default value for a merge commit title.\n\n- `PR_TITLE` - default to the pull request's title.\n- `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name)."),
  name: z.string().optional().describe("The name of the repository."),
  private: z.boolean().optional().default(false).describe("Either `true` to make the repository private or `false` to make it public. Default: `false`.  \n**Note**: You will get a `422` error if the organization restricts [changing repository visibility](https://docs.github.com/articles/repository-permission-levels-for-an-organization#changing-the-visibility-of-repositories) to organization owners and a non-owner tries to change the value of private."),
  security_and_analysis: z.object({
  advanced_security: z.object({
    status: z.string().optional().describe("Can be `enabled` or `disabled`."),
  }).optional().describe("Use the `status` property to enable or disable GitHub Advanced Security for this repository. For more information, see \"[About GitHub Advanced Security](/github/getting-started-with-github/learning-about-github/about-github-advanced-security).\""),
  secret_scanning: z.object({
    status: z.string().optional().describe("Can be `enabled` or `disabled`."),
  }).optional().describe("Use the `status` property to enable or disable secret scanning for this repository. For more information, see \"[About secret scanning](/code-security/secret-security/about-secret-scanning).\""),
  secret_scanning_push_protection: z.object({
    status: z.string().optional().describe("Can be `enabled` or `disabled`."),
  }).optional().describe("Use the `status` property to enable or disable secret scanning push protection for this repository. For more information, see \"[Protecting pushes with secret scanning](/code-security/secret-scanning/protecting-pushes-with-secret-scanning).\""),
}).nullable().optional().describe("Specify which security and analysis features to enable or disable for the repository.\n\nTo use this parameter, you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see \"[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization).\"\n\nFor example, to enable GitHub Advanced Security, use this data in the body of the `PATCH` request:\n`{ \"security_and_analysis\": {\"advanced_security\": { \"status\": \"enabled\" } } }`.\n\nYou can check which security and analysis features are currently enabled by using a `GET /repos/{owner}/{repo}` request."),
  squash_merge_commit_message: z.enum(["PR_BODY", "COMMIT_MESSAGES", "BLANK"]).optional().describe("The default value for a squash merge commit message:\n\n- `PR_BODY` - default to the pull request's body.\n- `COMMIT_MESSAGES` - default to the branch's commit messages.\n- `BLANK` - default to a blank commit message."),
  squash_merge_commit_title: z.enum(["PR_TITLE", "COMMIT_OR_PR_TITLE"]).optional().describe("The default value for a squash merge commit title:\n\n- `PR_TITLE` - default to the pull request's title.\n- `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit)."),
  use_squash_pr_title_as_default: z.boolean().optional().default(false).describe("Either `true` to allow squash-merge commits to use pull request title, or `false` to use commit message. **This property has been deprecated. Please use `squash_merge_commit_title` instead."),
  visibility: z.enum(["public", "private"]).optional().describe("The visibility of the repository."),
  web_commit_signoff_required: z.boolean().optional().default(false).describe("Either `true` to require contributors to sign off on web-based commits, or `false` to not require contributors to sign off on web-based commits."),
})

export const ReposUpdateOutput = z.any()

export const reposUpdate = pikkuSessionlessFunc({
  description: "**Note**: To edit a repository's topics, use the [Replace all repository topics](https://docs.github.com/rest/reference/repos#replace-all-repository-topics) endpoint.",
  input: ReposUpdateInput,
  output: ReposUpdateOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}", data) as any
  },
})
