import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'

export const DownloadSpecInput = z.object({
  name: z.string(),
  swaggerUrl: z.string(),
  swaggerYamlUrl: z.string().optional(),
  specsDir: z.string(),
})

export const DownloadSpecOutput = z.object({
  success: z.boolean(),
  specPath: z.string().optional(),
  error: z.string().optional(),
})

export const downloadSpec = pikkuSessionlessFunc({
  description: 'Download an OpenAPI spec file',
  input: DownloadSpecInput,
  output: DownloadSpecOutput,
  func: async ({ logger }, data) => {
    const jsonPath = `${data.specsDir}/${data.name}.json`
    const yamlPath = `${data.specsDir}/${data.name}.yaml`

    if (existsSync(jsonPath)) {
      return { success: true, specPath: jsonPath }
    }
    if (existsSync(yamlPath)) {
      return { success: true, specPath: yamlPath }
    }

    mkdirSync(dirname(jsonPath), { recursive: true })

    // Try JSON first
    try {
      const res = await fetch(data.swaggerUrl)
      if (res.ok) {
        const body = await res.text()
        writeFileSync(jsonPath, body)
        logger.info(`Downloaded ${data.name} (JSON)`)
        return { success: true, specPath: jsonPath }
      }
    } catch {}

    // Try YAML fallback
    if (data.swaggerYamlUrl) {
      try {
        const res = await fetch(data.swaggerYamlUrl)
        if (res.ok) {
          const body = await res.text()
          writeFileSync(yamlPath, body)
          logger.info(`Downloaded ${data.name} (YAML)`)
          return { success: true, specPath: yamlPath }
        }
      } catch {}
    }

    return { success: false, error: 'Failed to download spec' }
  },
})
