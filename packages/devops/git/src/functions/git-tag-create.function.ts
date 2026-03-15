import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitTagCreateInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  name: z.string().describe('Tag name'),
  message: z.string().optional().describe('Tag message (creates annotated tag)'),
  ref: z.string().optional().describe('Commit to tag (defaults to HEAD)'),
})

export const GitTagCreateOutput = z.object({
  tag: z.string().describe('Created tag name'),
})

export const gitTagCreate = pikkuSessionlessFunc({
  description: 'Create a new tag in a git repository',
  input: GitTagCreateInput,
  output: GitTagCreateOutput,
  node: { displayName: 'Git Tag Create', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, name, message, ref }) => {
    const git = simpleGit(directory)
    if (message) {
      await git.tag(['-a', name, '-m', message, ...(ref ? [ref] : [])])
    } else {
      await git.tag([name, ...(ref ? [ref] : [])])
    }
    return { tag: name }
  },
})
