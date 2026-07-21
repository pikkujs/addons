// meta — Endpoints that give information about the API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const MetaGetAllVersionsOutput = z.array(z.string().date())

export const metaGetAllVersions = pikkuSessionlessFunc({
  description: "Get all supported GitHub API versions.",
  output: MetaGetAllVersionsOutput,
  errors: [NotFoundError],
  func: async ({ github }) => {
    return github.call("GET", "/versions") as any
  },
})
