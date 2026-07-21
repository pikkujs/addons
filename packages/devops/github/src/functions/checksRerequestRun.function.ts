// checks — Rich interactions with checks run by your integrations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ChecksRerequestRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  check_run_id: z.number().int().describe("The unique identifier of the check run."),
})

export const ChecksRerequestRunOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const checksRerequestRun = pikkuSessionlessFunc({
  description: "Triggers GitHub to rerequest an existing check run, without pushing new code to a repository. This endpoint will trigger the [`check_run` webhook](https://docs.github.com/webhooks/event-payloads/#check_run) event with the action `rerequested`. When a check run is `rerequested`, its `status` is reset to `queued` and the `conclusion` is cleared.\n\nTo rerequest a check run, your GitHub App must have the `checks:read` permission on a private repository or pull access to a public repository.",
  input: ChecksRerequestRunInput,
  output: ChecksRerequestRunOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest", data) as any
  },
})
