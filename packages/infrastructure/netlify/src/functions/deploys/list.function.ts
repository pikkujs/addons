import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeploysListInput = z.object({
  site_id: z.string().describe('Site ID'),
  page: z.number().optional().describe('Page number'),
  per_page: z.number().optional().describe('Results per page'),
})

export const DeploysListOutput = z.array(z.object({
  id: z.string().describe('Deploy ID'),
  state: z.string().describe('Deploy state'),
  name: z.string().describe('Deploy name'),
  url: z.string().describe('Deploy URL'),
  ssl_url: z.string().describe('SSL URL'),
  created_at: z.string().describe('Created date'),
  updated_at: z.string().describe('Updated date'),
  commit_ref: z.string().nullable().optional().describe('Commit reference'),
  branch: z.string().nullable().optional().describe('Branch name'),
}))

type Output = z.infer<typeof DeploysListOutput>

export const deploysList = pikkuSessionlessFunc({
  description: 'List site deploys',
  node: { displayName: 'List Deploys', category: 'Deploys', type: 'action' },
  input: DeploysListInput,
  output: DeploysListOutput,
  func: async ({ netlify }, data) => {
    const { site_id, ...qs } = data
    return await netlify.request<Output>('GET', `/sites/${site_id}/deploys`, { qs })
  },
})
