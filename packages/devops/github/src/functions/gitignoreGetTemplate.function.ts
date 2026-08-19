// gitignore — View gitignore templates

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GitignoreGetTemplateInput = z.object({
  name: z.string(),
})

export const GitignoreGetTemplateOutput = z.object({
  name: z.string(),
  source: z.string(),
}).describe("Gitignore Template")

export const gitignoreGetTemplate = pikkuSessionlessFunc({
  description: "The API also allows fetching the source of a single template.\nUse the raw [media type](https://docs.github.com/rest/overview/media-types/) to get the raw contents.",
  input: GitignoreGetTemplateInput,
  output: GitignoreGetTemplateOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/gitignore/templates/{name}", data) as any
  },
})
