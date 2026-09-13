import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { PostHogFlagMapper } from './posthog-flag-mapper.js'
import type { PostHogFlag } from './posthog-flag.types.js'

const map = (flags: PostHogFlag[], options = {}) =>
  new PostHogFlagMapper(options).toSnapshot(flags)

describe('PostHogFlagMapper', () => {
  test('maps active and the catch-all rollout', () => {
    const snapshot = map([
      {
        key: 'sandboxes',
        active: true,
        filters: { groups: [{ properties: [], rollout_percentage: 25 }] },
      },
    ])

    assert.deepEqual(snapshot['sandboxes'], {
      enabled: true,
      rolloutPercent: 25,
      overrides: {},
    })
  })

  test('a condition with no percentage is everyone', () => {
    const snapshot = map([
      { key: 'sandboxes', active: true, filters: { groups: [{}] } },
    ])
    assert.equal(snapshot['sandboxes']?.rolloutPercent, 100)
  })

  test('takes the widest catch-all, because conditions OR', () => {
    const snapshot = map([
      {
        key: 'sandboxes',
        active: true,
        filters: {
          groups: [
            { properties: [], rollout_percentage: 10 },
            { properties: [], rollout_percentage: 60 },
          ],
        },
      },
    ])
    assert.equal(snapshot['sandboxes']?.rolloutPercent, 60)
  })

  test('maps a group-key condition to overrides', () => {
    const snapshot = map([
      {
        key: 'sandboxes',
        active: true,
        filters: {
          aggregation_group_type_index: 0,
          groups: [
            {
              properties: [
                { key: '$group_key', operator: 'exact', value: ['org-1', 'org-2'] },
              ],
              rollout_percentage: 100,
            },
          ],
        },
      },
    ])

    assert.deepEqual(snapshot['sandboxes']?.overrides, {
      'org-1': true,
      'org-2': true,
    })
  })

  test('a targeted condition below 100% is not an override', () => {
    const snapshot = map([
      {
        key: 'sandboxes',
        active: true,
        filters: {
          aggregation_group_type_index: 0,
          groups: [
            {
              properties: [{ key: '$group_key', value: 'org-1' }],
              rollout_percentage: 50,
            },
          ],
        },
      },
    ])
    assert.deepEqual(snapshot['sandboxes']?.overrides, { 'org-1': false })
  })

  test('leaves an unmapped property filter alone', () => {
    const snapshot = map([
      {
        key: 'sandboxes',
        active: true,
        filters: {
          groups: [
            {
              properties: [
                { key: 'email', operator: 'icontains', value: '@example.com' },
              ],
              rollout_percentage: 100,
            },
          ],
        },
      },
    ])

    assert.deepEqual(snapshot['sandboxes'], {
      enabled: true,
      rolloutPercent: null,
      overrides: {},
    })
  })

  test('keyMap keys the snapshot by the pikku name', () => {
    const snapshot = map([{ key: 'ph-sandboxes', active: true }], {
      keyMap: { sandboxes: 'ph-sandboxes' },
    })

    assert.equal(snapshot['sandboxes']?.enabled, true)
    assert.equal(snapshot['ph-sandboxes'], undefined)
  })
})
