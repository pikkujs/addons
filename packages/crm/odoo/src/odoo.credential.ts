import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const odooCredentialSchema = z.object({
  apiKey: z.string().describe('Odoo API key'),
})

defineCredential({
  name: 'odoo',
  displayName: 'Odoo',
  description: 'Odoo ERP via JSON-RPC',
  type: 'wire',
  schema: odooCredentialSchema,
})
