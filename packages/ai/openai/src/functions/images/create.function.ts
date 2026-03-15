import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ImageCreateInput = z.object({
  prompt: z.string().describe('A text description of the desired image(s). The maximum length is 1000 characters for dall-e-2 and 4000 characters for dall-e-3.'),
  model: z.enum(['dall-e-2', 'dall-e-3']).optional().describe('The model to use for image generation.'),
  n: z.number().min(1).max(10).optional().describe('The number of images to generate. Must be between 1 and 10. For dall-e-3, only n=1 is supported.'),
  quality: z.enum(['standard', 'hd']).optional().describe('The quality of the image that will be generated. hd creates images with finer details and greater consistency across the image. This param is only supported for dall-e-3.'),
  response_format: z.enum(['url', 'b64_json']).optional().describe('The format in which the generated images are returned. Must be one of url or b64_json.'),
  size: z.enum(['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792']).optional().describe('The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024 for dall-e-2. Must be one of 1024x1024, 1792x1024, or 1024x1792 for dall-e-3 models.'),
  style: z.enum(['vivid', 'natural']).optional().describe('The style of the generated images. Must be one of vivid or natural. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images. This param is only supported for dall-e-3.'),
})

export const ImageDataSchema = z.object({
  url: z.string().optional().describe('The URL of the generated image, if response_format is url'),
  b64_json: z.string().optional().describe('The base64-encoded JSON of the generated image, if response_format is b64_json'),
  revised_prompt: z.string().optional().describe('The prompt that was used to generate the image, if there was any revision to the prompt'),
})

export const ImageCreateOutput = z.object({
  created: z.number().describe('The Unix timestamp (in seconds) when the image was created'),
  data: z.array(ImageDataSchema).describe('The list of generated images'),
})

type Input = z.infer<typeof ImageCreateInput>
type Output = z.infer<typeof ImageCreateOutput>

export const imageCreate = pikkuSessionlessFunc({
  description: 'Creates an image given a prompt using DALL-E',
  node: { displayName: 'Create Image', category: 'Images', type: 'action' },
  input: ImageCreateInput,
  output: ImageCreateOutput,
  func: async ({ openai }, data) => {
    return await openai.images.generate(data as Input) as unknown as Output
  },
})
