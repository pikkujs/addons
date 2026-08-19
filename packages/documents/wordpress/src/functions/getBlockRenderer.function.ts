import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetBlockRendererInput = z.object({
  name: z.string().describe("Unique registered name for the block."),
  context: z.literal("edit").optional().describe("Scope under which the request is made; determines fields present in response."),
  attributes: z.string().optional().describe("Attributes for the block."),
  post_id: z.string().optional().describe("ID of the post context."),
})

export const GetBlockRendererOutput = z.object({
  rendered: z.string().optional().describe("The rendered block."),
})

export const getBlockRenderer = pikkuSessionlessFunc({
  input: GetBlockRendererInput,
  output: GetBlockRendererOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/block-renderer/{name}", data) as any
  },
})
