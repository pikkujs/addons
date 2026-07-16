// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssuesUpdateLabelInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  name: z.string(),
  color: z.string().optional().describe("The [hexadecimal color code](http://www.color-hex.com/) for the label, without the leading `#`."),
  description: z.string().optional().describe("A short description of the label. Must be 100 characters or fewer."),
  new_name: z.string().optional().describe("The new name of the label. Emoji can be added to label names, using either native emoji or colon-style markup. For example, typing `:strawberry:` will render the emoji ![:strawberry:](https://github.githubassets.com/images/icons/emoji/unicode/1f353.png \":strawberry:\"). For a full list of available emoji and codes, see \"[Emoji cheat sheet](https://github.com/ikatyang/emoji-cheat-sheet).\""),
})

export const IssuesUpdateLabelOutput = z.object({
  color: z.string().describe("6-character hex code, without the leading #, identifying the color"),
  default: z.boolean(),
  description: z.string().nullable(),
  id: z.number().int(),
  name: z.string().describe("The name of the label."),
  node_id: z.string(),
  url: z.string().url().describe("URL for the label"),
}).describe("Color-coded labels help you categorize and filter your issues (just like labels in Gmail).")

export const issuesUpdateLabel = pikkuSessionlessFunc({
  input: IssuesUpdateLabelInput,
  output: IssuesUpdateLabelOutput,
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/labels/{name}", data) as any
  },
})
