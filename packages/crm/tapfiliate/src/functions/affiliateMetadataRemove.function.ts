import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AffiliateMetadataRemoveInput = z.object({
  affiliateId: z.string(),
  key: z.string(),
})

export const AffiliateMetadataRemoveOutput = z.record(z.string(), z.unknown())

export const affiliateMetadataRemove = pikkuSessionlessFunc({
  description: "Remove affiliate metadata",
  input: AffiliateMetadataRemoveInput,
  output: AffiliateMetadataRemoveOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("DELETE", "/affiliates/{affiliateId}/meta-data/{key}/", data) as any
  },
})
