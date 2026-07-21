// markdown — Render GitHub flavored markdown

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MarkdownRenderInput = z.object({
  context: z.string().optional().describe("The repository context to use when creating references in `gfm` mode.  For example, setting `context` to `octo-org/octo-repo` will change the text `#42` into an HTML link to issue 42 in the `octo-org/octo-repo` repository."),
  mode: z.enum(["markdown", "gfm"]).optional().default("markdown").describe("The rendering mode."),
  text: z.string().describe("The Markdown text to render in HTML."),
})

export const MarkdownRenderOutput = z.string()

export const markdownRender = pikkuSessionlessFunc({
  input: MarkdownRenderInput,
  output: MarkdownRenderOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/markdown", data) as any
  },
})
