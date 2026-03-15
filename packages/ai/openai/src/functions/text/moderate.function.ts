import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TextModerateInput = z.object({
  input: z.union([z.string(), z.array(z.string())]).describe('The input text to classify'),
  model: z.enum(['text-moderation-latest', 'text-moderation-stable']).optional().describe('Two content moderations models are available: text-moderation-stable and text-moderation-latest.'),
})

export const CategoryScoresSchema = z.object({
  hate: z.number().describe('The score for the category hate'),
  'hate/threatening': z.number().describe('The score for the category hate/threatening'),
  harassment: z.number().describe('The score for the category harassment'),
  'harassment/threatening': z.number().describe('The score for the category harassment/threatening'),
  'self-harm': z.number().describe('The score for the category self-harm'),
  'self-harm/intent': z.number().describe('The score for the category self-harm/intent'),
  'self-harm/instructions': z.number().describe('The score for the category self-harm/instructions'),
  sexual: z.number().describe('The score for the category sexual'),
  'sexual/minors': z.number().describe('The score for the category sexual/minors'),
  violence: z.number().describe('The score for the category violence'),
  'violence/graphic': z.number().describe('The score for the category violence/graphic'),
})

export const CategoriesSchema = z.object({
  hate: z.boolean().describe('Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste'),
  'hate/threatening': z.boolean().describe('Hateful content that also includes violence or serious harm towards the targeted group'),
  harassment: z.boolean().describe('Content that expresses, incites, or promotes harassing language towards any target'),
  'harassment/threatening': z.boolean().describe('Harassment content that also includes violence or serious harm towards any target'),
  'self-harm': z.boolean().describe('Content that promotes, encourages, or depicts acts of self-harm'),
  'self-harm/intent': z.boolean().describe('Content where the speaker expresses that they are engaging or intend to engage in acts of self-harm'),
  'self-harm/instructions': z.boolean().describe('Content that encourages performing acts of self-harm or gives instructions on how to commit such acts'),
  sexual: z.boolean().describe('Content meant to arouse sexual excitement or promotes sexual services'),
  'sexual/minors': z.boolean().describe('Sexual content that includes an individual who is under 18 years old'),
  violence: z.boolean().describe('Content that depicts death, violence, or physical injury'),
  'violence/graphic': z.boolean().describe('Content that depicts death, violence, or physical injury in graphic detail'),
})

export const ModerationResultSchema = z.object({
  flagged: z.boolean().describe('Whether any of the categories are flagged'),
  categories: CategoriesSchema.describe('A list of the categories along with their boolean value'),
  category_scores: CategoryScoresSchema.describe('A list of the categories along with their scores'),
})

export const TextModerateOutput = z.object({
  id: z.string().describe('The unique identifier for the moderation request'),
  model: z.string().describe('The model used to generate the moderation results'),
  results: z.array(ModerationResultSchema).describe('A list of moderation objects'),
})

type Input = z.infer<typeof TextModerateInput>
type Output = z.infer<typeof TextModerateOutput>

export const textModerate = pikkuSessionlessFunc({
  description: "Classifies if text violates OpenAI's usage policies",
  node: { displayName: 'Moderate Text', category: 'Text', type: 'action' },
  input: TextModerateInput,
  output: TextModerateOutput,
  func: async ({ openai }, data) => {
    return await openai.moderations.create(data as Input) as unknown as Output
  },
})
