import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const KafkaListTopicsInput = z.object({})

export const KafkaListTopicsOutput = z.object({
  topics: z.array(z.string()).describe('List of topic names'),
  count: z.number().describe('Number of topics'),
})

export const kafkaListTopics = pikkuSessionlessFunc({
  description: 'List all Kafka topics',
  input: KafkaListTopicsInput,
  output: KafkaListTopicsOutput,
  node: { displayName: 'Kafka List Topics', category: 'Infrastructure', type: 'action' },
  func: async ({ kafkaAdmin }) => {
    const topics = await kafkaAdmin.listTopics()
    return { topics, count: topics.length }
  },
})
