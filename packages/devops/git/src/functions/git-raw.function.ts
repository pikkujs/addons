import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitRawInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  args: z.array(z.string()).describe('Git command arguments (e.g. ["rev-parse", "--short", "HEAD"])'),
})

export const GitRawOutput = z.object({
  output: z.string().describe('Raw command output'),
})

export const gitRaw = pikkuSessionlessFunc({
  description: 'Execute a raw git command',
  input: GitRawInput,
  output: GitRawOutput,
  node: { displayName: 'Git Raw', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, args }) => {
    const git = simpleGit(directory)
    const output = await git.raw(args)
    return { output: output ?? '' }
  },
})
