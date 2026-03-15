import { z } from 'zod'
import { generateObject } from 'ai'
import { jsonSchema } from 'ai'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']).describe('The role of the message author'),
  content: z.string().describe('The contents of the message'),
})

export const OllamaGenerateObjectInput = z.object({
  model: z.string().describe('The Ollama model to use (e.g. "llama3.2", "phi3:mini")'),
  prompt: z.string().optional().describe('The prompt to generate a structured object from'),
  messages: z.array(MessageSchema).optional().describe('A list of messages comprising the conversation so far'),
  system: z.string().optional().describe('System message to set the behavior of the model'),
  schema: z.record(z.string(), z.any()).describe('JSON Schema describing the expected output object'),
  schemaName: z.string().optional().describe('Optional name for the schema'),
  schemaDescription: z.string().optional().describe('Optional description of what the schema represents'),
  mode: z.enum(['auto', 'tool', 'json']).optional().describe('Mode for object generation. Use "json" for models that do not support tools.'),
  maxTokens: z.number().optional().describe('Maximum number of tokens to generate'),
  temperature: z.number().min(0).max(2).optional().describe('Sampling temperature between 0 and 2'),
})

export const UsageSchema = z.object({
  promptTokens: z.number().describe('Number of tokens in the prompt'),
  completionTokens: z.number().describe('Number of tokens in the completion'),
  totalTokens: z.number().describe('Total number of tokens used'),
})

export const OllamaGenerateObjectOutput = z.object({
  object: z.any().describe('The generated structured object'),
  finishReason: z.string().describe('The reason the model stopped generating'),
  usage: UsageSchema.describe('Token usage statistics'),
})

type Output = z.infer<typeof OllamaGenerateObjectOutput>

export const ollamaGenerateObject = pikkuSessionlessFunc({
  description: 'Generate a structured JSON object using an Ollama model',
  node: { displayName: 'Generate Object', category: 'Text', type: 'action' },
  input: OllamaGenerateObjectInput,
  output: OllamaGenerateObjectOutput,
  func: async ({ ollama }, data) => {
    const result = await generateObject({
      model: ollama(data.model),
      prompt: data.prompt,
      messages: data.messages,
      system: data.system,
      schema: jsonSchema(data.schema),
      schemaName: data.schemaName,
      schemaDescription: data.schemaDescription,
      mode: data.mode,
      maxTokens: data.maxTokens,
      temperature: data.temperature,
    })
    return {
      object: result.object,
      finishReason: result.finishReason,
      usage: result.usage,
    } as Output
  },
})
