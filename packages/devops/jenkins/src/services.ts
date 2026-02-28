import { JenkinsService } from './jenkins-api.service.js'
import type { JenkinsSecrets } from './jenkins.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<JenkinsSecrets>('JENKINS_CREDENTIALS')
  const jenkins = new JenkinsService(creds)

  return { jenkins }
})
