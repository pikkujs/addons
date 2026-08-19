import { StoryblokService } from './storyblok-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('storyblok')
    if (!cred?.apiKey) {
      throw new Error('Missing storyblok credential')
    }
    const storyblok = new StoryblokService(cred, variables)

    return { storyblok }
  }
)
