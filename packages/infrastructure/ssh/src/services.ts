import { Client } from 'ssh2'
import type { SshSecrets } from './ssh.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets, content }) => {
  const creds = await secrets.getSecretJSON<SshSecrets>('SSH_CREDENTIALS')

  const sshClient = new Client()

  await new Promise<void>((resolve, reject) => {
    sshClient.on('ready', resolve)
    sshClient.on('error', reject)
    sshClient.connect({
      host: creds.host,
      port: creds.port ?? 22,
      username: creds.username,
      password: creds.password,
      privateKey: creds.privateKey,
      passphrase: creds.passphrase,
    })
  })

  return {
    sshClient,
    content,
    stop: async () => {
      sshClient.end()
    },
  }
})
