import { z } from 'zod'
import { generateText } from 'ai'
import { pikkuSessionlessFunc } from '#pikku'

const MessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']).describe('The role of the message author'),
  content: z.string().describe('The contents of the message'),
})

export const OllamaGenerateTextInput = z.object({
  model: z.string().describe('The Ollama model to use (e.g. "llama3.2", "phi3:mini")'),
  prompt: z.string().optional().describe('The prompt to generate text from'),
  messages: z.array(MessageSchema).optional().describe('A list of messages comprising the conversation so far'),
  system: z.string().optional().describe('System message to set the behavior of the model'),
  maxTokens: z.number().optional().describe('Maximum number of tokens to generate'),
  temperature: z.number().min(0).max(2).optional().describe('Sampling temperature between 0 and 2'),
  topP: z.number().optional().describe('Nucleus sampling parameter'),
  seed: z.number().optional().describe('Random seed for reproducible results'),
})

const UsageSchema = z.object({
  promptTokens: z.number().describe('Number of tokens in the prompt'),
  completionTokens: z.number().describe('Number of tokens in the completion'),
  totalTokens: z.number().describe('Total number of tokens used'),
})

export const OllamaGenerateTextOutput = z.object({
  text: z.string().describe('The generated text'),
  finishReason: z.string().describe('The reason the model stopped generating'),
  usage: UsageSchema.describe('Token usage statistics'),
})

type Input = z.infer<typeof OllamaGenerateTextInput>
type Output = z.infer<typeof OllamaGenerateTextOutput>

export const ollamaGenerateText = pikkuSessionlessFunc({
  description: 'Generate text using an Ollama model',
  node: { displayName: 'Generate Text', category: 'Text', type: 'action' },
  input: OllamaGenerateTextInput,
  output: OllamaGenerateTextOutput,
  func: async ({ ollama }, data) => {
    const result = await generateText({
      model: ollama(data.model),
      prompt: data.prompt,
      messages: data.messages,
      system: data.system,
      maxTokens: data.maxTokens,
      temperature: data.temperature,
      topP: data.topP,
      seed: data.seed,
    })
    return {
      text: result.text,
      finishReason: result.finishReason,
      usage: result.usage,
    } as Output
  },
})
