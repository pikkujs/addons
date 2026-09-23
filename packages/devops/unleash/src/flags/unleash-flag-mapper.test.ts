import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { UnleashFlagMapper } from './unleash-flag-mapper.js'
import type { UnleashFeature } from './unleash-flag.types.js'

const map = (features: UnleashFeature[], options = {}) =>
  new UnleashFlagMapper(options).toSnapshot(features)

describe('UnleashFlagMapper', () => {
  test('a feature with no strategies is its toggle', () => {
    assert.deepEqual(map([{ name: 'sandboxes', enabled: true }])['sandboxes'], {
      enabled: true,
      rolloutPercent: null,
      overrides: {},
    })
  })

  test('maps flexibleRollout to a percentage', () => {
    const snapshot = map([
      {
        name: 'sandboxes',
        enabled: true,
        strategies: [
          { name: 'flexibleRollout', parameters: { rollout: '30' } },
        ],
      },
    ])
    assert.equal(snapshot['sandboxes']?.rolloutPercent, 30)
  })

  test('maps userWithId to overrides', () => {
    const snapshot = map([
      {
        name: 'sandboxes',
        enabled: true,
        strategies: [
          { name: 'userWithId', parameters: { userIds: 'org-1, org-2' } },
        ],
      },
    ])
    assert.deepEqual(snapshot['sandboxes']?.overrides, {
      'org-1': true,
      'org-2': true,
    })
  })

  test('takes the widest rollout, because strategies OR', () => {
    const snapshot = map([
      {
        name: 'sandboxes',
        enabled: true,
        strategies: [
          { name: 'flexibleRollout', parameters: { rollout: '10' } },
          { name: 'gradualRolloutUserId', parameters: { percentage: '70' } },
        ],
      },
    ])
    assert.equal(snapshot['sandboxes']?.rolloutPercent, 70)
  })

  test('the default strategy removes the rollout constraint', () => {
    const snapshot = map([
      {
        name: 'sandboxes',
        enabled: true,
        strategies: [
          { name: 'flexibleRollout', parameters: { rollout: '10' } },
          { name: 'default' },
        ],
      },
    ])
    assert.equal(snapshot['sandboxes']?.rolloutPercent, null)
  })

  test('an unmapped strategy is ignored, never guessed at', () => {
    const snapshot = map([
      {
        name: 'sandboxes',
        enabled: true,
        strategies: [
          { name: 'remoteAddress', parameters: { IPs: '10.0.0.1' } },
        ],
      },
    ])
    assert.deepEqual(snapshot['sandboxes'], {
      enabled: true,
      rolloutPercent: null,
      overrides: {},
    })
  })

  test('a disabled feature is off whatever its strategies say', () => {
    const snapshot = map([
      {
        name: 'sandboxes',
        enabled: false,
        strategies: [{ name: 'default' }],
      },
    ])
    assert.equal(snapshot['sandboxes']?.enabled, false)
  })

  test('keyMap keys the snapshot by the pikku name', () => {
    const snapshot = map([{ name: 'ul-sandboxes', enabled: true }], {
      keyMap: { sandboxes: 'ul-sandboxes' },
    })
    assert.equal(snapshot['sandboxes']?.enabled, true)
    assert.equal(snapshot['ul-sandboxes'], undefined)
  })
})
