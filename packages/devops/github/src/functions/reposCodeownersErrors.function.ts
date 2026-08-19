// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposCodeownersErrorsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string().optional().describe("A branch, tag or commit name used to determine which version of the CODEOWNERS file to use. Default: the repository's default branch (e.g. `main`)"),
})

export const ReposCodeownersErrorsOutput = z.object({
  errors: z.array(z.object({
    column: z.number().int().describe("The column number where this errors occurs."),
    kind: z.string().describe("The type of error."),
    line: z.number().int().describe("The line number where this errors occurs."),
    message: z.string().describe("A human-readable description of the error, combining information from multiple fields, laid out for display in a monospaced typeface (for example, a command-line setting)."),
    path: z.string().describe("The path of the file where the error occured."),
    source: z.string().optional().describe("The contents of the line where the error occurs."),
    suggestion: z.string().nullable().optional().describe("Suggested action to fix the error. This will usually be `null`, but is provided for some common errors."),
  })),
}).describe("A list of errors found in a repo's CODEOWNERS file")

export const reposCodeownersErrors = pikkuSessionlessFunc({
  description: "List any syntax errors that are detected in the CODEOWNERS\nfile.\n\nFor more information about the correct CODEOWNERS syntax,\nsee \"[About code owners](https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).\"",
  input: ReposCodeownersErrorsInput,
  output: ReposCodeownersErrorsOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/codeowners/errors", data) as any
  },
})
