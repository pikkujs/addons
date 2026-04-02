import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { execFileSync } from 'child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { cpSync } from 'fs'
import { join, resolve } from 'path'

// Resolve the ingestor's node_modules/.bin so spawned commands can find pikku/tsc
const INGESTOR_BIN = resolve(import.meta.dirname, '../../node_modules/.bin')
const ENV = { ...process.env, PATH: `${INGESTOR_BIN}:${process.env.PATH}` }

export const BuildAddonInput = z.object({
  addonDir: z.string(),
  addonName: z.string(),
})

export const BuildAddonOutput = z.object({
  success: z.boolean(),
  stage: z.string().optional(),
  error: z.string().optional(),
  durationMs: z.number().optional(),
})

export const buildAddon = pikkuSessionlessFunc({
  description: 'Build an addon: stub imports → pikku all → restore → tsc → copy .pikku to dist',
  input: BuildAddonInput,
  output: BuildAddonOutput,
  func: async ({ logger }, data) => {
    logger.info(`INGESTOR_BIN: ${INGESTOR_BIN}`)
    const start = Date.now()
    const funcsDir = join(data.addonDir, 'src', 'functions')

    // Stub pikkuSessionlessFunc imports for faster cold-start
    if (existsSync(funcsDir)) {
      for (const f of readdirSync(funcsDir, { recursive: true }) as string[]) {
        if (!f.endsWith('.function.ts')) continue
        const fp = join(funcsDir, f)
        const content = readFileSync(fp, 'utf8')
        if (content.includes("from '#pikku'")) {
          writeFileSync(
            fp,
            content.replace(
              /import\s*\{[^}]*pikkuSessionlessFunc[^}]*\}\s*from\s*['"]#pikku['"]/,
              `// @pikku-stubbed\nconst pikkuSessionlessFunc = (opts: any) => opts`
            )
          )
        }
      }
    }

    // pikku all
    try {
      execFileSync(`${INGESTOR_BIN}/pikku`, ['all'], {
        cwd: data.addonDir,
        timeout: 300_000,
        stdio: 'pipe',
      })
    } catch (e: any) {
      const err = e.stderr?.toString().slice(-200) || e.message.slice(0, 200)
      logger.warn(`${data.addonName}: pikku all failed — ${err}`)
      return { success: false, stage: 'pikku-all', error: err }
    }

    // Restore imports
    if (existsSync(funcsDir)) {
      for (const f of readdirSync(funcsDir, { recursive: true }) as string[]) {
        if (!f.endsWith('.function.ts')) continue
        const fp = join(funcsDir, f)
        const content = readFileSync(fp, 'utf8')
        if (content.includes('// @pikku-stubbed')) {
          writeFileSync(
            fp,
            content
              .replace('// @pikku-stubbed\nconst pikkuSessionlessFunc = (opts: any) => opts', '')
              .replace(/^/, "import { pikkuSessionlessFunc } from '#pikku'\n")
          )
        }
      }
    }

    // tsc
    try {
      execFileSync(`${INGESTOR_BIN}/tsc`, [], {
        cwd: data.addonDir,
        timeout: 120_000,
        stdio: 'pipe',
      })
    } catch (e: any) {
      const err = e.stderr?.toString().slice(-200) || e.message.slice(0, 200)
      logger.warn(`${data.addonName}: tsc failed — ${err}`)
      return { success: false, stage: 'tsc', error: err }
    }

    // Copy .pikku to dist/.pikku
    const pikkuDir = join(data.addonDir, '.pikku')
    const distPikku = join(data.addonDir, 'dist', '.pikku')
    if (existsSync(pikkuDir) && !existsSync(distPikku)) {
      cpSync(pikkuDir, distPikku, { recursive: true })
    }

    const durationMs = Date.now() - start
    logger.info(`${data.addonName}: built in ${durationMs}ms`)
    return { success: true, durationMs }
  },
})
