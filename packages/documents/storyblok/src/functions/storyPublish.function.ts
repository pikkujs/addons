import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StoryPublishInput = z.object({
  spaceId: z.string(),
  storyId: z.string(),
  release_id: z.string().optional(),
  lang: z.string().optional(),
})

export const StoryPublishOutput = z.object({
  story: z.record(z.string(), z.unknown()).optional(),
})

export const storyPublish = pikkuSessionlessFunc({
  description: "Publish a story",
  input: StoryPublishInput,
  output: StoryPublishOutput,
  func: async ({ storyblok }, data) => {
    return storyblok.call("GET", "/v1/spaces/{spaceId}/stories/{storyId}/publish", data) as any
  },
})
