import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitPullInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  remote: z.string().optional().describe('Remote name (defaults to "origin")'),
  branch: z.string().optional().describe('Branch to pull'),
  rebase: z.boolean().optional().describe('Rebase instead of merge'),
})

export const GitPullOutput = z.object({
  files: z.array(z.string()).describe('Files that were changed'),
  insertions: z.number().describe('Total lines inserted'),
  deletions: z.number().describe('Total lines deleted'),
  summary: z.object({
    changes: z.number(),
    insertions: z.number(),
    deletions: z.number(),
  }).describe('Pull summary statistics'),
})

export const gitPull = pikkuSessionlessFunc({
  description: 'Pull changes from a remote repository',
  input: GitPullInput,
  output: GitPullOutput,
  node: { displayName: 'Git Pull', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, remote, branch, rebase }) => {
    const git = simpleGit(directory)
    const options: Record<string, null> = {}
    if (rebase) options['--rebase'] = null
    const result = await git.pull(remote, branch, options)
    return {
      files: result.files,
      insertions: result.insertions,
      deletions: result.deletions,
      summary: {
        changes: result.summary.changes,
        insertions: result.summary.insertions,
        deletions: result.summary.deletions,
      },
    }
  },
})
