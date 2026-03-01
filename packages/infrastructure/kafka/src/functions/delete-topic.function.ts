import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const KafkaDeleteTopicInput = z.object({
  topics: z.array(z.string()).describe('Topic names to delete'),
})

export const KafkaDeleteTopicOutput = z.object({
  success: z.boolean().describe('Whether the topics were deleted'),
})

export const kafkaDeleteTopic = pikkuSessionlessFunc({
  description: 'Delete Kafka topics',
  input: KafkaDeleteTopicInput,
  output: KafkaDeleteTopicOutput,
  node: { displayName: 'Kafka Delete Topic', category: 'Infrastructure', type: 'action' },
  func: async ({ kafkaAdmin }, { topics }) => {
    await kafkaAdmin.deleteTopics({ topics })
    return { success: true }
  },
})
