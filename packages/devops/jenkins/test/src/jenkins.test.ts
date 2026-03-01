import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

const JENKINS_USER = 'admin'
const JENKINS_PASS = 'testpassword'

const INIT_GROOVY = `
import jenkins.model.*
import hudson.security.*
import hudson.model.*

def instance = Jenkins.getInstance()

// Create admin user
def hudsonRealm = new HudsonPrivateSecurityRealm(false)
hudsonRealm.createAccount("${JENKINS_USER}", "${JENKINS_PASS}")
instance.setSecurityRealm(hudsonRealm)

def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
strategy.setAllowAnonymousRead(false)
instance.setAuthorizationStrategy(strategy)

// Disable CRUMB for API access
instance.setCrumbIssuer(null)

// Create a simple test job
def project = instance.createProject(FreeStyleProject, "test-job")
project.save()

instance.save()
`

test('jenkins addon', async () => {
  console.log('\n  Starting Jenkins container...')

  const container = await new GenericContainer('jenkins/jenkins:lts-jdk17')
    .withExposedPorts(8080)
    .withEnvironment({
      JAVA_OPTS: '-Djenkins.install.runSetupWizard=false',
    })
    .withCopyContentToContainer([
      {
        content: INIT_GROOVY,
        target: '/usr/share/jenkins/ref/init.groovy.d/init.groovy',
      },
    ])
    .withWaitStrategy(Wait.forLogMessage(/Jenkins is fully up and running/))
    .withStartupTimeout(120_000)
    .start()

  const baseUrl = `http://${container.getHost()}:${container.getMappedPort(8080)}`
  console.log(`  Jenkins ready at ${baseUrl}`)

  try {
    const secrets = new LocalSecretService()
    await secrets.setSecretJSON('JENKINS_CREDENTIALS', {
      username: JENKINS_USER,
      apiKey: JENKINS_PASS,
      baseUrl,
    })

    const singletonServices = await createSingletonServices({}, { secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    try {
      const { passed, failed } = await rpc.invoke('testJenkins', {})

      console.log(`\n  ${passed} passed`)
      if (failed.length > 0) {
        console.log(`  ${failed.length} failed:`)
        for (const f of failed) console.log(`    ✗ ${f}`)
      }

      assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
    } finally {
      await stopSingletonServices()
    }
  } finally {
    await container.stop()
  }
})
