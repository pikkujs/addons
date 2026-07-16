import { GithubService } from './github-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const github = new GithubService(secrets, variables)

  return { github }
})
