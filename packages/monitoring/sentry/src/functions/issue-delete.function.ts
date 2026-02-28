import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const IssueDeleteInput = z.object({
  issueId: z.string().describe('The ID of the issue to delete'),
})

const IssueDeleteOutput = z.object({
  success: z.boolean().describe('Whether the deletion was successful'),
})

type Output = z.infer<typeof IssueDeleteOutput>

export const sentryIssueDelete = pikkuSessionlessFunc({
  description: 'Delete a Sentry issue',
  node: { displayName: 'Delete Issue', category: 'Issues', type: 'action' },
  input: IssueDeleteInput,
  output: IssueDeleteOutput,
  func: async ({ sentry }, data) => {
    await sentry.request('DELETE', `/api/0/issues/${data.issueId}/`)
    return { success: true }
  },
})
