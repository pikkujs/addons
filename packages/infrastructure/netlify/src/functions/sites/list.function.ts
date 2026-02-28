import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SitesListInput = z.object({
  page: z.number().optional().describe('Page number'),
  per_page: z.number().optional().describe('Results per page'),
})

export const SitesListOutput = z.array(z.object({
  id: z.string().describe('Site ID'),
  name: z.string().describe('Site name'),
  url: z.string().describe('Site URL'),
  ssl_url: z.string().describe('SSL URL'),
  admin_url: z.string().describe('Admin URL'),
  created_at: z.string().describe('Created date'),
  updated_at: z.string().describe('Updated date'),
  published_deploy: z.object({
    id: z.string().describe('Deploy ID'),
    state: z.string().describe('Deploy state'),
  }).nullable().optional(),
}))

type Output = z.infer<typeof SitesListOutput>

export const sitesList = pikkuSessionlessFunc({
  description: 'List Netlify sites',
  node: { displayName: 'List Sites', category: 'Sites', type: 'action' },
  input: SitesListInput,
  output: SitesListOutput,
  func: async ({ netlify }, data) => {
    return await netlify.request<Output>('GET', '/sites', { qs: data })
  },
})
