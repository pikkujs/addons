import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const odooCredentialSchema = z.object({
  apiKey: z.string().describe('Odoo API key'),
})

wireCredential({
  name: 'odoo',
  displayName: 'Odoo',
  description: 'Odoo ERP via JSON-RPC',
  type: 'wire',
  schema: odooCredentialSchema,
})
