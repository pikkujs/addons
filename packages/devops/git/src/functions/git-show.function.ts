import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitShowInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  ref: z.string().optional().describe('Commit, tag, or object to show (defaults to HEAD)'),
  stat: z.boolean().optional().describe('Show diffstat instead of full diff'),
})

export const GitShowOutput = z.object({
  output: z.string().describe('The show output'),
})

export const gitShow = pikkuSessionlessFunc({
  description: 'Show details of a git object (commit, tag, etc.)',
  input: GitShowInput,
  output: GitShowOutput,
  node: { displayName: 'Git Show', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, ref, stat }) => {
    const git = simpleGit(directory)
    const options = [ref ?? 'HEAD']
    if (stat) options.push('--stat')
    const output = await git.show(options)
    return { output }
  },
})
