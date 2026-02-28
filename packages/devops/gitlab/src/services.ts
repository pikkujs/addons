import { GitlabService } from './gitlab-api.service.js'
import type { GitlabSecrets } from './gitlab.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<GitlabSecrets>('GITLAB_CREDENTIALS')
  const gitlab = new GitlabService(creds)

  return { gitlab }
})
