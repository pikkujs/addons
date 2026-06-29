import { JenkinsService } from './jenkins-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('JENKINS_CREDENTIALS')
  const jenkins = new JenkinsService(creds)

  return { jenkins }
})
