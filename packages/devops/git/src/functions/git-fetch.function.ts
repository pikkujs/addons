import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitFetchInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  remote: z.string().optional().describe('Remote name (defaults to "origin")'),
  branch: z.string().optional().describe('Specific branch to fetch'),
  prune: z.boolean().optional().describe('Remove remote-tracking references that no longer exist'),
  tags: z.boolean().optional().describe('Fetch all tags'),
})

export const GitFetchOutput = z.object({
  fetched: z.boolean().describe('Whether the fetch was successful'),
})

export const gitFetch = pikkuSessionlessFunc({
  description: 'Fetch updates from a remote repository',
  input: GitFetchInput,
  output: GitFetchOutput,
  node: { displayName: 'Git Fetch', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, remote, branch, prune, tags }) => {
    const git = simpleGit(directory)
    const options: string[] = []
    if (prune) options.push('--prune')
    if (tags) options.push('--tags')
    await git.fetch(remote ?? 'origin', branch, options)
    return { fetched: true }
  },
})
