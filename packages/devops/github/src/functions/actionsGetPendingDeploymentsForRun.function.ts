// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetPendingDeploymentsForRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
})

export const ActionsGetPendingDeploymentsForRunOutput = z.array(z.object({
  current_user_can_approve: z.boolean().describe("Whether the currently authenticated user can approve the deployment"),
  environment: z.object({
    html_url: z.string().optional(),
    id: z.number().int().optional().describe("The id of the environment."),
    name: z.string().optional().describe("The name of the environment."),
    node_id: z.string().optional(),
    url: z.string().optional(),
  }),
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
  })).describe("The people or teams that may approve jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed."),
  wait_timer: z.number().int().describe("The set duration of the wait timer"),
  wait_timer_started_at: z.string().datetime().nullable().describe("The time that the wait timer began."),
}))

export const actionsGetPendingDeploymentsForRun = pikkuSessionlessFunc({
  description: "Get all deployment environments for a workflow run that are waiting for protection rules to pass.\n\nAnyone with read access to the repository can use this endpoint. If the repository is private, you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetPendingDeploymentsForRunInput,
  output: ActionsGetPendingDeploymentsForRunOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments", data) as any
  },
})
