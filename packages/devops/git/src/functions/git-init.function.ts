import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitInitInput = z.object({
  directory: z.string().describe('Path where the repository should be initialized'),
  bare: z.boolean().optional().describe('Create a bare repository'),
})

export const GitInitOutput = z.object({
  directory: z.string().describe('Path to the initialized repository'),
})

export const gitInit = pikkuSessionlessFunc({
  description: 'Initialize a new git repository',
  input: GitInitInput,
  output: GitInitOutput,
  node: { displayName: 'Git Init', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, bare }) => {
    const git = simpleGit(directory)
    await git.init(bare ?? false)
    return { directory }
  },
})
