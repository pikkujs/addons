import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stopSingletonServices } from '@pikku/core/utils'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

// Every case is a real request against a metered vendor, so the suite is
// opt-in rather than mocked: a green run with no key would say the addon
// works when nothing was called.
const skip = !process.env.TYPESAFE_API_KEY && 'set TYPESAFE_API_KEY to run'

const withRpc = async (fn: (rpc: any) => Promise<void>) => {
  const secrets = new LocalSecretService()
  await secrets.setSecret('TYPESAFE_CREDENTIALS', {
    apiKey: process.env.TYPESAFE_API_KEY!,
  })
  const singletonServices = await createSingletonServices({}, { secrets })
  try {
    await fn(rpcService.getContextRPCService(singletonServices as any, {}))
  } finally {
    await stopSingletonServices()
  }
}

// One case per option. A classifier that agrees with all three is reading the
// criteria; one that answers the same way three times is not.
const TASKS = {
  function: 'Rename the `sourceSlug` field to `template` in the new-app CLI input schema.',
  agent:
    'Make the sandbox agent decide on its own what to work on next, loading milestones and asking the orchestrator through a tool.',
  workflow:
    'Every night, pull yesterday request rows, roll them up per org, and write a billing summary; retry the write if the DB is down.',
}

for (const [expected, task] of Object.entries(TASKS)) {
  test(`classifyTask reads ${expected}`, { skip }, async () => {
    await withRpc(async (rpc) => {
      const r = await rpc.invoke('typesafe:classifyTask', { task })
      assert.equal(
        r.shape.choice,
        expected,
        `got ${r.shape.choice} ${JSON.stringify(r.shape.probabilities)}`
      )
      assert.ok(r.shape.confidence > 0.5, `confidence ${r.shape.confidence} too low to call`)
    })
  })
}

test('classifyTask separates plan from no-plan', { skip }, async () => {
  await withRpc(async (rpc) => {
    const small = await rpc.invoke('typesafe:classifyTask', { task: TASKS.function })
    const large = await rpc.invoke('typesafe:classifyTask', { task: TASKS.agent })
    assert.ok(
      large.plan.noul > small.plan.noul,
      `the open-ended task scored ${large.plan.noul} against ${small.plan.noul} for the rename`
    )
  })
})

test('ask returns a noul', { skip }, async () => {
  await withRpc(async (rpc) => {
    const { answers } = await rpc.invoke('typesafe:ask', {
      state: { pr: 'adds a retry loop around a third-party fetch' },
      questions: {
        risky: {
          type: 'noul',
          instructions: 'Could this change cause an outage if it is wrong?',
          criteria: {
            true: 'it sits on a hot path or can loop unbounded',
            false: 'contained, easily reverted',
          },
        },
      },
    })
    assert.equal(answers.risky?.type, 'noul')
    assert.ok(typeof answers.risky.noul === 'number')
  })
})
