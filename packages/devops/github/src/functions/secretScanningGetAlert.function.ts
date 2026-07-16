// secret-scanning — Retrieve secret scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'
import { alertnumberSchema } from '../github.types.js'

export const SecretScanningGetAlertInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  alert_number: alertnumberSchema.describe("The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation."),
})

export const SecretScanningGetAlertOutput = z.object({
  created_at: z.string().datetime().optional().describe("The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  html_url: z.string().url().optional().describe("The GitHub URL of the alert resource."),
  locations_url: z.string().url().optional().describe("The REST API URL of the code locations for this alert."),
  number: z.number().int().optional().describe("The security alert number."),
  push_protection_bypassed: z.boolean().nullable().optional().describe("Whether push protection was bypassed for the detected secret."),
  push_protection_bypassed_at: z.string().datetime().nullable().optional().describe("The time that push protection was bypassed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  push_protection_bypassed_by: z.object({
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
  }).nullable().optional().describe("A GitHub user."),
  resolution: z.union([z.literal(null), z.literal("false_positive"), z.literal("wont_fix"), z.literal("revoked"), z.literal("used_in_tests")]).nullable().optional().describe("**Required when the `state` is `resolved`.** The reason for resolving the alert."),
  resolution_comment: z.string().nullable().optional().describe("An optional comment to resolve an alert."),
  resolved_at: z.string().datetime().nullable().optional().describe("The time that the alert was resolved in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  resolved_by: z.object({
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
  }).nullable().optional().describe("A GitHub user."),
  secret: z.string().optional().describe("The secret that was detected."),
  secret_type: z.string().optional().describe("The type of secret that secret scanning detected."),
  secret_type_display_name: z.string().optional().describe("User-friendly name for the detected secret, matching the `secret_type`.\nFor a list of built-in patterns, see \"[Secret scanning patterns](https://docs.github.com/code-security/secret-scanning/secret-scanning-patterns#supported-secrets-for-advanced-security).\""),
  state: z.enum(["open", "resolved"]).optional().describe("Sets the state of the secret scanning alert. You must provide `resolution` when you set the state to `resolved`."),
  updated_at: z.string().datetime().nullable().optional().describe("The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  url: z.string().url().optional().describe("The REST API URL of the alert resource."),
})

export const secretScanningGetAlert = pikkuSessionlessFunc({
  description: "Gets a single secret scanning alert detected in an eligible repository.\nTo use this endpoint, you must be an administrator for the repository or for the organization that owns the repository, and you must use a personal access token with the `repo` scope or `security_events` scope.\nFor public repositories, you may instead use the `public_repo` scope.\n\nGitHub Apps must have the `secret_scanning_alerts` read permission to use this endpoint.",
  input: SecretScanningGetAlertInput,
  output: SecretScanningGetAlertOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}", data) as any
  },
})
