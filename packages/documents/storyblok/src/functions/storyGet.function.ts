import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StoryGetInput = z.object({
  spaceId: z.string(),
  storyId: z.string(),
})

export const StoryGetOutput = z.object({
  story: z.record(z.string(), z.unknown()).optional(),
})

export const storyGet = pikkuSessionlessFunc({
  description: "Get a story",
  input: StoryGetInput,
  output: StoryGetOutput,
  func: async ({ storyblok }, data) => {
    return storyblok.call("GET", "/v1/spaces/{spaceId}/stories/{storyId}", data) as any
  },
})
