import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IndexCreateInput = z.object({
  indexId: z.string(),
})

export const IndexCreateOutput = z.record(z.string(), z.unknown())

export const indexCreate = pikkuSessionlessFunc({
  description: "Create an index",
  input: IndexCreateInput,
  output: IndexCreateOutput,
  func: async ({ elasticsearch }, data) => {
    return elasticsearch.call("PUT", "/{indexId}", data) as any
  },
})
