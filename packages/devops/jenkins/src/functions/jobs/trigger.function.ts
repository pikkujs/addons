import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const JobsTriggerInput = z.object({
  jobName: z.string().describe('Job name'),
  parameters: z.record(z.string(), z.string()).optional().describe('Build parameters'),
})

export const JobsTriggerOutput = z.object({
  success: z.boolean().describe('Whether the build was triggered'),
})

type Output = z.infer<typeof JobsTriggerOutput>

export const jobsTrigger = pikkuSessionlessFunc({
  description: 'Trigger a Jenkins job build',
  node: { displayName: 'Trigger Build', category: 'Jobs', type: 'action' },
  input: JobsTriggerInput,
  output: JobsTriggerOutput,
  func: async ({ jenkins }, data) => {
    const endpoint = data.parameters
      ? `/job/${encodeURIComponent(data.jobName)}/buildWithParameters`
      : `/job/${encodeURIComponent(data.jobName)}/build`

    await jenkins.request('POST', endpoint, { qs: data.parameters })
    return { success: true }
  },
})
