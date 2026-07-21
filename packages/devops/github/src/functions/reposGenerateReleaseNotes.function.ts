// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGenerateReleaseNotesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  configuration_file_path: z.string().optional().describe("Specifies a path to a file in the repository containing configuration settings used for generating the release notes. If unspecified, the configuration file located in the repository at '.github/release.yml' or '.github/release.yaml' will be used. If that is not present, the default configuration will be used."),
  previous_tag_name: z.string().optional().describe("The name of the previous tag to use as the starting point for the release notes. Use to manually specify the range for the set of changes considered as part this release."),
  tag_name: z.string().describe("The tag name for the release. This can be an existing tag or a new one."),
  target_commitish: z.string().optional().describe("Specifies the commitish value that will be the target for the release's tag. Required if the supplied tag_name does not reference an existing tag. Ignored if the tag_name already exists."),
})

export const ReposGenerateReleaseNotesOutput = z.object({
  body: z.string().describe("The generated body describing the contents of the release supporting markdown formatting"),
  name: z.string().describe("The generated name of the release"),
}).describe("Generated name and body describing a release")

export const reposGenerateReleaseNotes = pikkuSessionlessFunc({
  description: "Generate a name and body describing a [release](https://docs.github.com/rest/reference/repos#releases). The body content will be markdown formatted and contain information like the changes since last release and users who contributed. The generated release notes are not saved anywhere. They are intended to be generated and used when creating a new release.",
  input: ReposGenerateReleaseNotesInput,
  output: ReposGenerateReleaseNotesOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/releases/generate-notes", data) as any
  },
})
