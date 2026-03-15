import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitLogInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  maxCount: z.number().optional().describe('Maximum number of commits to return'),
})

export const GitLogOutput = z.object({
  commits: z.array(z.object({
    hash: z.string(),
    date: z.string(),
    message: z.string(),
    author_name: z.string(),
    author_email: z.string(),
  })).describe('List of commits'),
  total: z.number().describe('Total commits returned'),
})

export const gitLog = pikkuSessionlessFunc({
  description: 'Get commit log from a git repository',
  input: GitLogInput,
  output: GitLogOutput,
  node: { displayName: 'Git Log', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, maxCount }) => {
    const git = simpleGit(directory)
    const log = await git.log({ maxCount: maxCount ?? 10 })
    return {
      commits: log.all.map((c) => ({
        hash: c.hash,
        date: c.date,
        message: c.message,
        author_name: c.author_name,
        author_email: c.author_email,
      })),
      total: log.total,
    }
  },
})
