// gitignore — View gitignore templates

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GitignoreGetAllTemplatesOutput = z.array(z.string())

export const gitignoreGetAllTemplates = pikkuSessionlessFunc({
  description: "List all templates available to pass as an option when [creating a repository](https://docs.github.com/rest/reference/repos#create-a-repository-for-the-authenticated-user).",
  output: GitignoreGetAllTemplatesOutput,
  func: async ({ github }) => {
    return github.call("GET", "/gitignore/templates") as any
  },
})
