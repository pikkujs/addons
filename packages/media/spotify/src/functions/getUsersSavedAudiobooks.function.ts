import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetUsersSavedAudiobooksInput = z.object({
  limit: z.number().int().min(1).max(50).optional().default(20).describe("The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n"),
  offset: z.number().int().optional().default(0).describe("The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n"),
})

export const GetUsersSavedAudiobooksOutput = z.object({
  href: z.string().describe("A link to the Web API endpoint returning the full result of the request\n"),
  limit: z.number().int().describe("The maximum number of items in the response (as set in the query or by default).\n"),
  next: z.string().nullable().describe("URL to the next page of items. ( `null` if none)\n"),
  offset: z.number().int().describe("The offset of the items returned (as set in the query or by default)\n"),
  previous: z.string().nullable().describe("URL to the previous page of items. ( `null` if none)\n"),
  total: z.number().int().describe("The total number of items available to return.\n"),
  items: z.array(z.object({
    added_at: z.string().datetime().optional().describe("The date and time the audiobook was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n"),
    audiobook: z.unknown().optional().describe("Information about the audiobook."),
  })),
})

export const getUsersSavedAudiobooks = pikkuSessionlessFunc({
  description: "Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.",
  input: GetUsersSavedAudiobooksInput,
  output: GetUsersSavedAudiobooksOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/me/audiobooks", data) as any
  },
})
