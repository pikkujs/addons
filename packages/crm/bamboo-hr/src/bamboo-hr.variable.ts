import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const bambooHrBaseUrlSchema = z.enum(["https://api.bamboohr.com/api/gateway.php/company/v1"]).default("https://api.bamboohr.com/api/gateway.php/company/v1")

wireVariable({
  name: 'BAMBOO_HR_BASE_URL',
  displayName: 'BambooHR Base URL',
  description: 'The base URL for the BambooHR API.',
  variableId: 'BAMBOO_HR_BASE_URL',
  schema: bambooHrBaseUrlSchema,
})
