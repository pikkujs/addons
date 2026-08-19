// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const OrgsGetInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const OrgsGetOutput = z.object({
  advanced_security_enabled_for_new_repositories: z.boolean().optional().describe("Whether GitHub Advanced Security is enabled for new repositories and repositories transferred to this organization.\n\nThis field is only visible to organization owners or members of a team with the security manager role."),
  avatar_url: z.string(),
  billing_email: z.string().email().nullable().optional(),
  blog: z.string().url().optional(),
  collaborators: z.number().int().nullable().optional(),
  company: z.string().optional(),
  created_at: z.string().datetime(),
  default_repository_permission: z.string().nullable().optional(),
  dependabot_alerts_enabled_for_new_repositories: z.boolean().optional().describe("Whether GitHub Advanced Security is automatically enabled for new repositories and repositories transferred to\nthis organization.\n\nThis field is only visible to organization owners or members of a team with the security manager role."),
  dependabot_security_updates_enabled_for_new_repositories: z.boolean().optional().describe("Whether dependabot security updates are automatically enabled for new repositories and repositories transferred\nto this organization.\n\nThis field is only visible to organization owners or members of a team with the security manager role."),
  dependency_graph_enabled_for_new_repositories: z.boolean().optional().describe("Whether dependency graph is automatically enabled for new repositories and repositories transferred to this\norganization.\n\nThis field is only visible to organization owners or members of a team with the security manager role."),
  description: z.string().nullable(),
  disk_usage: z.number().int().nullable().optional(),
  email: z.string().email().optional(),
  events_url: z.string().url(),
  followers: z.number().int(),
  following: z.number().int(),
  has_organization_projects: z.boolean(),
  has_repository_projects: z.boolean(),
  hooks_url: z.string(),
  html_url: z.string().url(),
  id: z.number().int(),
  is_verified: z.boolean().optional(),
  issues_url: z.string(),
  location: z.string().optional(),
  login: z.string(),
  members_allowed_repository_creation_type: z.string().optional(),
  members_can_create_internal_repositories: z.boolean().optional(),
  members_can_create_pages: z.boolean().optional(),
  members_can_create_private_pages: z.boolean().optional(),
  members_can_create_private_repositories: z.boolean().optional(),
  members_can_create_public_pages: z.boolean().optional(),
  members_can_create_public_repositories: z.boolean().optional(),
  members_can_create_repositories: z.boolean().nullable().optional(),
  members_can_fork_private_repositories: z.boolean().nullable().optional(),
  members_url: z.string(),
  name: z.string().optional(),
  node_id: z.string(),
  owned_private_repos: z.number().int().optional(),
  plan: z.object({
    filled_seats: z.number().int().optional(),
    name: z.string(),
    private_repos: z.number().int(),
    seats: z.number().int().optional(),
    space: z.number().int(),
  }).optional(),
  private_gists: z.number().int().nullable().optional(),
  public_gists: z.number().int(),
  public_members_url: z.string(),
  public_repos: z.number().int(),
  repos_url: z.string().url(),
  secret_scanning_enabled_for_new_repositories: z.boolean().optional().describe("Whether secret scanning is automatically enabled for new repositories and repositories transferred to this\norganization.\n\nThis field is only visible to organization owners or members of a team with the security manager role."),
  secret_scanning_push_protection_custom_link: z.string().nullable().optional().describe("An optional URL string to display to contributors who are blocked from pushing a secret."),
  secret_scanning_push_protection_custom_link_enabled: z.boolean().optional().describe("Whether a custom link is shown to contributors who are blocked from pushing a secret by push protection."),
  secret_scanning_push_protection_enabled_for_new_repositories: z.boolean().optional().describe("Whether secret scanning push protection is automatically enabled for new repositories and repositories\ntransferred to this organization.\n\nThis field is only visible to organization owners or members of a team with the security manager role."),
  total_private_repos: z.number().int().optional(),
  twitter_username: z.string().nullable().optional(),
  two_factor_requirement_enabled: z.boolean().nullable().optional(),
  type: z.string(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
  web_commit_signoff_required: z.boolean().optional(),
}).describe("Organization Full")

export const orgsGet = pikkuSessionlessFunc({
  description: "To see many of the organization response values, you need to be an authenticated organization owner with the `admin:org` scope. When the value of `two_factor_requirement_enabled` is `true`, the organization requires all members, billing managers, and outside collaborators to enable [two-factor authentication](https://docs.github.com/articles/securing-your-account-with-two-factor-authentication-2fa/).\n\nGitHub Apps with the `Organization plan` permission can use this endpoint to retrieve information about an organization's GitHub plan. See \"[Authenticating with GitHub Apps](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/)\" for details. For an example response, see 'Response with GitHub plan information' below.\"",
  input: OrgsGetInput,
  output: OrgsGetOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}", data) as any
  },
})
