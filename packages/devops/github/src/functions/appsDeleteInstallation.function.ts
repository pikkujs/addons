// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const AppsDeleteInstallationInput = z.object({
  installation_id: z.number().int().describe("The unique identifier of the installation."),
})

export const appsDeleteInstallation = pikkuSessionlessFunc({
  description: "Uninstalls a GitHub App on a user, organization, or business account. If you prefer to temporarily suspend an app's access to your account's resources, then we recommend the \"[Suspend an app installation](https://docs.github.com/rest/reference/apps/#suspend-an-app-installation)\" endpoint.\n\nYou must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.",
  input: AppsDeleteInstallationInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/app/installations/{installation_id}", data)
  },
})
