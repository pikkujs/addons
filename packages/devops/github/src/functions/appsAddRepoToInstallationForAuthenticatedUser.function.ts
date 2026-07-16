// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AppsAddRepoToInstallationForAuthenticatedUserInput = z.object({
  installation_id: z.number().int().describe("The unique identifier of the installation."),
  repository_id: z.number().int().describe("The unique identifier of the repository."),
})

export const appsAddRepoToInstallationForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Add a single repository to an installation. The authenticated user must have admin access to the repository.\n\nYou must use a personal access token (which you can create via the [command line](https://docs.github.com/github/authenticating-to-github/creating-a-personal-access-token) or [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication)) to access this endpoint.",
  input: AppsAddRepoToInstallationForAuthenticatedUserInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/user/installations/{installation_id}/repositories/{repository_id}", data)
  },
})
