// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreateOrUpdateEnvironmentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  environment_name: z.string().describe("The name of the environment."),
  deployment_branch_policy: z.object({
  custom_branch_policies: z.boolean().describe("Whether only branches that match the specified name patterns can deploy to this environment.  If `custom_branch_policies` is `true`, `protected_branches` must be `false`; if `custom_branch_policies` is `false`, `protected_branches` must be `true`."),
  protected_branches: z.boolean().describe("Whether only branches with branch protection rules can deploy to this environment. If `protected_branches` is `true`, `custom_branch_policies` must be `false`; if `protected_branches` is `false`, `custom_branch_policies` must be `true`."),
}).nullable().optional().describe("The type of deployment branch policy for this environment. To allow all branches to deploy, set to `null`."),
  reviewers: z.array(z.object({
  id: z.number().int().optional().describe("The id of the user or team who can review the deployment"),
  type: z.enum(["User", "Team"]).optional().describe("The type of reviewer."),
})).nullable().optional().describe("The people or teams that may review jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed."),
  wait_timer: z.number().int().optional().describe("The amount of time to delay a job after the job is initially triggered. The time (in minutes) must be an integer between 0 and 43,200 (30 days)."),
})

export const ReposCreateOrUpdateEnvironmentOutput = z.object({
  created_at: z.string().datetime().describe("The time that the environment was created, in ISO 8601 format."),
  deployment_branch_policy: z.object({
    custom_branch_policies: z.boolean().describe("Whether only branches that match the specified name patterns can deploy to this environment.  If `custom_branch_policies` is `true`, `protected_branches` must be `false`; if `custom_branch_policies` is `false`, `protected_branches` must be `true`."),
    protected_branches: z.boolean().describe("Whether only branches with branch protection rules can deploy to this environment. If `protected_branches` is `true`, `custom_branch_policies` must be `false`; if `protected_branches` is `false`, `custom_branch_policies` must be `true`."),
  }).nullable().optional().describe("The type of deployment branch policy for this environment. To allow all branches to deploy, set to `null`."),
  html_url: z.string(),
  id: z.number().int().describe("The id of the environment."),
  name: z.string().describe("The name of the environment."),
  node_id: z.string(),
  protection_rules: z.array(z.union([z.object({
    id: z.number().int(),
    node_id: z.string(),
    type: z.string(),
    wait_timer: z.number().int().optional().describe("The amount of time to delay a job after the job is initially triggered. The time (in minutes) must be an integer between 0 and 43,200 (30 days)."),
  }), z.object({
    id: z.number().int(),
    node_id: z.string(),
    reviewers: z.array(z.object({
      reviewer: z.union([z.object({
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
      }), z.object({
        description: z.string().nullable(),
        html_url: z.string().url(),
        id: z.number().int(),
        members_url: z.string(),
        name: z.string(),
        node_id: z.string(),
        parent: z.object({
          description: z.string().nullable().describe("Description of the team"),
          html_url: z.string().url(),
          id: z.number().int().describe("Unique identifier of the team"),
          ldap_dn: z.string().optional().describe("Distinguished Name (DN) that team maps to within LDAP environment"),
          members_url: z.string(),
          name: z.string().describe("Name of the team"),
          node_id: z.string(),
          permission: z.string().describe("Permission that the team will have for its repositories"),
          privacy: z.string().optional().describe("The level of privacy this team should have"),
          repositories_url: z.string().url(),
          slug: z.string(),
          url: z.string().url().describe("URL for the team"),
        }).nullable().describe("Groups of organization members that gives permissions on specified repositories."),
        permission: z.string(),
        permissions: z.object({
          admin: z.boolean(),
          maintain: z.boolean(),
          pull: z.boolean(),
          push: z.boolean(),
          triage: z.boolean(),
        }).optional(),
        privacy: z.string().optional(),
        repositories_url: z.string().url(),
        slug: z.string(),
        url: z.string().url(),
      })]).optional(),
      type: z.enum(["User", "Team"]).optional().describe("The type of reviewer."),
    })).optional().describe("The people or teams that may approve jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed."),
    type: z.string(),
  }), z.object({
    id: z.number().int(),
    node_id: z.string(),
    type: z.string(),
  })])).optional(),
  updated_at: z.string().datetime().describe("The time that the environment was last updated, in ISO 8601 format."),
  url: z.string(),
}).describe("Details of a deployment environment")

export const reposCreateOrUpdateEnvironment = pikkuSessionlessFunc({
  description: "Create or update an environment with protection rules, such as required reviewers. For more information about environment protection rules, see \"[Environments](/actions/reference/environments#environment-protection-rules).\"\n\n**Note:** To create or update name patterns that branches must match in order to deploy to this environment, see \"[Deployment branch policies](/rest/deployments/branch-policies).\"\n\n**Note:** To create or update secrets for an environment, see \"[Secrets](/rest/reference/actions#secrets).\"\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration:write` permission for the repository to use this endpoint.",
  input: ReposCreateOrUpdateEnvironmentInput,
  output: ReposCreateOrUpdateEnvironmentOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/environments/{environment_name}", data) as any
  },
})
