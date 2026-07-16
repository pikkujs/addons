// emoji — Endpoints for creating, getting and interacting with emojis.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const ListEmojiImageInput = z.object({
  emoji_id: z.string().describe("Emoji GUID"),
})

export const listEmojiImage = pikkuSessionlessFunc({
  description: "Get the image for a custom emoji.\n##### Permissions\nMust be authenticated.",
  input: ListEmojiImageInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/emoji/{emoji_id}/image", data)
  },
})
