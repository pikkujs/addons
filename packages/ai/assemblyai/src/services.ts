import { AssemblyaiService } from './assemblyai-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const apiKey = await secrets.getSecretJSON<string>('ASSEMBLYAI_API_KEY')
  const assemblyai = new AssemblyaiService(apiKey)

  return { assemblyai }
})
