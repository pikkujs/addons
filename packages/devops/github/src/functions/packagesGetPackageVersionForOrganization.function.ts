// packages — Manage packages for authenticated users and organizations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PackagesGetPackageVersionForOrganizationInput = z.object({
  package_type: z.enum(["npm", "maven", "rubygems", "docker", "nuget", "container"]).describe("The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry."),
  package_name: z.string().describe("The name of the package."),
  org: z.string().describe("The organization name. The name is not case sensitive."),
  package_version_id: z.number().int().describe("Unique identifier of the package version."),
})

export const PackagesGetPackageVersionForOrganizationOutput = z.object({
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
}).describe("A version of a software package")

export const packagesGetPackageVersionForOrganization = pikkuSessionlessFunc({
  description: "Gets a specific package version in an organization.\n\nYou must authenticate using an access token with the `read:packages` scope. If the `package_type` belongs to a GitHub Packages registry that only supports repository-scoped permissions, your token must also include the `repo` scope. For the list of GitHub Packages registries that only support repository-scoped permissions, see \"[About permissions for GitHub Packages](https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#permissions-for-repository-scoped-packages).\"",
  input: PackagesGetPackageVersionForOrganizationInput,
  output: PackagesGetPackageVersionForOrganizationOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}", data) as any
  },
})
