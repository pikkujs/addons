import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const twilioSecretsSchema = z.object({
  accountSid: z.string().describe('Your Twilio Account SID'),
  authToken: z.string().describe('Your Twilio Auth Token'),
})

export type TwilioSecrets = z.infer<typeof twilioSecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'Twilio Secrets',
  description: 'Twilio Account SID and Auth Token',
  secretId: 'TWILIO_CREDENTIALS',
  schema: twilioSecretsSchema,
})
