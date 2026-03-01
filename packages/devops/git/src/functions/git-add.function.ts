import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitAddInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  files: z.array(z.string()).describe('Files to stage (use ["."] for all files)'),
})

export const GitAddOutput = z.object({
  staged: z.array(z.string()).describe('Files that were staged'),
})

export const gitAdd = pikkuSessionlessFunc({
  description: 'Stage files for commit in a git repository',
  input: GitAddInput,
  output: GitAddOutput,
  node: { displayName: 'Git Add', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, files }) => {
    const git = simpleGit(directory)
    await git.add(files)
    return { staged: files }
  },
})
