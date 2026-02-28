import { JenkinsService } from './jenkins-api.service.js'
import type { JenkinsSecrets } from './jenkins.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<JenkinsSecrets>('JENKINS_CREDENTIALS')
  const jenkins = new JenkinsService(creds)

  return { jenkins }
})
