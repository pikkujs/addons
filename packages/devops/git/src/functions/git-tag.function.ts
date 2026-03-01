import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitTagListInput = z.object({
  directory: z.string().describe('Path to the git repository'),
})

export const GitTagListOutput = z.object({
  tags: z.array(z.string()).describe('List of tags'),
  latest: z.string().nullable().describe('Latest tag'),
})

export const gitTagList = pikkuSessionlessFunc({
  description: 'List tags in a git repository',
  input: GitTagListInput,
  output: GitTagListOutput,
  node: { displayName: 'Git Tag List', category: 'Version Control', type: 'action' },
  func: async (_services, { directory }) => {
    const git = simpleGit(directory)
    const tags = await git.tags()
    return {
      tags: tags.all,
      latest: tags.latest,
    }
  },
})
