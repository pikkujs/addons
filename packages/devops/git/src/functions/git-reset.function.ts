import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitResetInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  mode: z.enum(['soft', 'mixed', 'hard']).optional().describe('Reset mode (defaults to "mixed")'),
  target: z.string().optional().describe('Commit, branch, or tag to reset to (defaults to HEAD)'),
  files: z.array(z.string()).optional().describe('Specific files to unstage (for mixed reset)'),
})

export const GitResetOutput = z.object({
  reset: z.boolean().describe('Whether the reset was successful'),
})

export const gitReset = pikkuSessionlessFunc({
  description: 'Reset current HEAD to a specified state',
  input: GitResetInput,
  output: GitResetOutput,
  node: { displayName: 'Git Reset', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, mode, target, files }) => {
    const git = simpleGit(directory)
    if (files && files.length > 0) {
      await git.reset(['--', ...files])
    } else {
      const args: string[] = []
      if (mode) args.push(`--${mode}`)
      if (target) args.push(target)
      await git.reset(args)
    }
    return { reset: true }
  },
})
