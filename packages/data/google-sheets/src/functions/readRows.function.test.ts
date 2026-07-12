import { describe, test } from 'node:test'
import assert from 'node:assert/strict'

import { readRows } from './readRows.function.js'

const call = (services: any, data: any) => (readRows as any).func(services, data)

describe('google-sheets readRows', () => {
  test('maps the header row over each data row into keyed objects', async () => {
    let received: any = null
    const services = {
      googleSheets: {
        call: async (_method: string, _path: string, data: any) => {
          received = data
          return {
            range: 'Sheet1!A1:C3',
            majorDimension: 'ROWS',
            values: [
              ['URL VIDEO', 'DESCRIPTION', 'STATUS'],
              ['a.mp4', 'first', 'ready'],
              ['b.mp4', 'second', 'ready'],
            ],
          }
        },
      },
    }

    const rows = await call(services, {
      spreadsheetId: 'sheet-1',
      range: 'Sheet1!A:C',
    })

    assert.equal(received.majorDimension, 'ROWS')
    assert.deepEqual(rows, [
      { 'URL VIDEO': 'a.mp4', DESCRIPTION: 'first', STATUS: 'ready' },
      { 'URL VIDEO': 'b.mp4', DESCRIPTION: 'second', STATUS: 'ready' },
    ])
  })

  test('returns [] when the sheet is empty', async () => {
    const services = {
      googleSheets: { call: async () => ({ values: [] }) },
    }
    assert.deepEqual(await call(services, { spreadsheetId: 's', range: 'A:A' }), [])
  })

  test('returns [] for a header-only range', async () => {
    const services = {
      googleSheets: { call: async () => ({ values: [['a', 'b']] }) },
    }
    assert.deepEqual(await call(services, { spreadsheetId: 's', range: 'A:B' }), [])
  })
})
