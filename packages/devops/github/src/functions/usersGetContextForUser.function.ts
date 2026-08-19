// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersGetContextForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  subject_type: z.enum(["organization", "repository", "issue", "pull_request"]).optional().describe("Identifies which additional information you'd like to receive about the person's hovercard. Can be `organization`, `repository`, `issue`, `pull_request`. **Required** when using `subject_id`."),
  subject_id: z.string().optional().describe("Uses the ID for the `subject_type` you specified. **Required** when using `subject_type`."),
})

export const UsersGetContextForUserOutput = z.object({
  contexts: z.array(z.object({
    message: z.string(),
    octicon: z.string(),
  })),
}).describe("Hovercard")

export const usersGetContextForUser = pikkuSessionlessFunc({
  description: "Provides hovercard information when authenticated through basic auth or OAuth with the `repo` scope. You can find out more about someone in relation to their pull requests, issues, repositories, and organizations.\n\nThe `subject_type` and `subject_id` parameters provide context for the person's hovercard, which returns more information than without the parameters. For example, if you wanted to find out more about `octocat` who owns the `Spoon-Knife` repository via cURL, it would look like this:\n\n```shell\n curl -u username:token\n  https://api.github.com/users/octocat/hovercard?subject_type=repository&subject_id=1300192\n```",
  input: UsersGetContextForUserInput,
  output: UsersGetContextForUserOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/hovercard", data) as any
  },
})
