import { z } from 'zod'

export const ActivationResultSchema = z.object({
  planet: z.string(),
  gate: z.number(),
  line: z.number(),
  exactLine: z.number(),
})

export const ActivationsSchema = z.record(z.string(), ActivationResultSchema)

export const CentersSchema = z.object({
  head: z.boolean(),
  ajna: z.boolean(),
  throat: z.boolean(),
  spleen: z.boolean(),
  solarPlexus: z.boolean(),
  gCenter: z.boolean(),
  sacral: z.boolean(),
  root: z.boolean(),
  ego: z.boolean(),
})

export const TransitCenterSchema = z.object({
  natal: z.boolean(),
  transit: z.boolean(),
})

export const TransitOutput = z.object({
  transitDateUtc: z.date().optional(),
  activations: z.object({
    personality: ActivationsSchema,
    design: ActivationsSchema,
    transit: ActivationsSchema.optional(),
  }),
  centers: z.record(z.string(), TransitCenterSchema),
  gates: z.record(z.string(), z.object({
    personality: z.string().optional(),
    design: z.string().optional(),
    transit: z.string().optional(),
  })),
  channels: z.object({
    natal: z.array(z.string()),
    transit: z.record(z.string(), z.array(z.string())),
  }),
})

export const BodygraphOutput = z.object({
  birthDate: z.string().optional(),
  birthTime: z.string().optional(),
  birthCountry: z.string().optional(),
  birthCity: z.string().optional(),
  timezone: z.string().optional(),
  birthDateUtc: z.date(),
  designDateUtc: z.date(),
  auraType: z.string().optional(),
  innerAuthority: z.string().optional(),
  definition: z.string().optional(),
  profile: z.string().optional(),
  incarnationCross: z.string().optional(),
  cognition: z.string().optional(),
  variables: z.string().optional(),
  sense: z.string().optional(),
  determination: z.string().optional(),
  environment: z.string().optional(),
  view: z.string().optional(),
  motivation: z.string().optional(),
  personalityNodesTone: z.any().optional(),
  designNodesTone: z.any().optional(),
  gates: z.array(z.number()),
  channels: z.array(z.array(z.number())),
  activations: z.object({
    personality: ActivationsSchema,
    design: ActivationsSchema,
  }),
  centers: CentersSchema,
  notSelfTheme: z.string(),
  transit: TransitOutput,
})
