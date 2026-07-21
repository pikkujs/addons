// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const DependabotListAlertsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  state: z.string().optional().describe("A comma-separated list of states. If specified, only alerts with these states will be returned.\n\nCan be: `dismissed`, `fixed`, `open`"),
  severity: z.string().optional().describe("A comma-separated list of severities. If specified, only alerts with these severities will be returned.\n\nCan be: `low`, `medium`, `high`, `critical`"),
  ecosystem: z.string().optional().describe("A comma-separated list of ecosystems. If specified, only alerts for these ecosystems will be returned.\n\nCan be: `composer`, `go`, `maven`, `npm`, `nuget`, `pip`, `pub`, `rubygems`, `rust`"),
  package: z.string().optional().describe("A comma-separated list of package names. If specified, only alerts for these packages will be returned."),
  manifest: z.string().optional().describe("A comma-separated list of full manifest paths. If specified, only alerts for these manifests will be returned."),
  scope: z.enum(["development", "runtime"]).optional().describe("The scope of the vulnerable dependency. If specified, only alerts with this scope will be returned."),
  sort: z.enum(["created", "updated"]).optional().default("created").describe("The property by which to sort the results.\n`created` means when the alert was created.\n`updated` means when the alert's state last changed."),
  direction: z.enum(["asc", "desc"]).optional().default("desc").describe("The direction to sort the results by."),
  page: z.number().int().optional().default(1).describe("**Deprecated**. Page number of the results to fetch. Use cursor-based pagination with `before` or `after` instead."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  before: z.string().optional().describe("A cursor, as given in the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header). If specified, the query only searches for results before this cursor."),
  after: z.string().optional().describe("A cursor, as given in the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header). If specified, the query only searches for results after this cursor."),
  first: z.number().int().min(1).max(100).optional().default(30).describe("**Deprecated**. The number of results per page (max 100), starting from the first matching result.\nThis parameter must not be used in combination with `last`.\nInstead, use `per_page` in combination with `after` to fetch the first page of results."),
  last: z.number().int().min(1).max(100).optional().describe("**Deprecated**. The number of results per page (max 100), starting from the last matching result.\nThis parameter must not be used in combination with `first`.\nInstead, use `per_page` in combination with `before` to fetch the last page of results."),
})

export const DependabotListAlertsForRepoOutput = z.array(z.object({
  created_at: z.string().datetime().describe("The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  dependency: z.object({
    manifest_path: z.string().optional().describe("The full path to the dependency manifest file, relative to the root of the repository."),
    package: z.object({
      ecosystem: z.string().describe("The package's language or package management ecosystem."),
      name: z.string().describe("The unique package name within its ecosystem."),
    }).optional().describe("Details for the vulnerable package."),
    scope: z.enum(["development", "runtime"]).nullable().optional().describe("The execution scope of the vulnerable dependency."),
  }).describe("Details for the vulnerable dependency."),
  dismissed_at: z.string().datetime().nullable().describe("The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  dismissed_by: z.object({
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
  }).nullable().describe("A GitHub user."),
  dismissed_comment: z.string().max(280).nullable().describe("An optional comment associated with the alert's dismissal."),
  dismissed_reason: z.enum(["fix_started", "inaccurate", "no_bandwidth", "not_used", "tolerable_risk"]).nullable().describe("The reason that the alert was dismissed."),
  fixed_at: z.string().datetime().nullable().describe("The time that the alert was no longer detected and was considered fixed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  html_url: z.string().url().describe("The GitHub URL of the alert resource."),
  number: z.number().int().describe("The security alert number."),
  security_advisory: z.object({
    cve_id: z.string().nullable().describe("The unique CVE ID assigned to the advisory."),
    cvss: z.object({
      score: z.number().min(0).max(10).describe("The overall CVSS score of the advisory."),
      vector_string: z.string().nullable().describe("The full CVSS vector string for the advisory."),
    }).describe("Details for the advisory pertaining to the Common Vulnerability Scoring System."),
    cwes: z.array(z.object({
      cwe_id: z.string().describe("The unique CWE ID."),
      name: z.string().describe("The short, plain text name of the CWE."),
    })).describe("Details for the advisory pertaining to Common Weakness Enumeration."),
    description: z.string().describe("A long-form Markdown-supported description of the advisory."),
    ghsa_id: z.string().describe("The unique GitHub Security Advisory ID assigned to the advisory."),
    identifiers: z.array(z.object({
      type: z.enum(["CVE", "GHSA"]).describe("The type of advisory identifier."),
      value: z.string().describe("The value of the advisory identifer."),
    })).describe("Values that identify this advisory among security information sources."),
    published_at: z.string().datetime().describe("The time that the advisory was published in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
    references: z.array(z.object({
      url: z.string().url().describe("The URL of the reference."),
    })).describe("Links to additional advisory information."),
    severity: z.enum(["low", "medium", "high", "critical"]).describe("The severity of the advisory."),
    summary: z.string().max(1024).describe("A short, plain text summary of the advisory."),
    updated_at: z.string().datetime().describe("The time that the advisory was last modified in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
    vulnerabilities: z.array(z.object({
      first_patched_version: z.object({
        identifier: z.string().describe("The package version that patches this vulnerability."),
      }).nullable().describe("Details pertaining to the package version that patches this vulnerability."),
      package: z.object({
        ecosystem: z.string().describe("The package's language or package management ecosystem."),
        name: z.string().describe("The unique package name within its ecosystem."),
      }).describe("Details for the vulnerable package."),
      severity: z.enum(["low", "medium", "high", "critical"]).describe("The severity of the vulnerability."),
      vulnerable_version_range: z.string().describe("Conditions that identify vulnerable versions of this vulnerability's package."),
    })).describe("Vulnerable version range information for the advisory."),
    withdrawn_at: z.string().datetime().nullable().describe("The time that the advisory was withdrawn in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  }).describe("Details for the GitHub Security Advisory."),
  security_vulnerability: z.object({
    first_patched_version: z.object({
      identifier: z.string().describe("The package version that patches this vulnerability."),
    }).nullable().describe("Details pertaining to the package version that patches this vulnerability."),
    package: z.object({
      ecosystem: z.string().describe("The package's language or package management ecosystem."),
      name: z.string().describe("The unique package name within its ecosystem."),
    }).describe("Details for the vulnerable package."),
    severity: z.enum(["low", "medium", "high", "critical"]).describe("The severity of the vulnerability."),
    vulnerable_version_range: z.string().describe("Conditions that identify vulnerable versions of this vulnerability's package."),
  }).describe("Details pertaining to one vulnerable version range for the advisory."),
  state: z.enum(["dismissed", "fixed", "open"]).describe("The state of the Dependabot alert."),
  updated_at: z.string().datetime().describe("The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  url: z.string().url().describe("The REST API URL of the alert resource."),
}))

export const dependabotListAlertsForRepo = pikkuSessionlessFunc({
  description: "You must use an access token with the `security_events` scope to use this endpoint with private repositories.\nYou can also use tokens with the `public_repo` scope for public repositories only.\nGitHub Apps must have **Dependabot alerts** read permission to use this endpoint.",
  input: DependabotListAlertsForRepoInput,
  output: DependabotListAlertsForRepoOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/dependabot/alerts", data) as any
  },
})
