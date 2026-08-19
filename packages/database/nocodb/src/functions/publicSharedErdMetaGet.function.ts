import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PublicSharedErdMetaGetInput = z.object({
  sharedErdUuid: z.string(),
})

export const publicSharedErdMetaGet = pikkuSessionlessFunc({
  input: PublicSharedErdMetaGetInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/public/shared-erd/{sharedErdUuid}/meta", data)
  },
})
