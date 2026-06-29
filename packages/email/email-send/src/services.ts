import { createTransport, type Transporter } from 'nodemailer'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets, content }) => {
  const creds = await secrets.getSecret('EMAIL_SEND_CREDENTIALS')

  const emailTransport: Transporter = createTransport({
    host: creds.host,
    port: creds.port,
    secure: creds.secure ?? creds.port === 465,
    auth: creds.user ? {
      user: creds.user,
      pass: creds.password,
    } : undefined,
  })

  return {
    emailTransport,
    content,
    stop: async () => {
      emailTransport.close()
    },
  }
})
