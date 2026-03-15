import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitBranchListInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  all: z.boolean().optional().describe('Include remote branches'),
})

export const GitBranchListOutput = z.object({
  current: z.string().describe('Current branch name'),
  branches: z.array(z.object({
    name: z.string(),
    commit: z.string(),
    label: z.string(),
    current: z.boolean(),
  })).describe('List of branches'),
})

export const gitBranchList = pikkuSessionlessFunc({
  description: 'List branches in a git repository',
  input: GitBranchListInput,
  output: GitBranchListOutput,
  node: { displayName: 'Git Branch List', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, all }) => {
    const git = simpleGit(directory)
    const result = all ? await git.branch(['-a']) : await git.branchLocal()
    return {
      current: result.current,
      branches: Object.values(result.branches).map((b) => ({
        name: b.name,
        commit: b.commit,
        label: b.label,
        current: b.current,
      })),
    }
  },
})

export const GitBranchCreateInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  name: z.string().describe('Name for the new branch'),
  startPoint: z.string().optional().describe('Starting point for the branch (commit, tag, or branch)'),
})

export const GitBranchCreateOutput = z.object({
  branch: z.string().describe('Name of the created branch'),
})

export const gitBranchCreate = pikkuSessionlessFunc({
  description: 'Create a new branch in a git repository',
  input: GitBranchCreateInput,
  output: GitBranchCreateOutput,
  node: { displayName: 'Git Branch Create', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, name, startPoint }) => {
    const git = simpleGit(directory)
    if (startPoint) {
      await git.checkoutBranch(name, startPoint)
    } else {
      await git.checkoutLocalBranch(name)
    }
    return { branch: name }
  },
})

export const GitBranchDeleteInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  name: z.string().describe('Branch name to delete'),
  force: z.boolean().optional().describe('Force delete even if not fully merged'),
})

export const GitBranchDeleteOutput = z.object({
  deleted: z.string().describe('Name of the deleted branch'),
})

export const gitBranchDelete = pikkuSessionlessFunc({
  description: 'Delete a branch from a git repository',
  input: GitBranchDeleteInput,
  output: GitBranchDeleteOutput,
  node: { displayName: 'Git Branch Delete', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, name, force }) => {
    const git = simpleGit(directory)
    await git.deleteLocalBranch(name, force)
    return { deleted: name }
  },
})
