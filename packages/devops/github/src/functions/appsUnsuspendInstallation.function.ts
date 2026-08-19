// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const AppsUnsuspendInstallationInput = z.object({
  installation_id: z.number().int().describe("The unique identifier of the installation."),
})

export const appsUnsuspendInstallation = pikkuSessionlessFunc({
  description: "Removes a GitHub App installation suspension.\n\nYou must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.",
  input: AppsUnsuspendInstallationInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/app/installations/{installation_id}/suspended", data)
  },
})
