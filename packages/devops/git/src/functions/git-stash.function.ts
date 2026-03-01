import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import simpleGit from 'simple-git'

export const GitStashInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  action: z.enum(['push', 'pop', 'list', 'drop', 'clear']).describe('Stash action to perform'),
  message: z.string().optional().describe('Message for stash push'),
  index: z.number().optional().describe('Stash index for pop/drop (defaults to 0)'),
})

export const GitStashOutput = z.object({
  result: z.string().describe('Output from the stash operation'),
})

export const gitStash = pikkuSessionlessFunc({
  description: 'Manage stashed changes in a git repository',
  input: GitStashInput,
  output: GitStashOutput,
  node: { displayName: 'Git Stash', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, action, message, index }) => {
    const git = simpleGit(directory)
    let result: string
    switch (action) {
      case 'push':
        result = message ? await git.stash(['push', '-m', message]) : await git.stash(['push'])
        break
      case 'pop':
        result = await git.stash(['pop', `stash@{${index ?? 0}}`])
        break
      case 'list':
        result = await git.stash(['list'])
        break
      case 'drop':
        result = await git.stash(['drop', `stash@{${index ?? 0}}`])
        break
      case 'clear':
        result = await git.stash(['clear'])
        break
    }
    return { result }
  },
})
