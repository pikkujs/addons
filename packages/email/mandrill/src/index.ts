// Message functions
export { mandrillMessageSend } from './functions/message-send.function.js'
export { mandrillMessageSendTemplate } from './functions/message-send-template.function.js'

// EmailService adapter (for host apps to wire as `emailService`)
export { MandrillEmailService } from './mandrill-email.service.js'
