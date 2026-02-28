import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RpcInput = z.object({
  functionName: z.string().describe('PostgreSQL function name'),
  params: z.record(z.string(), z.any()).optional().describe('Function parameters'),
})

export const RpcOutput = z.object({
  data: z.any().describe('Function result'),
})

type Output = z.infer<typeof RpcOutput>

export const rpc = pikkuSessionlessFunc({
  description: 'Calls a PostgreSQL function via Supabase RPC',
  node: { displayName: 'Call RPC Function', category: 'Database', type: 'action' },
  input: RpcInput,
  output: RpcOutput,
  func: async ({ supabase }, { functionName, params }) => {
    const { data, error } = await supabase.rpc(functionName, params)

    if (error) {
      throw new Error(`Supabase RPC error: ${error.message ?? error.details ?? error.code ?? JSON.stringify(error)}`)
    }

    return {
      data,
    }
  },
})
