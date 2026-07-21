// OpenGraph — Endpoint for getting Open Graph metadata.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateOpengraphInput = z.object({
  url: z.string().describe("The URL to get Open Graph Metadata."),
})

export const CreateOpengraphOutput = z.object({
  type: z.string().optional(),
  url: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  determiner: z.string().optional(),
  site_name: z.string().optional(),
  locale: z.string().optional(),
  locales_alternate: z.array(z.string()).optional(),
  images: z.array(z.object({
    url: z.string().optional(),
    secure_url: z.string().optional(),
    type: z.string().optional(),
    width: z.number().int().optional(),
    height: z.number().int().optional(),
  })).optional(),
  videos: z.array(z.object({
    url: z.string().optional(),
    secure_url: z.string().optional(),
    type: z.string().optional(),
    width: z.number().int().optional(),
    height: z.number().int().optional(),
  })).optional(),
  audios: z.array(z.object({
    url: z.string().optional(),
    secure_url: z.string().optional(),
    type: z.string().optional(),
  })).optional(),
  article: z.object({
    published_time: z.string().optional(),
    modified_time: z.string().optional(),
    expiration_time: z.string().optional(),
    section: z.string().optional(),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      username: z.string().optional(),
      gender: z.string().optional(),
    })).optional(),
  }).optional().describe("Article object used in OpenGraph metadata of a webpage, if type is article"),
  book: z.object({
    isbn: z.string().optional(),
    release_date: z.string().optional(),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      username: z.string().optional(),
      gender: z.string().optional(),
    })).optional(),
  }).optional().describe("Book object used in OpenGraph metadata of a webpage, if type is book"),
  profile: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    username: z.string().optional(),
    gender: z.string().optional(),
  }).optional(),
}).describe("OpenGraph metadata of a webpage")

export const createOpengraph = pikkuSessionlessFunc({
  description: "Get Open Graph Metadata for a specif URL. Use the Open Graph protocol to get some generic metadata about a URL. Used for creating link previews.\n\n__Minimum server version__: 3.10\n\n##### Permissions\nNo permission required but must be logged in.",
  input: CreateOpengraphInput,
  output: CreateOpengraphOutput,
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/opengraph", data) as any
  },
})
