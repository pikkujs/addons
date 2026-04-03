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
    'aws_sigv4',
    'custom',
    'none',
    'unknown',
  ]),
  location: z.string().optional(),
  paramName: z.string().optional(),
  headerPrefix: z.string().optional(),
  perUser: z.boolean(),
  signupUrl: z.string().optional(),
  docsUrl: z.string().optional(),
  freeTier: z.boolean().optional(),
  tokenUrl: z.string().optional(),
  authorizationUrl: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  notes: z.string().optional(),
  source: z.enum(['spec', 'ai', 'spec+ai']),
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
      const result = await classifyWithAI(data.name, null, data.testNote)
      result.source = 'ai'
      authData[data.name] = result
      writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2))
      logger.info(`${data.name}: ${result.authType} (from AI, no spec)`)
      return result
    }

    const securitySchemes =
      spec.components?.securitySchemes ||
      spec.securityDefinitions ||
      {}

    // Extract what we can from spec
    const specResult = Object.keys(securitySchemes).length > 0
      ? classifyFromSpec(securitySchemes)
      : {}

    // Always run AI to enrich with docsUrl, signupUrl, freeTier, etc.
    const aiResult = await classifyWithAI(data.name, spec, data.testNote, specResult)

    // Merge: spec fields take precedence for structured data, AI fills gaps
    const result: any = {
      ...aiResult,
      ...specResult,
      // AI is better at these — prefer AI values if present
      docsUrl: aiResult.docsUrl || specResult.docsUrl,
      signupUrl: aiResult.signupUrl || specResult.signupUrl,
      freeTier: aiResult.freeTier ?? specResult.freeTier,
      notes: aiResult.notes || specResult.notes,
      perUser: aiResult.perUser ?? specResult.perUser ?? false,
      source: Object.keys(securitySchemes).length > 0 ? 'spec+ai' : 'ai',
    }

    // Strip undefined/null to avoid schema validation errors
    for (const key of Object.keys(result)) {
      if (result[key] == null) delete result[key]
    }
    if (!('perUser' in result)) result.perUser = false

    authData[data.name] = result
    writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2))
    logger.info(`${data.name}: ${result.authType} (${result.source})`)
    return result
  },
})

function classifyFromSpec(schemes: Record<string, any>) {
  const result: any = { perUser: false }
  const entries = Object.values(schemes)

  // OAuth2 takes priority — check first across all schemes
  for (const scheme of entries) {
    const s = scheme as any
    if (s.type === 'oauth2') {
      result.authType = 'oauth2'
      result.perUser = true
      const flows = s.flows || {}
      const flow =
        flows.authorizationCode ||
        flows.clientCredentials ||
        flows.implicit ||
        flows.password ||
        {}
      if (flow.authorizationUrl) result.authorizationUrl = flow.authorizationUrl
      if (flow.tokenUrl) result.tokenUrl = flow.tokenUrl
      if (flow.scopes) result.scopes = Object.keys(flow.scopes)
      // OpenAPI 2.x oauth2
      if (s.authorizationUrl) result.authorizationUrl = s.authorizationUrl
      if (s.tokenUrl) result.tokenUrl = s.tokenUrl
      if (s.scopes) result.scopes = Object.keys(s.scopes)
      return result
    }
  }

  // Then check remaining types
  for (const scheme of entries) {
    const s = scheme as any

    if (s.type === 'apiKey') {
      result.authType = 'api_key'
      result.location = s.in || 'header'
      if (s.name) result.paramName = s.name
      return result
    }

    if (s.type === 'http') {
      if (s.scheme === 'bearer') {
        result.authType = 'bearer'
        result.headerPrefix = 'Bearer'
        return result
      }
      if (s.scheme === 'basic') {
        result.authType = 'basic'
        result.perUser = true
        result.headerPrefix = 'Basic'
        return result
      }
    }

    // OpenAPI 2.x
    if (s.type === 'basic') {
      result.authType = 'basic'
      result.perUser = true
      result.headerPrefix = 'Basic'
      return result
    }
  }

  result.authType = 'unknown'
  return result
}

async function classifyWithAI(
  name: string,
  spec: any | null,
  testNote: string,
  specHints?: Record<string, any>
) {
  const { execFileSync } = await import('child_process')

  const info = spec
    ? {
        title: spec.info?.title,
        description: spec.info?.description?.slice(0, 500),
        servers: spec.servers?.map((s: any) => s.url),
        host: spec.host,
        paths: Object.keys(spec.paths || {}).slice(0, 5),
      }
    : { title: name, description: '', servers: [], host: '', paths: [] }

  const specContext = specHints?.authType
    ? `\nSpec-extracted auth: ${JSON.stringify(specHints)}`
    : ''

  const prompt = `Analyze this API and classify its authentication requirements.

API: ${name}
Title: ${info.title}
Description: ${info.description}
Servers: ${JSON.stringify(info.servers)}
Sample endpoints: ${JSON.stringify(info.paths)}
Test result: ${testNote}${specContext}

Respond with ONLY a JSON object (no markdown, no explanation):
{
  "authType": "api_key" | "oauth2" | "basic" | "bearer" | "aws_sigv4" | "custom" | "none" | "unknown",
  "location": "header" | "query" | "cookie" (if api_key),
  "paramName": "header/param name" (if api_key),
  "headerPrefix": "Bearer" | "Basic" | "Token" | "AWS4-HMAC-SHA256" | etc (if applicable),
  "perUser": true/false (true if each end-user needs their own credentials to use this API — e.g. personal OAuth tokens, individual API keys from a signup. false if a single shared service key/secret can be used on behalf of all users — e.g. a server-side API key for a SaaS platform),
  "signupUrl": "url to sign up and get credentials" (if known),
  "docsUrl": "url to API authentication documentation" (if known),
  "freeTier": true/false (is there a free tier? Only set true if you are CERTAIN a free tier exists. Omit if unsure.),
  "tokenUrl": "OAuth2 token endpoint" (if oauth2),
  "authorizationUrl": "OAuth2 authorization endpoint" (if oauth2),
  "scopes": ["scope1", "scope2"] (if oauth2, common scopes),
  "notes": "any important context about the auth mechanism (e.g. non-standard signing, special requirements)"
}

Rules:
- Use "oauth2" when the API uses OAuth2 flows, even if tokens are sent as Bearer tokens. "bearer" is only for APIs that use static/long-lived bearer tokens WITHOUT an OAuth2 flow.
- Use "aws_sigv4" for AWS services that use Signature V4 signing.
- Use "custom" for non-standard auth mechanisms (HMAC signing, mutual TLS, etc).
- Only include fields that are relevant. Omit fields you're unsure about rather than guessing.`

  try {
    const text = execFileSync('claude', ['-p', prompt, '--model', 'haiku'], {
      timeout: 30_000,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).toString()

    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      const parsed = JSON.parse(match[0])
      for (const key of Object.keys(parsed)) {
        if (parsed[key] == null) delete parsed[key]
      }
      return parsed
    }
  } catch {}

  return { authType: 'unknown' as const, perUser: false }
}
