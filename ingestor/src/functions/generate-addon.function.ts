import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { execSync } from 'child_process'
import { existsSync, realpathSync } from 'fs'
import { resolve } from 'path'

const PIKKU_JS = realpathSync(resolve(import.meta.dirname, '../../node_modules/.bin/pikku'))

export const GenerateAddonInput = z.object({
  name: z.string(),
  displayName: z.string(),
  desc: z.string(),
  category: z.string(),
  specPath: z.string(),
  outputDir: z.string(),
  camelCase: z.boolean().default(true),
})

export const GenerateAddonOutput = z.object({
  success: z.boolean(),
  addonDir: z.string().optional(),
  error: z.string().optional(),
})

export const generateAddon = pikkuSessionlessFunc({
  description: 'Generate a pikku addon from an OpenAPI spec',
  input: GenerateAddonInput,
  output: GenerateAddonOutput,
  func: async ({ logger }, data) => {
    const addonDir = `${data.outputDir}/${data.name}`
    if (existsSync(`${addonDir}/pikku.config.json`)) {
      logger.info(`${data.name}: already exists`)
      return { success: true, addonDir }
    }

    try {
      const esc = (s: string) => `'${s.replace(/'/g, "'\\''")}'`
      const parts = [
        `node "${PIKKU_JS}" new addon ${esc(data.name)}`,
        `--displayName ${esc(data.displayName)}`,
        `--description ${esc(data.desc.slice(0, 100))}`,
        `--category ${esc(data.category)}`,
        `--openapi ${esc(data.specPath)}`,
        `--dir ${esc(data.outputDir)}`,
        '--test true',
        data.camelCase ? '--camelCase' : '',
      ].filter(Boolean)

      execSync(parts.join(' '), {
        timeout: 120_000,
        stdio: 'pipe',
      })

      logger.info(`${data.name}: generated`)
      return { success: true, addonDir }
    } catch (e: any) {
      const msg = e.stderr?.toString().slice(-200) || e.message
      logger.warn(`${data.name}: generate failed — ${msg}`)
      return { success: false, error: msg.slice(0, 200) }
    }
  },
})
