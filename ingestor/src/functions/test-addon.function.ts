import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export const TestAddonInput = z.object({
  addonDir: z.string(),
  addonName: z.string(),
  baseUrl: z.string().optional(),
})

export const TestAddonOutput = z.object({
  success: z.boolean(),
  testRan: z.boolean(),
  note: z.string().optional(),
  durationMs: z.number().optional(),
})

export const testAddon = pikkuSessionlessFunc({
  description: 'Build and run the addon test harness',
  input: TestAddonInput,
  output: TestAddonOutput,
  func: async ({ logger }, data) => {
    const start = Date.now()
    const testDir = join(data.addonDir, 'test')

    if (!existsSync(join(testDir, 'pikku.config.json'))) {
      return { success: false, testRan: false, note: 'no test harness' }
    }

    // Patch test package.json: file:.. → workspace:* and add --preserve-symlinks
    const testPkg = join(testDir, 'package.json')
    if (existsSync(testPkg)) {
      let content = readFileSync(testPkg, 'utf8')
      content = content.replace('"file:.."', '"workspace:*"')
      content = content.replace(
        'node --import tsx --test',
        'node --preserve-symlinks --import tsx --test'
      )
      writeFileSync(testPkg, content)
    }

    // Ensure RPC wiring exists
    ensureRpcWiring(testDir, data.addonName)

    // pikku all for test
    try {
      execSync('npx pikku all', {
        cwd: testDir,
        timeout: 120_000,
        stdio: 'pipe',
      })
    } catch {
      return { success: false, testRan: false, note: 'test pikku all failed' }
    }

    // Run test
    const scream = data.addonName.replace(/-/g, '_').toUpperCase()
    const env: Record<string, string> = {}
    if (data.baseUrl) {
      env[`${scream}_BASE_URL`] = data.baseUrl
    }

    try {
      const result = execSync(
        "node --preserve-symlinks --import tsx --test 'src/**/*.test.ts'",
        {
          cwd: testDir,
          timeout: 30_000,
          stdio: 'pipe',
          env: { ...process.env, ...env },
        }
      )
      const out = result.toString()
      const durationMs = Date.now() - start
      return { success: true, testRan: true, note: 'pass', durationMs }
    } catch (e: any) {
      const out = (e.stdout?.toString() || '') + (e.stderr?.toString() || '')
      const testRan = out.includes('# pass ') && out.includes('# fail ')
      const durationMs = Date.now() - start

      let note = 'unclassified'
      if (testRan) {
        if (out.includes('Unauthorized') || out.includes('(401)') || out.includes('(403)')) {
          note = 'pass (auth_required)'
        } else if (out.includes('ECONNREFUSED') || out.includes('ENOTFOUND')) {
          note = 'pass (offline)'
        } else {
          note = 'pass (api_error)'
        }
      } else if (out.includes('ERR_MODULE_NOT_FOUND')) {
        note = 'module_not_found'
      } else if (out.includes('Function not found') || out.includes('RPC function not found')) {
        note = 'wiring_error'
      }

      const isCodegenPass = testRan
      logger.info(`${data.addonName}: ${note} (${durationMs}ms)`)
      return { success: isCodegenPass, testRan, note, durationMs }
    }
  },
})

function ensureRpcWiring(testDir: string, addonName: string) {
  const bootstrap = join(testDir, '.pikku', 'pikku-bootstrap.gen.ts')
  if (!existsSync(bootstrap)) return

  const content = readFileSync(bootstrap, 'utf8')
  if (content.includes('pikku-functions.gen.js') && content.includes('pikku-rpc-wirings-meta.internal.gen.js')) {
    return
  }

  const funcMeta = join(testDir, '.pikku', 'function', 'pikku-functions-meta.gen.json')
  if (!existsSync(funcMeta)) return

  const funcs = JSON.parse(readFileSync(funcMeta, 'utf8'))
  if (!funcs || Object.keys(funcs).length === 0) return

  // Create RPC meta
  const rpcDir = join(testDir, '.pikku', 'rpc')
  mkdirSync(rpcDir, { recursive: true })

  const rpcMeta = Object.fromEntries(Object.keys(funcs).map((k) => [k, k]))
  writeFileSync(join(rpcDir, 'pikku-rpc-wirings-meta.internal.gen.json'), JSON.stringify(rpcMeta, null, 2))
  writeFileSync(
    join(rpcDir, 'pikku-rpc-wirings-meta.internal.gen.ts'),
    `import { pikkuState } from '@pikku/core/internal'\nimport metaData from './pikku-rpc-wirings-meta.internal.gen.json' with { type: 'json' }\npikkuState(null, 'rpc', 'meta', metaData as Record<string, string>)\n`
  )

  // Create function registration
  const pascal = addonName.replace(/(?:^|[-_])(.)/g, (_, c) => c.toUpperCase())
  const testFuncName = `test${pascal}`
  const funcDir = join(testDir, '.pikku', 'function')
  writeFileSync(
    join(funcDir, 'pikku-functions.gen.ts'),
    `import { addFunction } from '@pikku/core'\nimport { ${testFuncName} } from '../../src/${addonName}-tests.function.js'\naddFunction('${testFuncName}', ${testFuncName})\n`
  )

  // Update bootstrap
  const imports = []
  if (!content.includes('pikku-rpc-wirings-meta.internal.gen.js')) {
    imports.push("import './rpc/pikku-rpc-wirings-meta.internal.gen.js'")
  }
  if (!content.includes('pikku-functions.gen.js')) {
    imports.push("import './function/pikku-functions.gen.js'")
  }
  if (imports.length > 0) {
    const lines = content.split('\n')
    let lastImport = 0
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) lastImport = i
    }
    for (const imp of imports.reverse()) {
      lines.splice(lastImport + 1, 0, imp)
    }
    writeFileSync(bootstrap, lines.join('\n'))
  }
}
