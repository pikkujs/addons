import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { Kafka, Producer, Admin } from 'kafkajs'

export interface Config extends CoreConfig {}
export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  kafka: Kafka
  kafkaProducer: Producer
  kafkaAdmin: Admin
}

export interface Services extends CoreServices<SingletonServices> {}
