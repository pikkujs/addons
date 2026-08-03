import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const mqttBaseUrlSchema = z.enum(["https://mqtt.local"]).default("https://mqtt.local")

defineVariable({
  name: 'MQTT_BASE_URL',
  displayName: 'MQTT Base URL',
  description: 'The base URL for the MQTT API.',
  variableId: 'MQTT_BASE_URL',
  schema: mqttBaseUrlSchema,
})
