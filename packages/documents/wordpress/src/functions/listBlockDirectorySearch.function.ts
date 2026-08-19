import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListBlockDirectorySearchInput = z.object({
  context: z.literal("view").optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(10).describe("Maximum number of items to be returned in result set."),
  term: z.unknown().describe("Limit result set to blocks matching the search term."),
})

export const ListBlockDirectorySearchOutput = z.array(z.object({
  name: z.string().optional().describe("The block name, in namespace/block-name format."),
  title: z.string().optional().describe("The block title, in human readable format."),
  description: z.string().optional().describe("A short description of the block, in human readable format."),
  id: z.string().optional().describe("The block slug."),
  rating: z.number().optional().describe("The star rating of the block."),
  rating_count: z.number().int().optional().describe("The number of ratings."),
  active_installs: z.number().int().optional().describe("The number sites that have activated this block."),
  author_block_rating: z.number().optional().describe("The average rating of blocks published by the same author."),
  author_block_count: z.number().int().optional().describe("The number of blocks published by the same author."),
  author: z.string().optional().describe("The WordPress.org username of the block author."),
  icon: z.string().url().optional().describe("The block icon."),
  last_updated: z.string().datetime().optional().describe("The date when the block was last updated."),
  humanized_updated: z.string().optional().describe("The date when the block was last updated, in human readable format."),
}))

export const listBlockDirectorySearch = pikkuSessionlessFunc({
  input: ListBlockDirectorySearchInput,
  output: ListBlockDirectorySearchOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/block-directory/search", data) as any
  },
})
