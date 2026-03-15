import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PullRequestsListInput = z.object({
  workspace: z.string().describe('Workspace slug or UUID'),
  repoSlug: z.string().describe('Repository slug'),
  state: z.enum(['OPEN', 'MERGED', 'DECLINED', 'SUPERSEDED']).optional().describe('PR state'),
  page: z.number().optional().describe('Page number'),
  pagelen: z.number().optional().describe('Results per page'),
})

export const PullRequestsListOutput = z.object({
  size: z.number(),
  page: z.number(),
  pagelen: z.number(),
  values: z.array(z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().nullable(),
    state: z.string(),
    author: z.object({
      display_name: z.string(),
      uuid: z.string(),
    }),
    source: z.object({
      branch: z.object({
        name: z.string(),
      }),
    }),
    destination: z.object({
      branch: z.object({
        name: z.string(),
      }),
    }),
    created_on: z.string(),
    updated_on: z.string(),
  })),
  next: z.string().optional(),
})

type Output = z.infer<typeof PullRequestsListOutput>

export const pullRequestsList = pikkuSessionlessFunc({
  description: 'List pull requests in a repository',
  node: { displayName: 'List Pull Requests', category: 'PullRequests', type: 'action' },
  input: PullRequestsListInput,
  output: PullRequestsListOutput,
  func: async ({ bitbucket }, data) => {
  return await bitbucket.request('GET', `repositories/${data.workspace}/${data.repoSlug}/pullrequests`, {
    qs: {
      state: data.state,
      page: data.page,
      pagelen: data.pagelen,
    },
  }) as Output
  },
})
