// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const AppsSuspendInstallationInput = z.object({
  installation_id: z.number().int().describe("The unique identifier of the installation."),
})

export const appsSuspendInstallation = pikkuSessionlessFunc({
  description: "Suspends a GitHub App on a user, organization, or business account, which blocks the app from accessing the account's resources. When a GitHub App is suspended, the app's access to the GitHub API or webhook events is blocked for that account.\n\nYou must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.",
  input: AppsSuspendInstallationInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/app/installations/{installation_id}/suspended", data)
  },
})
