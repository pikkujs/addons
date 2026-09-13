import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnleashFlagApi } from '../../flags/unleash-flag-api.service.js'

export const FeaturesListOutput = z.object({
  features: z.array(
    z.object({
      name: z.string(),
      enabled: z.boolean(),
      strategies: z
        .array(
          z.object({
            name: z.string(),
            parameters: z.record(z.string(), z.string().optional()).optional(),
          })
        )
        .optional(),
    })
  ),
})

type Output = z.infer<typeof FeaturesListOutput>

export const featuresList = pikkuSessionlessFunc({
  description: 'List feature toggles in Unleash',
  node: { displayName: 'List Features', category: 'devops', type: 'action' },
  output: FeaturesListOutput,
  func: async ({ unleash }) => {
    const features = await new UnleashFlagApi(unleash).listFeatures()
    return { features } as Output
  },
})
