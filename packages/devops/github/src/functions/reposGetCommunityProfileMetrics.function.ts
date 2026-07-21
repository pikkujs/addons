// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposGetCommunityProfileMetricsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetCommunityProfileMetricsOutput = z.object({
  content_reports_enabled: z.boolean().optional(),
  description: z.string().nullable(),
  documentation: z.string().nullable(),
  files: z.object({
    code_of_conduct: z.object({
      html_url: z.string().url().nullable(),
      key: z.string(),
      name: z.string(),
      url: z.string().url(),
    }).nullable().describe("Code of Conduct Simple"),
    code_of_conduct_file: z.object({
      html_url: z.string().url(),
      url: z.string().url(),
    }).nullable(),
    contributing: z.object({
      html_url: z.string().url(),
      url: z.string().url(),
    }).nullable(),
    issue_template: z.object({
      html_url: z.string().url(),
      url: z.string().url(),
    }).nullable(),
    license: z.object({
      html_url: z.string().url().optional(),
      key: z.string(),
      name: z.string(),
      node_id: z.string(),
      spdx_id: z.string().nullable(),
      url: z.string().url().nullable(),
    }).nullable().describe("License Simple"),
    pull_request_template: z.object({
      html_url: z.string().url(),
      url: z.string().url(),
    }).nullable(),
    readme: z.object({
      html_url: z.string().url(),
      url: z.string().url(),
    }).nullable(),
  }),
  health_percentage: z.number().int(),
  updated_at: z.string().datetime().nullable(),
}).describe("Community Profile")

export const reposGetCommunityProfileMetrics = pikkuSessionlessFunc({
  description: "Returns all community profile metrics for a repository. The repository cannot be a fork.\n\nThe returned metrics include an overall health score, the repository description, the presence of documentation, the\ndetected code of conduct, the detected license, and the presence of ISSUE\\_TEMPLATE, PULL\\_REQUEST\\_TEMPLATE,\nREADME, and CONTRIBUTING files.\n\nThe `health_percentage` score is defined as a percentage of how many of\nthese four documents are present: README, CONTRIBUTING, LICENSE, and\nCODE_OF_CONDUCT. For example, if all four documents are present, then\nthe `health_percentage` is `100`. If only one is present, then the\n`health_percentage` is `25`.\n\n`content_reports_enabled` is only returned for organization-owned repositories.",
  input: ReposGetCommunityProfileMetricsInput,
  output: ReposGetCommunityProfileMetricsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/community/profile", data) as any
  },
})
