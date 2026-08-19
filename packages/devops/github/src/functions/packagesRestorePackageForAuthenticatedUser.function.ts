// packages — Manage packages for authenticated users and organizations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const PackagesRestorePackageForAuthenticatedUserInput = z.object({
  package_type: z.enum(["npm", "maven", "rubygems", "docker", "nuget", "container"]).describe("The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry."),
  package_name: z.string().describe("The name of the package."),
  token: z.string().optional().describe("package token"),
})

export const packagesRestorePackageForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Restores a package owned by the authenticated user.\n\nYou can restore a deleted package under the following conditions:\n  - The package was deleted within the last 30 days.\n  - The same package namespace and version is still available and not reused for a new package. If the same package namespace is not available, you will not be able to restore your package. In this scenario, to restore the deleted package, you must delete the new package that uses the deleted package's namespace first.\n\nTo use this endpoint, you must authenticate using an access token with the `read:packages` and `write:packages` scopes. If the `package_type` belongs to a GitHub Packages registry that only supports repository-scoped permissions, your token must also include the `repo` scope. For the list of GitHub Packages registries that only support repository-scoped permissions, see \"[About permissions for GitHub Packages](https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#permissions-for-repository-scoped-packages).\"",
  input: PackagesRestorePackageForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("POST", "/user/packages/{package_type}/{package_name}/restore", data)
  },
})
