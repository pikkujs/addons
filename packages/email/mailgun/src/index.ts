export * from './mailgun.secret.js'
export * from './mailgun-api.service.js'
export * from './functions/messages/send.function.js'

// EmailService adapter (for host apps to wire as `emailService`)
export { MailgunEmailService } from './mailgun-email.service.js'
