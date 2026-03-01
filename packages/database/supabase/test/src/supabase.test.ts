import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait, Network } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'
import crypto from 'node:crypto'

const DB_NAME = 'testdb'
const DB_USER = 'postgres'
const DB_PASS = 'postgres'
const JWT_SECRET = 'super-secret-jwt-token-for-testing-only-256-bits!'
const ANON_ROLE = 'anon'

function createJWT(secret: string, role: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(
    JSON.stringify({ role, iss: 'supabase', iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600 })
  ).toString('base64url')
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url')
  return `${header}.${payload}.${signature}`
}

// Use the public schema so the Supabase JS client (which defaults to public)
// can access tables without custom schema configuration.
const INIT_SQL = `
CREATE ROLE ${ANON_ROLE} NOLOGIN;
GRANT ${ANON_ROLE} TO ${DB_USER};

CREATE TABLE public.test_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  value INTEGER NOT NULL DEFAULT 0
);

GRANT USAGE ON SCHEMA public TO ${ANON_ROLE};
GRANT ALL ON ALL TABLES IN SCHEMA public TO ${ANON_ROLE};
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ${ANON_ROLE};

CREATE OR REPLACE FUNCTION public.get_item_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM public.test_items;
$$ LANGUAGE SQL SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_item_count() TO ${ANON_ROLE};
`

// The Supabase JS client appends /rest/v1 to the base URL when making
// PostgREST requests.  Raw PostgREST serves directly from /.  This nginx
// config strips the /rest/v1 prefix so the two are compatible.
const NGINX_CONF = [
  'server {',
  '    listen 80;',
  '    location /rest/v1/ {',
  '        proxy_pass http://postgrest:3000/;',
  '        proxy_set_header Host $host;',
  '        proxy_set_header X-Real-IP $remote_addr;',
  '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;',
  '    }',
  '    location /rest/v1 {',
  '        proxy_pass http://postgrest:3000/;',
  '        proxy_set_header Host $host;',
  '        proxy_set_header X-Real-IP $remote_addr;',
  '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;',
  '    }',
  '}',
].join('\n')

test('supabase addon', async () => {
  console.log('\n  Starting PostgreSQL + PostgREST + nginx containers...')

  const network = await new Network().start()

  // Place init SQL into the docker-entrypoint-initdb.d directory so that
  // PostgreSQL executes it during startup, before PostgREST connects.
  const pgContainer = await new GenericContainer('postgres:16-alpine')
    .withNetwork(network)
    .withNetworkAliases('db')
    .withExposedPorts(5432)
    .withEnvironment({
      POSTGRES_DB: DB_NAME,
      POSTGRES_USER: DB_USER,
      POSTGRES_PASSWORD: DB_PASS,
    })
    .withCopyContentToContainer([{
      content: INIT_SQL,
      target: '/docker-entrypoint-initdb.d/01-init.sql',
    }])
    .withWaitStrategy(Wait.forLogMessage(/database system is ready to accept connections/, 2))
    .withStartupTimeout(60_000)
    .start()

  try {
    console.log('  PostgreSQL ready with schema')

    const postgrestContainer = await new GenericContainer('postgrest/postgrest:v12.2.3')
      .withNetwork(network)
      .withNetworkAliases('postgrest')
      .withExposedPorts(3000)
      .withEnvironment({
        PGRST_DB_URI: `postgresql://${DB_USER}:${DB_PASS}@db:5432/${DB_NAME}?sslmode=disable`,
        PGRST_DB_SCHEMAS: 'public',
        PGRST_DB_ANON_ROLE: ANON_ROLE,
        PGRST_JWT_SECRET: JWT_SECRET,
        PGRST_LOG_LEVEL: 'info',
      })
      .withWaitStrategy(Wait.forLogMessage(/Listening on port/))
      .withStartupTimeout(60_000)
      .start()

    console.log('  PostgREST ready')

    try {
      // nginx reverse-proxy: rewrites /rest/v1/* -> /* so the Supabase JS
      // client (which always appends /rest/v1) talks to raw PostgREST correctly.
      const nginxContainer = await new GenericContainer('nginx:alpine')
        .withNetwork(network)
        .withExposedPorts(80)
        .withCopyContentToContainer([{
          content: NGINX_CONF,
          target: '/etc/nginx/conf.d/default.conf',
        }])
        .withWaitStrategy(Wait.forListeningPorts())
        .withStartupTimeout(30_000)
        .start()

      const supabaseUrl = `http://${nginxContainer.getHost()}:${nginxContainer.getMappedPort(80)}`
      console.log(`  nginx proxy ready at ${supabaseUrl}  (/rest/v1/* -> PostgREST)`)

      try {
        const apiKey = createJWT(JWT_SECRET, ANON_ROLE)

        const secrets = new LocalSecretService()
        await secrets.setSecretJSON('SUPABASE_CREDENTIALS', {
          url: supabaseUrl,
          apiKey,
        })

        const singletonServices = await createSingletonServices({}, { secrets })
        const rpc = rpcService.getContextRPCService(singletonServices as any, {})

        try {
          const { passed, failed } = await rpc.invoke('testSupabase', {})

          console.log(`\n  ${passed} passed`)
          if (failed.length > 0) {
            console.log(`  ${failed.length} failed:`)
            for (const f of failed) console.log(`    ✗ ${f}`)
          }

          assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
        } finally {
          await stopSingletonServices()
        }
      } finally {
        await nginxContainer.stop()
      }
    } finally {
      await postgrestContainer.stop()
    }
  } finally {
    await pgContainer.stop()
    await network.stop()
  }
})
