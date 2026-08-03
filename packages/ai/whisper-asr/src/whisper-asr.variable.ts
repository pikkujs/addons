import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const whisperAsrBaseUrlSchema = z.string().default('http://localhost:9000').describe('Base URL for the Whisper ASR webservice')

defineVariable({
  name: 'whisper_asr_base_url',
  displayName: 'Whisper ASR Base URL',
  description: 'Base URL for the Whisper ASR webservice',
  variableId: 'WHISPER_ASR_BASE_URL',
  schema: whisperAsrBaseUrlSchema,
})
