import { GithubService } from './github-api.service.js'
import type { GithubSecrets } from './github.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<GithubSecrets>('GITHUB_CREDENTIALS')
  const github = new GithubService(creds)

  return { github }
})
