import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { simpleGit } from 'simple-git'

export const GitCheckoutInput = z.object({
  directory: z.string().describe('Path to the git repository'),
  target: z.string().describe('Branch, tag, or commit to checkout'),
  create: z.boolean().optional().describe('Create a new branch (-b flag)'),
})

export const GitCheckoutOutput = z.object({
  target: z.string().describe('The checked out branch/commit'),
})

export const gitCheckout = pikkuSessionlessFunc({
  description: 'Checkout a branch, tag, or commit',
  input: GitCheckoutInput,
  output: GitCheckoutOutput,
  node: { displayName: 'Git Checkout', category: 'Version Control', type: 'action' },
  func: async (_services, { directory, target, create }) => {
    const git = simpleGit(directory)
    if (create) {
      await git.checkoutLocalBranch(target)
    } else {
      await git.checkout(target)
    }
    return { target }
  },
})
