import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitPushInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  remote: z.string().optional().describe('Remote name (defaults to "origin")'),
  branch: z.string().optional().describe('Branch to push'),
  force: z.boolean().optional().describe('Force push'),
  setUpstream: z.boolean().optional().describe('Set upstream tracking'),
  tags: z.boolean().optional().describe('Push tags'),
})

export const GitPushOutput = z.object({
  pushed: z.boolean().describe('Whether the push was successful'),
})

export const gitPush = pikkuSessionlessFunc({
  description: 'Push commits to a remote repository',
  input: GitPushInput,
  output: GitPushOutput,
  node: { displayName: 'Git Push', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, remote, branch, force, setUpstream, tags }) => {
    const git = simpleGit(directory)
    const options: string[] = []
    if (force) options.push('--force')
    if (setUpstream) options.push('--set-upstream')
    if (tags) options.push('--tags')
    await git.push(remote ?? 'origin', branch, options)
    return { pushed: true }
  },
})
