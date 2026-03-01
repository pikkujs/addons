import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitMergeInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  branch: z.string().describe('Branch to merge into the current branch'),
  noFastForward: z.boolean().optional().describe('Create a merge commit even for fast-forward merges'),
  squash: z.boolean().optional().describe('Squash commits into a single commit'),
  message: z.string().optional().describe('Custom merge commit message'),
})

export const GitMergeOutput = z.object({
  merged: z.boolean().describe('Whether the merge was successful'),
  conflicts: z.array(z.string()).describe('List of conflicting files, if any'),
})

export const gitMerge = pikkuSessionlessFunc({
  description: 'Merge a branch into the current branch',
  input: GitMergeInput,
  output: GitMergeOutput,
  node: { displayName: 'Git Merge', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, branch, noFastForward, squash, message }) => {
    const git = simpleGit(directory)
    const options: string[] = [branch]
    if (noFastForward) options.push('--no-ff')
    if (squash) options.push('--squash')
    if (message) options.push('-m', message)
    const result = await git.merge(options)
    return {
      merged: !result.failed,
      conflicts: result.conflicts,
    }
  },
})
