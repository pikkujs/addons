// Meta Conversions functions - Events
export { eventSend } from './functions/events/send.function.js'

// Meta as an analytics sink
export { MetaConversionsSink } from './analytics/meta-conversions.sink.js'
export type { MetaConversionsSinkOptions } from './analytics/meta-conversions.sink.js'
export { MetaConversionsMapper } from './analytics/meta-conversions-mapper.js'
export type { MetaConversionsMapperOptions } from './analytics/meta-conversions-mapper.js'
export { metaConversionsIdentity } from './analytics/meta-conversions-identity.js'
export type { MetaConversionsIdentityOptions } from './analytics/meta-conversions-identity.js'
export { createMetaConversions } from './create-meta-conversions.js'
export type {
  CreateMetaConversionsOptions,
  MetaConversionsAddon,
} from './create-meta-conversions.js'
