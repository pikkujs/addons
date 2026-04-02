import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const AUTH_FILE = resolve(import.meta.dirname, '../../ingestor-auth.json')

export const ClassifyAuthInput = z.object({
  name: z.string(),
  specPath: z.string(),
  testNote: z.string(),
})

export const ClassifyAuthOutput = z.object({
  authType: z.enum([
    'api_key',
    'oauth2',
    'basic',
    'bearer',
    'none',
    'unknown',
  ]),
  location: z.string().optional(),
  paramName: z.string().optional(),
  perUser: z.boolean(),
  signupUrl: z.string().optional(),
  source: z.enum(['spec', 'ai']),
})

export const classifyAuth = pikkuSessionlessFunc({
  description: 'Classify auth requirements for an API',
  input: ClassifyAuthInput,
  output: ClassifyAuthOutput,
  func: async ({ logger }, data) => {
    // Load existing auth data
    const authData: Record<string, any> = existsSync(AUTH_FILE)
      ? JSON.parse(readFileSync(AUTH_FILE, 'utf8'))
      : {}

    // Already classified?
    if (authData[data.name]) {
      return authData[data.name]
    }

    // Try extracting from spec first
    let spec: any
    try {
      spec = JSON.parse(readFileSync(data.specPath, 'utf8'))
    } catch {
      const result = {
        authType: 'unknown' as const,
        perUser: false,
        source: 'spec' as const,
      }
      authData[data.name] = result
      writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2))
      return result
    }

    const securitySchemes =
      spec.components?.securitySchemes ||
      spec.securityDefinitions ||
      {}

    const schemeNames = Object.keys(securitySchemes)

    if (schemeNames.length > 0) {
      // Extract from spec — no AI needed
      const result = classifyFromSpec(securitySchemes)
      result.source = 'spec'
      authData[data.name] = result
      writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2))
      logger.info(`${data.name}: ${result.authType} (from spec)`)
      return result
    }

    // No security schemes in spec — use Claude to classify
    const result = await classifyWithAI(data.name, spec, data.testNote)
    result.source = 'ai'
    authData[data.name] = result
    writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2))
    logger.info(`${data.name}: ${result.authType} (from AI)`)
    return result
  },
})

function classifyFromSpec(schemes: Record<string, any>) {
  const result: any = { perUser: false }

  for (const [name, scheme] of Object.entries(schemes)) {
    const s = scheme as any

    if (s.type === 'oauth2') {
      result.authType = 'oauth2'
      result.perUser = true
      const flows = s.flows || {}
      if (flows.authorizationCode?.authorizationUrl) {
        result.signupUrl = flows.authorizationCode.authorizationUrl
      }
      return result
    }

    if (s.type === 'apiKey') {
      result.authType = 'api_key'
      result.location = s.in || 'header'
      result.paramName = s.name
      return result
    }

    if (s.type === 'http') {
      if (s.scheme === 'bearer') {
        result.authType = 'bearer'
        return result
      }
      if (s.scheme === 'basic') {
        result.authType = 'basic'
        result.perUser = true
        return result
      }
    }

    // OpenAPI 2.x
    if (s.type === 'basic') {
      result.authType = 'basic'
      result.perUser = true
      return result
    }
  }

  result.authType = 'unknown'
  return result
}

async function classifyWithAI(
  name: string,
  spec: any,
  testNote: string
) {
  const { execFileSync } = await import('child_process')

  const info = {
    title: spec.info?.title,
    description: spec.info?.description?.slice(0, 500),
    servers: spec.servers?.map((s: any) => s.url),
    host: spec.host,
    paths: Object.keys(spec.paths || {}).slice(0, 5),
  }

  const prompt = `Analyze this API and classify its authentication requirements.

API: ${name}
Title: ${info.title}
Description: ${info.description}
Servers: ${JSON.stringify(info.servers)}
Sample endpoints: ${JSON.stringify(info.paths)}
Test result: ${testNote}

Respond with ONLY a JSON object (no markdown, no explanation):
{
  "authType": "api_key" | "oauth2" | "basic" | "bearer" | "none" | "unknown",
  "location": "header" | "query" | "cookie" (if api_key),
  "paramName": "header/param name" (if api_key),
  "perUser": true/false (does each user need their own token?),
  "signupUrl": "url to get credentials" (if known)
}`

  try {
    const text = execFileSync('claude', ['-p', prompt, '--model', 'haiku'], {
      timeout: 30_000,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).toString()

    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      return JSON.parse(match[0])
    }
  } catch {}

  return { authType: 'unknown' as const, perUser: false }
}
