import { pikkuAddonServices } from '#pikku'
import { WhisperASRService } from './whisper-asr.service.js'

export const createSingletonServices = pikkuAddonServices(async (_config, { variables, content }) => {
  const baseURL = (await variables.get('WHISPER_ASR_BASE_URL')) ?? 'http://localhost:9000'

  const whisperASR = new WhisperASRService(baseURL)

  return { whisperASR, content }
})
