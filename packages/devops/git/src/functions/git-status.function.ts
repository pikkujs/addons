import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitStatusInput = z.object({
  directory: z.string().describe('Path to the git repository'),
})

export const GitStatusOutput = z.object({
  current: z.string().nullable().describe('Current branch'),
  tracking: z.string().nullable().describe('Remote tracking branch'),
  ahead: z.number().describe('Commits ahead of tracking'),
  behind: z.number().describe('Commits behind tracking'),
  staged: z.array(z.string()).describe('Staged files'),
  modified: z.array(z.string()).describe('Modified files'),
  not_added: z.array(z.string()).describe('Untracked files'),
  isClean: z.boolean().describe('Whether the working directory is clean'),
})

export const gitStatus = pikkuSessionlessFunc({
  description: 'Get the status of a git repository',
  input: GitStatusInput,
  output: GitStatusOutput,
  node: { displayName: 'Git Status', category: 'Version Control', type: 'action' },
  func: async (_services, { directory }) => {
    const git = simpleGit(directory)
    const status = await git.status()
    return {
      current: status.current,
      tracking: status.tracking,
      ahead: status.ahead,
      behind: status.behind,
      staged: status.staged,
      modified: status.modified,
      not_added: status.not_added,
      isClean: status.isClean(),
    }
  },
})
