import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileGetInput = z.object({
  file_id: z.string().describe('File identifier to get information about'),
})

export const FileGetOutput = z.object({
  file_id: z.string().describe('Identifier for this file, which can be used to download or reuse the file'),
  file_unique_id: z.string().describe("Unique identifier for this file, which is supposed to be the same over time and for different bots"),
  file_size: z.number().optional().describe('File size in bytes'),
  file_path: z.string().optional().describe('File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file'),
})

type Input = z.infer<typeof FileGetInput>
type Output = z.infer<typeof FileGetOutput>

export const fileGet = pikkuSessionlessFunc({
  description: 'Get basic information about a file and prepare it for downloading',
  node: { displayName: 'Get File', category: 'File', type: 'action' },
  input: FileGetInput,
  output: FileGetOutput,
  func: async ({ telegram }, data) => {
    return await telegram.request<Output>('getFile', { body: data as Input })
  },
})
