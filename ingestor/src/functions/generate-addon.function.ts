import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { execFileSync } from 'child_process'
import { existsSync } from 'fs'

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
      const args = [
        'pikku', 'new', 'addon', data.name,
        '--displayName', data.displayName,
        '--description', data.desc.slice(0, 100),
        '--category', data.category,
        '--openapi', data.specPath,
        '--dir', data.outputDir,
        '--test', 'true',
      ]
      if (data.camelCase) {
        args.push('--camelCase')
      }

      execFileSync('npx', args, {
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
