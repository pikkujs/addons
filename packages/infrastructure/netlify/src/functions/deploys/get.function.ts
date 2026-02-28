import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeploysGetInput = z.object({
  deploy_id: z.string().describe('Deploy ID'),
})

export const DeploysGetOutput = z.object({
  id: z.string().describe('Deploy ID'),
  state: z.string().describe('Deploy state'),
  name: z.string().describe('Deploy name'),
  url: z.string().describe('Deploy URL'),
  ssl_url: z.string().describe('SSL URL'),
  created_at: z.string().describe('Created date'),
  updated_at: z.string().describe('Updated date'),
  commit_ref: z.string().nullable().optional().describe('Commit reference'),
  branch: z.string().nullable().optional().describe('Branch name'),
  deploy_time: z.number().nullable().optional().describe('Deploy time in seconds'),
  error_message: z.string().nullable().optional().describe('Error message if failed'),
})

type Output = z.infer<typeof DeploysGetOutput>

export const deploysGet = pikkuSessionlessFunc({
  description: 'Get deploy details',
  node: { displayName: 'Get Deploy', category: 'Deploys', type: 'action' },
  input: DeploysGetInput,
  output: DeploysGetOutput,
  func: async ({ netlify }, data) => {
    return await netlify.request<Output>('GET', `/deploys/${data.deploy_id}`)
  },
})
