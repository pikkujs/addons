import { AssemblyaiService } from './assemblyai-api.service.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets }
) => {
  const apiKey = await secrets.getSecretJSON<string>('ASSEMBLYAI_API_KEY')
  const assemblyai = new AssemblyaiService(apiKey)

  return { assemblyai }
})
