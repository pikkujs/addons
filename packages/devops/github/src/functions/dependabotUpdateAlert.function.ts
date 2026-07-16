// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError, NotFoundError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'
import { alertnumberSchema } from '../github.types.js'

export const DependabotUpdateAlertInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  alert_number: alertnumberSchema.describe("The number that identifies a Dependabot alert in its repository.\nYou can find this at the end of the URL for a Dependabot alert within GitHub,\nor in `number` fields in the response from the\n`GET /repos/{owner}/{repo}/dependabot/alerts` operation."),
  dismissed_comment: z.string().max(280).optional().describe("An optional comment associated with dismissing the alert."),
  dismissed_reason: z.enum(["fix_started", "inaccurate", "no_bandwidth", "not_used", "tolerable_risk"]).optional().describe("**Required when `state` is `dismissed`.** A reason for dismissing the alert."),
  state: z.enum(["dismissed", "open"]).describe("The state of the Dependabot alert.\nA `dismissed_reason` must be provided when setting the state to `dismissed`."),
})

export const DependabotUpdateAlertOutput = z.object({
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
}).describe("A Dependabot alert.")

export const dependabotUpdateAlert = pikkuSessionlessFunc({
  description: "You must use an access token with the `security_events` scope to use this endpoint with private repositories.\nYou can also use tokens with the `public_repo` scope for public repositories only.\nGitHub Apps must have **Dependabot alerts** write permission to use this endpoint.",
  input: DependabotUpdateAlertInput,
  output: DependabotUpdateAlertOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError, ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/dependabot/alerts/{alert_number}", data) as any
  },
})
