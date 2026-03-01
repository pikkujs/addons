import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const KafkaCreateTopicInput = z.object({
  topic: z.string().describe('Topic name to create'),
  numPartitions: z.number().optional().describe('Number of partitions (default: 1)'),
  replicationFactor: z.number().optional().describe('Replication factor (default: 1)'),
})

export const KafkaCreateTopicOutput = z.object({
  success: z.boolean().describe('Whether the topic was created'),
})

export const kafkaCreateTopic = pikkuSessionlessFunc({
  description: 'Create a Kafka topic',
  input: KafkaCreateTopicInput,
  output: KafkaCreateTopicOutput,
  node: { displayName: 'Kafka Create Topic', category: 'Infrastructure', type: 'action' },
  func: async ({ kafkaAdmin }, { topic, numPartitions, replicationFactor }) => {
    const created = await kafkaAdmin.createTopics({
      topics: [{
        topic,
        numPartitions: numPartitions ?? 1,
        replicationFactor: replicationFactor ?? 1,
      }],
    })
    return { success: created }
  },
})
