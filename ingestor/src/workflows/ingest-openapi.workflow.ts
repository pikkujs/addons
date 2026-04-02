import { pikkuWorkflowFunc } from '#pikku/workflow/pikku-workflow-types.gen.js'

/**
 * OpenAPI Addon Ingestor Workflow
 *
 * Fetches all APIs from the registry, then processes each one:
 * download → generate → build → test
 *
 * Persisted via SQLite/Kysely so it can be interrupted and resumed.
 */
export const ingestOpenapi = pikkuWorkflowFunc<
  {
    outputDir: string
    specsDir: string
    maxOps: number
    camelCase: boolean
  },
  void
>(async ({}, data, { workflow }) => {
  const page = await workflow.do('fetch apis', 'fetchApis', {
    offset: 0,
    limit: 10000,
  })

  for (const api of page.apis) {
    await workflow.do(`process ${api.name}`, 'processAddon', {
      name: api.name,
      title: api.title,
      desc: ((api.description as string) ?? '').slice(0, 100),
      category: ((api.categories as string[]) ?? ['general'])[0],
      swaggerUrl: api.swaggerUrl,
      swaggerYamlUrl: (api.swaggerYamlUrl ?? '') as string,
      servers: (api.servers ?? []) as string[],
      outputDir: data.outputDir,
      specsDir: data.specsDir,
      camelCase: data.camelCase,
    })
  }
})
