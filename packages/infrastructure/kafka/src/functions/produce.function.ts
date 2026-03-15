import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSchema = z.object({
  key: z.string().optional().describe('Message key'),
  value: z.string().describe('Message value'),
  headers: z.record(z.string(), z.string()).optional().describe('Message headers'),
})

export const KafkaProduceInput = z.object({
  topic: z.string().describe('Topic to send the message to'),
  messages: z.array(MessageSchema).describe('Messages to send'),
})

export const KafkaProduceOutput = z.object({
  topicPartitions: z.array(z.object({
    topic: z.string(),
    partition: z.number(),
    errorCode: z.number(),
    offset: z.string().optional(),
  })).describe('Partition metadata for sent messages'),
})

export const kafkaProduce = pikkuSessionlessFunc({
  description: 'Send messages to a Kafka topic',
  input: KafkaProduceInput,
  output: KafkaProduceOutput,
  node: { displayName: 'Kafka Produce', category: 'Infrastructure', type: 'action' },
  func: async ({ kafkaProducer }, { topic, messages }) => {
    const result = await kafkaProducer.send({
      topic,
      messages: messages.map((m) => ({
        key: m.key ?? null,
        value: m.value,
        headers: m.headers,
      })),
    })

    return {
      topicPartitions: result.map((r) => ({
        topic: r.topicName,
        partition: r.partition,
        errorCode: r.errorCode,
        offset: r.baseOffset,
      })),
    }
  },
})
