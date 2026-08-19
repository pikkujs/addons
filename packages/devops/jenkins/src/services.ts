import { JenkinsService } from './jenkins-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('JENKINS_CREDENTIALS')).reveal()
  const jenkins = new JenkinsService(creds)

  return { jenkins }
})
