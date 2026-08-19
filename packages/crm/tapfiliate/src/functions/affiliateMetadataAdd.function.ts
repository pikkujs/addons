import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AffiliateMetadataAddInput = z.object({
  affiliateId: z.string(),
  key: z.string(),
  value: z.string().optional(),
})

export const AffiliateMetadataAddOutput = z.record(z.string(), z.unknown())

export const affiliateMetadataAdd = pikkuSessionlessFunc({
  description: "Add affiliate metadata",
  input: AffiliateMetadataAddInput,
  output: AffiliateMetadataAddOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("PUT", "/affiliates/{affiliateId}/meta-data/{key}/", data) as any
  },
})
