import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitDiffInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  staged: z.boolean().optional().describe('Show staged changes instead of unstaged'),
})

export const GitDiffOutput = z.object({
  diff: z.string().describe('The diff output'),
  files: z.array(z.string()).describe('Changed file paths'),
  insertions: z.number().describe('Total lines inserted'),
  deletions: z.number().describe('Total lines deleted'),
})

export const gitDiff = pikkuSessionlessFunc({
  description: 'Get diff of changes in a git repository',
  input: GitDiffInput,
  output: GitDiffOutput,
  node: { displayName: 'Git Diff', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, staged }) => {
    const git = simpleGit(directory)
    const options = staged ? ['--staged'] : []
    const diff = await git.diff(options)
    const summary = await git.diffSummary(options)
    return {
      diff,
      files: summary.files.map((f) => f.file),
      insertions: summary.insertions,
      deletions: summary.deletions,
    }
  },
})
