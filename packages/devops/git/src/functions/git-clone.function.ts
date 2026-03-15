import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitCloneInput = z.object({
  repoUrl: z.string().describe('Repository URL to clone'),
  directory: z.string().describe('Local directory to clone into'),
  branch: z.string().optional().describe('Branch to clone'),
  depth: z.number().optional().describe('Shallow clone depth'),
})

export const GitCloneOutput = z.object({
  directory: z.string().describe('Directory where the repo was cloned'),
})

export const gitClone = pikkuSessionlessFunc({
  description: 'Clone a git repository',
  input: GitCloneInput,
  output: GitCloneOutput,
  node: { displayName: 'Git Clone', category: 'Version Control', type: 'action' },
  func: async (_services, { repoUrl, directory, branch, depth }) => {
    const git = simpleGit()
    const options: string[] = []
    if (branch) options.push('--branch', branch)
    if (depth) options.push('--depth', String(depth))
    await git.clone(repoUrl, directory, options)
    return { directory }
  },
})
