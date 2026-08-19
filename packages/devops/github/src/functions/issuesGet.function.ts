// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const IssuesGetInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
})

export const IssuesGetOutput = z.any()

export const issuesGet = pikkuSessionlessFunc({
  description: "The API returns a [`301 Moved Permanently` status](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-redirects-redirects) if the issue was\n[transferred](https://docs.github.com/articles/transferring-an-issue-to-another-repository/) to another repository. If\nthe issue was transferred to or deleted from a repository where the authenticated user lacks read access, the API\nreturns a `404 Not Found` status. If the issue was deleted from a repository where the authenticated user has read\naccess, the API returns a `410 Gone` status. To receive webhook events for transferred and deleted issues, subscribe\nto the [`issues`](https://docs.github.com/webhooks/event-payloads/#issues) webhook.\n\n**Note**: GitHub's REST API considers every pull request an issue, but not every issue is a pull request. For this\nreason, \"Issues\" endpoints may return both issues and pull requests in the response. You can identify pull requests by\nthe `pull_request` key. Be aware that the `id` of a pull request returned from \"Issues\" endpoints will be an _issue id_. To find out the pull\nrequest id, use the \"[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)\" endpoint.",
  input: IssuesGetInput,
  output: IssuesGetOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/issues/{issue_number}", data) as any
  },
})
