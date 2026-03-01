import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const HN_API = 'https://hacker-news.firebaseio.com/v0'

export const HnGetItemInput = z.object({
  id: z.number().describe('Item ID (story, comment, job, poll, or poll option)'),
})

export const HnGetItemOutput = z.object({
  id: z.number(),
  type: z.string().nullable(),
  by: z.string().nullable(),
  time: z.number().nullable(),
  title: z.string().nullable(),
  text: z.string().nullable(),
  url: z.string().nullable(),
  score: z.number().nullable(),
  descendants: z.number().nullable(),
  kids: z.array(z.number()),
})

export const hnGetItem = pikkuSessionlessFunc({
  description: 'Get a Hacker News item (story, comment, job, poll)',
  input: HnGetItemInput,
  output: HnGetItemOutput,
  node: { displayName: 'HN Get Item', category: 'Data', type: 'action' },
  func: async (_services, { id }) => {
    const res = await fetch(`${HN_API}/item/${id}.json`)
    const item = await res.json() as any
    return {
      id: item.id,
      type: item.type ?? null,
      by: item.by ?? null,
      time: item.time ?? null,
      title: item.title ?? null,
      text: item.text ?? null,
      url: item.url ?? null,
      score: item.score ?? null,
      descendants: item.descendants ?? null,
      kids: item.kids ?? [],
    }
  },
})

export const HnGetUserInput = z.object({
  username: z.string().describe('Hacker News username'),
})

export const HnGetUserOutput = z.object({
  id: z.string(),
  created: z.number(),
  karma: z.number(),
  about: z.string().nullable(),
  submitted: z.array(z.number()),
})

export const hnGetUser = pikkuSessionlessFunc({
  description: 'Get a Hacker News user profile',
  input: HnGetUserInput,
  output: HnGetUserOutput,
  node: { displayName: 'HN Get User', category: 'Data', type: 'action' },
  func: async (_services, { username }) => {
    const res = await fetch(`${HN_API}/user/${username}.json`)
    const user = await res.json() as any
    return {
      id: user.id,
      created: user.created,
      karma: user.karma,
      about: user.about ?? null,
      submitted: (user.submitted ?? []).slice(0, 100),
    }
  },
})

export const HnTopStoriesInput = z.object({
  limit: z.number().optional().describe('Number of stories to return (default 10, max 500)'),
  type: z.enum(['top', 'new', 'best', 'ask', 'show', 'job']).optional().describe('Story type (default: top)'),
})

export const HnTopStoriesOutput = z.object({
  ids: z.array(z.number()).describe('Story IDs'),
})

export const hnGetStories = pikkuSessionlessFunc({
  description: 'Get Hacker News story IDs (top, new, best, ask, show, job)',
  input: HnTopStoriesInput,
  output: HnTopStoriesOutput,
  node: { displayName: 'HN Get Stories', category: 'Data', type: 'action' },
  func: async (_services, { limit, type }) => {
    const storyType = type ?? 'top'
    const endpoint = `${storyType}stories`
    const res = await fetch(`${HN_API}/${endpoint}.json`)
    const ids = await res.json() as number[]
    return { ids: ids.slice(0, limit ?? 10) }
  },
})
