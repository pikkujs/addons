import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const whisperAsrBaseUrlSchema = z.string().default('http://localhost:9000').describe('Base URL for the Whisper ASR webservice')

wireVariable({
  name: 'whisper_asr_base_url',
  displayName: 'Whisper ASR Base URL',
  description: 'Base URL for the Whisper ASR webservice',
  variableId: 'WHISPER_ASR_BASE_URL',
  schema: whisperAsrBaseUrlSchema,
})
