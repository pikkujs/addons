import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const StoryDeleteInput = z.object({
  spaceId: z.string(),
  storyId: z.string(),
})

export const StoryDeleteOutput = z.object({
  story: z.record(z.string(), z.unknown()).optional(),
})

export const storyDelete = pikkuSessionlessFunc({
  description: "Delete a story",
  input: StoryDeleteInput,
  output: StoryDeleteOutput,
  func: async ({ storyblok }, data) => {
    return storyblok.call("DELETE", "/v1/spaces/{spaceId}/stories/{storyId}", data) as any
  },
})
