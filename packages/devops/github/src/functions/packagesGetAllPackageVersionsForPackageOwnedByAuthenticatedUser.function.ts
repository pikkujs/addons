// packages — Manage packages for authenticated users and organizations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserInput = z.object({
  package_type: z.enum(["npm", "maven", "rubygems", "docker", "nuget", "container"]).describe("The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry."),
  package_name: z.string().describe("The name of the package."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  state: z.enum(["active", "deleted"]).optional().default("active").describe("The state of the package, either active or deleted."),
})

export const PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserOutput = z.array(z.object({
  created_at: z.string().datetime(),
  deleted_at: z.string().datetime().optional(),
  description: z.string().optional(),
  html_url: z.string().optional(),
  id: z.number().int().describe("Unique identifier of the package version."),
  license: z.string().optional(),
  metadata: z.object({
    container: z.object({
      tags: z.array(z.string()),
    }).optional(),
    docker: z.object({
      tag: z.array(z.string()).optional(),
    }).optional(),
    package_type: z.enum(["npm", "maven", "rubygems", "docker", "nuget", "container"]),
  }).optional(),
  name: z.string().describe("The name of the package version."),
  package_html_url: z.string(),
  updated_at: z.string().datetime(),
  url: z.string(),
}))

export const packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists package versions for a package owned by the authenticated user.\n\nTo use this endpoint, you must authenticate using an access token with the `read:packages` scope. If the `package_type` belongs to a GitHub Packages registry that only supports repository-scoped permissions, your token must also include the `repo` scope. For the list of GitHub Packages registries that only support repository-scoped permissions, see \"[About permissions for GitHub Packages](https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#permissions-for-repository-scoped-packages).\"",
  input: PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserInput,
  output: PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/packages/{package_type}/{package_name}/versions", data) as any
  },
})
