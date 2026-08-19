// dependency-graph — Endpoints to access Dependency Graph features.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DependencyGraphCreateRepositorySnapshotInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  detector: z.object({
  name: z.string().describe("The name of the detector used."),
  url: z.string().describe("The url of the detector used."),
  version: z.string().describe("The version of the detector used."),
}).describe("A description of the detector used."),
  job: z.object({
  correlator: z.string().describe("Correlator provides a key that is used to group snapshots submitted over time. Only the \"latest\" submitted snapshot for a given combination of `job.correlator` and `detector.name` will be considered when calculating a repository's current dependencies. Correlator should be as unique as it takes to distinguish all detection runs for a given \"wave\" of CI workflow you run. If you're using GitHub Actions, a good default value for this could be the environment variables GITHUB_WORKFLOW and GITHUB_JOB concatenated together. If you're using a build matrix, then you'll also need to add additional key(s) to distinguish between each submission inside a matrix variation."),
  html_url: z.string().optional().describe("The url for the job."),
  id: z.string().describe("The external ID of the job."),
}),
  manifests: z.record(z.string(), z.object({
  file: z.object({
    source_location: z.string().optional().describe("The path of the manifest file relative to the root of the Git repository."),
  }).optional(),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]).nullable()).optional().describe("User-defined metadata to store domain-specific information limited to 8 keys with scalar values."),
  name: z.string().describe("The name of the manifest."),
  resolved: z.record(z.string(), z.object({
    dependencies: z.array(z.string()).optional().describe("Array of package-url (PURLs) of direct child dependencies."),
    metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]).nullable()).optional().describe("User-defined metadata to store domain-specific information limited to 8 keys with scalar values."),
    package_url: z.string().regex(new RegExp("^pkg")).optional().describe("Package-url (PURL) of dependency. See https://github.com/package-url/purl-spec for more details."),
    relationship: z.enum(["direct", "indirect"]).optional().describe("A notation of whether a dependency is requested directly by this manifest or is a dependency of another dependency."),
    scope: z.enum(["runtime", "development"]).optional().describe("A notation of whether the dependency is required for the primary build artifact (runtime) or is only used for development. Future versions of this specification may allow for more granular scopes."),
  })).optional().describe("A collection of resolved package dependencies."),
})).optional().describe("A collection of package manifests, which are a collection of related dependencies declared in a file or representing a logical group of dependencies."),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]).nullable()).optional().describe("User-defined metadata to store domain-specific information limited to 8 keys with scalar values."),
  ref: z.string().regex(new RegExp("^refs/")).describe("The repository branch that triggered this snapshot."),
  scanned: z.string().datetime().describe("The time at which the snapshot was scanned."),
  sha: z.string().min(40).max(40).describe("The commit SHA associated with this dependency snapshot. Maximum length: 40 characters."),
  version: z.number().int().describe("The version of the repository snapshot submission."),
})

export const DependencyGraphCreateRepositorySnapshotOutput = z.object({
  created_at: z.string().describe("The time at which the snapshot was created."),
  id: z.number().int().describe("ID of the created snapshot."),
  message: z.string().describe("A message providing further details about the result, such as why the dependencies were not updated."),
  result: z.string().describe("Either \"SUCCESS\", \"ACCEPTED\", or \"INVALID\". \"SUCCESS\" indicates that the snapshot was successfully created and the repository's dependencies were updated. \"ACCEPTED\" indicates that the snapshot was successfully created, but the repository's dependencies were not updated. \"INVALID\" indicates that the snapshot was malformed."),
})

export const dependencyGraphCreateRepositorySnapshot = pikkuSessionlessFunc({
  description: "Create a new snapshot of a repository's dependencies. You must authenticate using an access token with the `repo` scope to use this endpoint for a repository that the requesting user has access to.",
  input: DependencyGraphCreateRepositorySnapshotInput,
  output: DependencyGraphCreateRepositorySnapshotOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/dependency-graph/snapshots", data) as any
  },
})
