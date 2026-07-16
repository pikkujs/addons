// checks — Rich interactions with checks run by your integrations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecksRerequestSuiteInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  check_suite_id: z.number().int().describe("The unique identifier of the check suite."),
})

export const ChecksRerequestSuiteOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const checksRerequestSuite = pikkuSessionlessFunc({
  description: "Triggers GitHub to rerequest an existing check suite, without pushing new code to a repository. This endpoint will trigger the [`check_suite` webhook](https://docs.github.com/webhooks/event-payloads/#check_suite) event with the action `rerequested`. When a check suite is `rerequested`, its `status` is reset to `queued` and the `conclusion` is cleared.\n\nTo rerequest a check suite, your GitHub App must have the `checks:read` permission on a private repository or pull access to a public repository.",
  input: ChecksRerequestSuiteInput,
  output: ChecksRerequestSuiteOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest", data) as any
  },
})
