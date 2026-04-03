import { pikkuWorkflowFunc } from '#pikku/workflow/pikku-workflow-types.gen.js'

/**
 * Process a single API addon: download → generate → build → test
 */
export const processAddon = pikkuWorkflowFunc<
  {
    name: string
    title: string
    desc: string
    category: string
    swaggerUrl: string
    swaggerYamlUrl: string
    servers: string[]
    outputDir: string
    specsDir: string
    camelCase: boolean
  },
  {
    status: string
    note: string
    durationMs: number
  }
>(async ({}, data, { workflow }) => {
  const spec = await workflow.do('download spec', 'downloadSpec', {
    name: data.name,
    swaggerUrl: data.swaggerUrl,
    swaggerYamlUrl: data.swaggerYamlUrl,
    specsDir: data.specsDir,
  })

  if (!spec.success) {
    return { status: 'skip', note: 'download failed', durationMs: 0 }
  }

  const gen = await workflow.do('generate addon', 'generateAddon', {
    name: data.name,
    displayName: data.title,
    desc: data.desc,
    category: data.category,
    specPath: spec.specPath as string,
    outputDir: data.outputDir,
    camelCase: data.camelCase,
  })

  if (!gen.success) {
    return { status: 'fail', note: (gen.error as string) ?? 'generate failed', durationMs: 0 }
  }

  const build = await workflow.do('build addon', 'buildAddon', {
    addonDir: gen.addonDir as string,
    addonName: data.name,
  })

  if (!build.success) {
    return { status: 'fail', note: `${build.stage}: ${build.error}`, durationMs: (build.durationMs as number) ?? 0 }
  }

  const test = await workflow.do('test addon', 'testAddon', {
    addonDir: gen.addonDir as string,
    addonName: data.name,
    ...(data.servers[0] ? { baseUrl: data.servers[0] } : {}),
  })

  // Always classify auth
  const testNote = (test.note as string) ?? 'unknown'
  await workflow.do('classify auth', 'classifyAuth', {
    name: data.name,
    specPath: spec.specPath as string,
    testNote,
  })

  return {
    status: test.success ? 'pass' : 'skip',
    note: testNote,
    durationMs: (test.durationMs as number) ?? 0,
  }
})
