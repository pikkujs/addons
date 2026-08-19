// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGetPagesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetPagesOutput = z.object({
  build_type: z.enum(["legacy", "workflow"]).nullable().optional().describe("The process in which the Page will be built."),
  cname: z.string().nullable().describe("The Pages site's custom domain"),
  custom_404: z.boolean().default(false).describe("Whether the Page has a custom 404 page."),
  html_url: z.string().url().optional().describe("The web address the Page can be accessed from."),
  https_certificate: z.object({
    description: z.string(),
    domains: z.array(z.string()).describe("Array of the domain set and its alternate name (if it is configured)"),
    expires_at: z.string().date().optional(),
    state: z.enum(["new", "authorization_created", "authorization_pending", "authorized", "authorization_revoked", "issued", "uploaded", "approved", "errored", "bad_authz", "destroy_pending", "dns_changed"]),
  }).optional(),
  https_enforced: z.boolean().optional().describe("Whether https is enabled on the domain"),
  pending_domain_unverified_at: z.string().datetime().nullable().optional().describe("The timestamp when a pending domain becomes unverified."),
  protected_domain_state: z.enum(["pending", "verified", "unverified"]).nullable().optional().describe("The state if the domain is verified"),
  public: z.boolean().describe("Whether the GitHub Pages site is publicly visible. If set to `true`, the site is accessible to anyone on the internet. If set to `false`, the site will only be accessible to users who have at least `read` access to the repository that published the site."),
  source: z.object({
    branch: z.string(),
    path: z.string(),
  }).optional(),
  status: z.enum(["built", "building", "errored"]).nullable().describe("The status of the most recent build of the Page."),
  url: z.string().url().describe("The API address for accessing this Page resource."),
}).describe("The configuration for GitHub Pages for a repository.")

export const reposGetPages = pikkuSessionlessFunc({
  input: ReposGetPagesInput,
  output: ReposGetPagesOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pages", data) as any
  },
})
