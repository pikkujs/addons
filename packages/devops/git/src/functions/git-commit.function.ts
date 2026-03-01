import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitCommitInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  message: z.string().describe('Commit message'),
  files: z.array(z.string()).optional().describe('Specific files to commit (omit to commit all staged)'),
})

export const GitCommitOutput = z.object({
  hash: z.string().describe('Commit hash'),
  branch: z.string().describe('Branch the commit was made on'),
  summary: z.object({
    changes: z.number(),
    insertions: z.number(),
    deletions: z.number(),
  }).describe('Commit summary statistics'),
})

export const gitCommit = pikkuSessionlessFunc({
  description: 'Commit staged changes in a git repository',
  input: GitCommitInput,
  output: GitCommitOutput,
  node: { displayName: 'Git Commit', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, message, files }) => {
    const git = simpleGit(directory)
    const result = await git.commit(message, files)
    return {
      hash: result.commit,
      branch: result.branch,
      summary: {
        changes: result.summary.changes,
        insertions: result.summary.insertions,
        deletions: result.summary.deletions,
      },
    }
  },
})
