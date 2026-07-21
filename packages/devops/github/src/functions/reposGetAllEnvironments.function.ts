// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposGetAllEnvironmentsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposGetAllEnvironmentsOutput = z.object({
  environments: z.array(z.object({
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
  })).optional(),
  total_count: z.number().int().optional().describe("The number of environments in this repository"),
})

export const reposGetAllEnvironments = pikkuSessionlessFunc({
  description: "Lists the environments for a repository.\n\nAnyone with read access to the repository can use this endpoint. If the repository is private, you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ReposGetAllEnvironmentsInput,
  output: ReposGetAllEnvironmentsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/environments", data) as any
  },
})
