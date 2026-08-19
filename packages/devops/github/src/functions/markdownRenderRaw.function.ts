// markdown — Render GitHub flavored markdown

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MarkdownRenderRawInput = z.object({
  body: z.string(),
})

export const MarkdownRenderRawOutput = z.string()

export const markdownRenderRaw = pikkuSessionlessFunc({
  description: "You must send Markdown as plain text (using a `Content-Type` header of `text/plain` or `text/x-markdown`) to this endpoint, rather than using JSON format. In raw mode, [GitHub Flavored Markdown](https://github.github.com/gfm/) is not supported and Markdown will be rendered in plain format like a README.md file. Markdown content must be 400 KB or less.",
  input: MarkdownRenderRawInput,
  output: MarkdownRenderRawOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/markdown/raw", data) as any
  },
})
