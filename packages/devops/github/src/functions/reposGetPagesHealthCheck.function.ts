// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposGetPagesHealthCheckInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetPagesHealthCheckOutput = z.object({
  alt_domain: z.object({
    caa_error: z.string().nullable().optional(),
    dns_resolves: z.boolean().optional(),
    enforces_https: z.boolean().optional(),
    has_cname_record: z.boolean().nullable().optional(),
    has_mx_records_present: z.boolean().nullable().optional(),
    host: z.string().optional(),
    https_error: z.string().nullable().optional(),
    is_a_record: z.boolean().nullable().optional(),
    is_apex_domain: z.boolean().optional(),
    is_cloudflare_ip: z.boolean().nullable().optional(),
    is_cname_to_fastly: z.boolean().nullable().optional(),
    is_cname_to_github_user_domain: z.boolean().nullable().optional(),
    is_cname_to_pages_dot_github_dot_com: z.boolean().nullable().optional(),
    is_fastly_ip: z.boolean().nullable().optional(),
    is_https_eligible: z.boolean().nullable().optional(),
    is_non_github_pages_ip_present: z.boolean().nullable().optional(),
    is_old_ip_address: z.boolean().nullable().optional(),
    is_pages_domain: z.boolean().optional(),
    is_pointed_to_github_pages_ip: z.boolean().nullable().optional(),
    is_proxied: z.boolean().nullable().optional(),
    is_served_by_pages: z.boolean().nullable().optional(),
    is_valid: z.boolean().optional(),
    is_valid_domain: z.boolean().optional(),
    nameservers: z.string().optional(),
    reason: z.string().nullable().optional(),
    responds_to_https: z.boolean().optional(),
    should_be_a_record: z.boolean().nullable().optional(),
    uri: z.string().optional(),
  }).nullable().optional(),
  domain: z.object({
    caa_error: z.string().nullable().optional(),
    dns_resolves: z.boolean().optional(),
    enforces_https: z.boolean().optional(),
    has_cname_record: z.boolean().nullable().optional(),
    has_mx_records_present: z.boolean().nullable().optional(),
    host: z.string().optional(),
    https_error: z.string().nullable().optional(),
    is_a_record: z.boolean().nullable().optional(),
    is_apex_domain: z.boolean().optional(),
    is_cloudflare_ip: z.boolean().nullable().optional(),
    is_cname_to_fastly: z.boolean().nullable().optional(),
    is_cname_to_github_user_domain: z.boolean().nullable().optional(),
    is_cname_to_pages_dot_github_dot_com: z.boolean().nullable().optional(),
    is_fastly_ip: z.boolean().nullable().optional(),
    is_https_eligible: z.boolean().nullable().optional(),
    is_non_github_pages_ip_present: z.boolean().nullable().optional(),
    is_old_ip_address: z.boolean().nullable().optional(),
    is_pages_domain: z.boolean().optional(),
    is_pointed_to_github_pages_ip: z.boolean().nullable().optional(),
    is_proxied: z.boolean().nullable().optional(),
    is_served_by_pages: z.boolean().nullable().optional(),
    is_valid: z.boolean().optional(),
    is_valid_domain: z.boolean().optional(),
    nameservers: z.string().optional(),
    reason: z.string().nullable().optional(),
    responds_to_https: z.boolean().optional(),
    should_be_a_record: z.boolean().nullable().optional(),
    uri: z.string().optional(),
  }).optional(),
}).describe("Pages Health Check Status")

export const reposGetPagesHealthCheck = pikkuSessionlessFunc({
  description: "Gets a health check of the DNS settings for the `CNAME` record configured for a repository's GitHub Pages.\n\nThe first request to this endpoint returns a `202 Accepted` status and starts an asynchronous background task to get the results for the domain. After the background task completes, subsequent requests to this endpoint return a `200 OK` status with the health check results in the response.\n\nTo use this endpoint, you must be a repository administrator, maintainer, or have the 'manage GitHub Pages settings' permission. A token with the `repo` scope or Pages write permission is required. GitHub Apps must have the `administrative:write` and `pages:write` permissions.",
  input: ReposGetPagesHealthCheckInput,
  output: ReposGetPagesHealthCheckOutput,
  errors: [BadRequestError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pages/health", data) as any
  },
})
