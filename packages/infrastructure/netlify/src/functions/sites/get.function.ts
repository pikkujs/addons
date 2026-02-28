import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SitesGetInput = z.object({
  site_id: z.string().describe('Site ID or name'),
})

export const SitesGetOutput = z.object({
  id: z.string().describe('Site ID'),
  name: z.string().describe('Site name'),
  url: z.string().describe('Site URL'),
  ssl_url: z.string().describe('SSL URL'),
  admin_url: z.string().describe('Admin URL'),
  created_at: z.string().describe('Created date'),
  updated_at: z.string().describe('Updated date'),
  build_settings: z.object({
    repo_url: z.string().optional().describe('Repository URL'),
    repo_branch: z.string().optional().describe('Repository branch'),
    cmd: z.string().optional().describe('Build command'),
    dir: z.string().optional().describe('Publish directory'),
  }).optional(),
})

type Output = z.infer<typeof SitesGetOutput>

export const sitesGet = pikkuSessionlessFunc({
  description: 'Get Netlify site details',
  node: { displayName: 'Get Site', category: 'Sites', type: 'action' },
  input: SitesGetInput,
  output: SitesGetOutput,
  func: async ({ netlify }, data) => {
    return await netlify.request<Output>('GET', `/sites/${data.site_id}`)
  },
})
