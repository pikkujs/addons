import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueAddLinkInput = z.object({
  issueId: z.string().optional(),
  link: z.string().optional(),
})

export const IssueAddLinkOutput = z.record(z.string(), z.unknown())

export const issueAddLink = pikkuSessionlessFunc({
  description: "Add a link to an issue",
  input: IssueAddLinkInput,
  output: IssueAddLinkOutput,
  func: async ({ linear }, data) => {
    return linear.call("POST", "/graphql/issue/addLink", data) as any
  },
})
