import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitRemoteListInput = z.object({
  directory: z.string().describe('Path to the git repository'),
})

export const GitRemoteListOutput = z.object({
  remotes: z.array(z.object({
    name: z.string().describe('Remote name'),
    refs: z.object({
      fetch: z.string().describe('Fetch URL'),
      push: z.string().describe('Push URL'),
    }),
  })).describe('List of remotes'),
})

export const gitRemoteList = pikkuSessionlessFunc({
  description: 'List remotes in a git repository',
  input: GitRemoteListInput,
  output: GitRemoteListOutput,
  node: { displayName: 'Git Remote List', category: 'Version Control', type: 'action' },
  func: async (_services, { directory }) => {
    const git = simpleGit(directory)
    const remotes = await git.getRemotes(true)
    return {
      remotes: remotes.map((r) => ({
        name: r.name,
        refs: {
          fetch: r.refs.fetch,
          push: r.refs.push,
        },
      })),
    }
  },
})

export const GitRemoteAddInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  name: z.string().describe('Remote name'),
  url: z.string().describe('Remote URL'),
})

export const GitRemoteAddOutput = z.object({
  name: z.string().describe('Name of the added remote'),
})

export const gitRemoteAdd = pikkuSessionlessFunc({
  description: 'Add a remote to a git repository',
  input: GitRemoteAddInput,
  output: GitRemoteAddOutput,
  node: { displayName: 'Git Remote Add', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, name, url }) => {
    const git = simpleGit(directory)
    await git.addRemote(name, url)
    return { name }
  },
})

export const GitRemoteRemoveInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  name: z.string().describe('Remote name to remove'),
})

export const GitRemoteRemoveOutput = z.object({
  removed: z.string().describe('Name of the removed remote'),
})

export const gitRemoteRemove = pikkuSessionlessFunc({
  description: 'Remove a remote from a git repository',
  input: GitRemoteRemoveInput,
  output: GitRemoteRemoveOutput,
  node: { displayName: 'Git Remote Remove', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, name }) => {
    const git = simpleGit(directory)
    await git.removeRemote(name)
    return { removed: name }
  },
})
