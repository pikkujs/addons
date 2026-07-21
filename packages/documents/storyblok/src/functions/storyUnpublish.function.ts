import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StoryUnpublishInput = z.object({
  spaceId: z.string(),
  storyId: z.string(),
})

export const StoryUnpublishOutput = z.object({
  story: z.record(z.string(), z.unknown()).optional(),
})

export const storyUnpublish = pikkuSessionlessFunc({
  description: "Unpublish a story",
  input: StoryUnpublishInput,
  output: StoryUnpublishOutput,
  func: async ({ storyblok }, data) => {
    return storyblok.call("GET", "/v1/spaces/{spaceId}/stories/{storyId}/unpublish", data) as any
  },
})
