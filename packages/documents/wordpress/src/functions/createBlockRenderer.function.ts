import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateBlockRendererInput = z.object({
  name: z.string().describe("Unique registered name for the block."),
  attributes: z.record(z.string(), z.unknown()).optional().describe("Attributes for the block."),
  post_id: z.number().int().optional().describe("ID of the post context."),
})

export const CreateBlockRendererOutput = z.object({
  rendered: z.string().optional().describe("The rendered block."),
})

export const createBlockRenderer = pikkuSessionlessFunc({
  input: CreateBlockRendererInput,
  output: CreateBlockRendererOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/block-renderer/{name}", data) as any
  },
})
