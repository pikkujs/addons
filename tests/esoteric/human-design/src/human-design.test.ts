import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('human-design addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  const birthDateUtc = '1987-04-17T10:25:00.000Z'

  await test('getBodygraph returns a valid bodygraph', async () => {
    const result = await rpc.invoke('humanDesign:getBodygraph', { birthDateUtc })
    assert.ok(result.auraType, 'Expected auraType to be defined')
    assert.ok(
      ['Generator', 'Manifesting Generator', 'Projector', 'Manifestor', 'Reflector'].includes(result.auraType!),
      `Expected auraType to be a valid type, got: "${result.auraType}"`
    )
  })

  await test('getBodygraph returns profile', async () => {
    const result = await rpc.invoke('humanDesign:getBodygraph', { birthDateUtc })
    assert.ok(result.profile, 'Expected profile to be defined')
    assert.match(result.profile!, /^\d\/\d$/, `Expected profile format "X/Y", got: "${result.profile}"`)
  })

  await test('getBodygraph returns gates and channels', async () => {
    const result = await rpc.invoke('humanDesign:getBodygraph', { birthDateUtc })
    assert.ok(Array.isArray(result.gates), 'Expected gates to be an array')
    assert.ok(result.gates.length > 0, 'Expected at least one gate')
    assert.ok(Array.isArray(result.channels), 'Expected channels to be an array')
  })

  await test('getBodygraph returns centers', async () => {
    const result = await rpc.invoke('humanDesign:getBodygraph', { birthDateUtc })
    assert.ok(result.centers, 'Expected centers to be defined')
    assert.ok(typeof result.centers.head === 'boolean', 'Expected centers.head to be boolean')
    assert.ok(typeof result.centers.sacral === 'boolean', 'Expected centers.sacral to be boolean')
    assert.ok(typeof result.centers.root === 'boolean', 'Expected centers.root to be boolean')
  })

  await test('getBodygraph returns activations', async () => {
    const result = await rpc.invoke('humanDesign:getBodygraph', { birthDateUtc })
    assert.ok(result.activations, 'Expected activations to be defined')
    assert.ok(result.activations.personality, 'Expected personality activations')
    assert.ok(result.activations.design, 'Expected design activations')
    assert.ok(result.activations.personality.sun, 'Expected personality sun activation')
    assert.ok(typeof result.activations.personality.sun.gate === 'number', 'Expected sun gate to be a number')
    assert.ok(typeof result.activations.personality.sun.line === 'number', 'Expected sun line to be a number')
  })

  await test('getBodygraph returns incarnation cross', async () => {
    const result = await rpc.invoke('humanDesign:getBodygraph', { birthDateUtc })
    assert.ok(result.incarnationCross, 'Expected incarnationCross to be defined')
    assert.ok(
      result.incarnationCross!.includes('Cross of'),
      `Expected incarnationCross to contain "Cross of", got: "${result.incarnationCross}"`
    )
  })

  await test('getBodygraph returns notSelfTheme', async () => {
    const result = await rpc.invoke('humanDesign:getBodygraph', { birthDateUtc })
    assert.ok(result.notSelfTheme, 'Expected notSelfTheme to be defined')
    assert.ok(
      ['Frustration', 'Frustration and Anger', 'Bitterness', 'Anger', 'Disappointment'].includes(result.notSelfTheme),
      `Expected valid notSelfTheme, got: "${result.notSelfTheme}"`
    )
  })

  const transitDateUtc = '2025-01-15T12:00:00.000Z'

  await test('getTransitChart returns transit data', async () => {
    const result = await rpc.invoke('humanDesign:getTransitChart', { birthDateUtc, transitDateUtc })
    assert.ok(result.activations, 'Expected activations to be defined')
    assert.ok(result.activations.personality, 'Expected personality activations')
    assert.ok(result.activations.design, 'Expected design activations')
    assert.ok(result.activations.transit, 'Expected transit activations')
  })

  await test('getTransitChart returns transit centers', async () => {
    const result = await rpc.invoke('humanDesign:getTransitChart', { birthDateUtc, transitDateUtc })
    assert.ok(result.centers, 'Expected centers to be defined')
    const firstCenter = Object.values(result.centers)[0]
    assert.ok(typeof firstCenter.natal === 'boolean', 'Expected center.natal to be boolean')
    assert.ok(typeof firstCenter.transit === 'boolean', 'Expected center.transit to be boolean')
  })

  await test('getTransitChart returns channels', async () => {
    const result = await rpc.invoke('humanDesign:getTransitChart', { birthDateUtc, transitDateUtc })
    assert.ok(result.channels, 'Expected channels to be defined')
    assert.ok(Array.isArray(result.channels.natal), 'Expected channels.natal to be an array')
    assert.ok(typeof result.channels.transit === 'object', 'Expected channels.transit to be an object')
  })

  await test('getTransitChart returns gates', async () => {
    const result = await rpc.invoke('humanDesign:getTransitChart', { birthDateUtc, transitDateUtc })
    assert.ok(result.gates, 'Expected gates to be defined')
    const gateKeys = Object.keys(result.gates)
    assert.ok(gateKeys.length > 0, 'Expected at least one gate entry')
  })
})
