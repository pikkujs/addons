// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsCreateRepoVariableInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  name: z.string().describe("The name of the variable."),
  value: z.string().describe("The value of the variable."),
})

export const ActionsCreateRepoVariableOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const actionsCreateRepoVariable = pikkuSessionlessFunc({
  description: "Creates a repository variable that you can reference in a GitHub Actions workflow.\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\nGitHub Apps must have the `actions_variables:write` repository permission to use this endpoint.",
  input: ActionsCreateRepoVariableInput,
  output: ActionsCreateRepoVariableOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/actions/variables", data) as any
  },
})
