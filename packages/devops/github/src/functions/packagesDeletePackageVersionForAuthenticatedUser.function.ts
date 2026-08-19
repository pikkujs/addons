// packages — Manage packages for authenticated users and organizations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const PackagesDeletePackageVersionForAuthenticatedUserInput = z.object({
  package_type: z.enum(["npm", "maven", "rubygems", "docker", "nuget", "container"]).describe("The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry."),
  package_name: z.string().describe("The name of the package."),
  package_version_id: z.number().int().describe("Unique identifier of the package version."),
})

export const packagesDeletePackageVersionForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Deletes a specific package version for a package owned by the authenticated user.  If the package is public and the package version has more than 5,000 downloads, you cannot delete the package version. In this scenario, contact GitHub support for further assistance.\n\nTo use this endpoint, you must have admin permissions in the organization and authenticate using an access token with the `read:packages` and `delete:packages` scopes.\nIf the `package_type` belongs to a GitHub Packages registry that only supports repository-scoped permissions, your token must also include the `repo` scope. For the list of GitHub Packages registries that only support repository-scoped permissions, see \"[About permissions for GitHub Packages](https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#permissions-for-repository-scoped-packages).\"",
  input: PackagesDeletePackageVersionForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/packages/{package_type}/{package_name}/versions/{package_version_id}", data)
  },
})
