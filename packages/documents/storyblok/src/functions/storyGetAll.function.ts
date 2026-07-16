import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StoryGetAllInput = z.object({
  spaceId: z.string(),
  page: z.number().int().optional(),
  per_page: z.number().int().optional(),
  starts_with: z.string().optional(),
})

export const StoryGetAllOutput = z.object({
  stories: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const storyGetAll = pikkuSessionlessFunc({
  description: "Get many stories",
  input: StoryGetAllInput,
  output: StoryGetAllOutput,
  func: async ({ storyblok }, data) => {
    return storyblok.call("GET", "/v1/spaces/{spaceId}/stories", data) as any
  },
})
