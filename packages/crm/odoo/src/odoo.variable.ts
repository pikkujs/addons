import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const odooBaseUrlSchema = z.enum(["https://odoo.example.com"]).default("https://odoo.example.com")

defineVariable({
  name: 'ODOO_BASE_URL',
  displayName: 'Odoo Base URL',
  description: 'The base URL for the Odoo API.',
  variableId: 'ODOO_BASE_URL',
  schema: odooBaseUrlSchema,
})
