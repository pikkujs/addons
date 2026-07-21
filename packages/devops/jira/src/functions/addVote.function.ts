// Issue votes — This resource represents votes cast by users on an issue. Use it to get details of votes on an issue as well as cast and withdrawal votes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AddVoteInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
})

export const AddVoteOutput = z.unknown()

export const addVote = pikkuSessionlessFunc({
  description: "Adds the user's vote to an issue. This is the equivalent of the user clicking *Vote* on an issue in Jira.\n\nThis operation requires the **Allow users to vote on issues** option to be *ON*. This option is set in General configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: AddVoteInput,
  output: AddVoteOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issue/{issueIdOrKey}/votes", data) as any
  },
})
