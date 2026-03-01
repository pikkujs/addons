import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitRevertInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  commit: z.string().describe('Commit hash to revert'),
  noCommit: z.boolean().optional().describe('Revert without auto-committing'),
})

export const GitRevertOutput = z.object({
  reverted: z.boolean().describe('Whether the revert was successful'),
})

export const gitRevert = pikkuSessionlessFunc({
  description: 'Revert a commit by creating a new commit that undoes the changes',
  input: GitRevertInput,
  output: GitRevertOutput,
  node: { displayName: 'Git Revert', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, commit, noCommit }) => {
    const git = simpleGit(directory)
    if (noCommit) {
      await git.revert(commit, ['--no-commit'])
    } else {
      await git.revert(commit)
    }
    return { reverted: true }
  },
})
