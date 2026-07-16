// dependency-graph — Endpoints to access Dependency Graph features.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DependencyGraphDiffRangeInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  basehead: z.string().describe("The base and head Git revisions to compare. The Git revisions will be resolved to commit SHAs. Named revisions will be resolved to their corresponding HEAD commits, and an appropriate merge base will be determined. This parameter expects the format `{base}...{head}`."),
  name: z.string().optional().describe("The full path, relative to the repository root, of the dependency manifest file."),
})

export const DependencyGraphDiffRangeOutput = z.array(z.object({
  change_type: z.enum(["added", "removed"]),
  ecosystem: z.string(),
  license: z.string().nullable(),
  manifest: z.string(),
  name: z.string(),
  package_url: z.string().nullable(),
  scope: z.enum(["unknown", "runtime", "development"]).describe("Where the dependency is utilized. `development` means that the dependency is only utilized in the development environment. `runtime` means that the dependency is utilized at runtime and in the development environment."),
  source_repository_url: z.string().nullable(),
  version: z.string(),
  vulnerabilities: z.array(z.object({
    advisory_ghsa_id: z.string(),
    advisory_summary: z.string(),
    advisory_url: z.string(),
    severity: z.string(),
  })),
})).describe("A diff of the dependencies between two commits.")

export const dependencyGraphDiffRange = pikkuSessionlessFunc({
  description: "Gets the diff of the dependency changes between two commits of a repository, based on the changes to the dependency manifests made in those commits.",
  input: DependencyGraphDiffRangeInput,
  output: DependencyGraphDiffRangeOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/dependency-graph/compare/{basehead}", data) as any
  },
})
