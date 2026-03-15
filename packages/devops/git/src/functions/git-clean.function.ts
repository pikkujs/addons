import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitCleanInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  force: z.boolean().optional().describe('Force clean (required by git unless configured otherwise)'),
  directories: z.boolean().optional().describe('Also remove untracked directories'),
  dryRun: z.boolean().optional().describe('Show what would be removed without actually removing'),
})

export const GitCleanOutput = z.object({
  paths: z.array(z.string()).describe('Paths that were (or would be) removed'),
})

export const gitClean = pikkuSessionlessFunc({
  description: 'Remove untracked files from the working tree',
  input: GitCleanInput,
  output: GitCleanOutput,
  node: { displayName: 'Git Clean', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, force, directories, dryRun }) => {
    const git = simpleGit(directory)
    let mode = ''
    if (dryRun) mode += 'n'
    if (force) mode += 'f'
    if (directories) mode += 'd'
    if (!mode) mode = 'n' // default to dry run for safety
    const result: any = await git.clean(mode as any)
    const paths = typeof result === 'string'
      ? result.split('\n').filter((line: string) => line.trim().length > 0)
      : result.paths ?? []
    return { paths }
  },
})
