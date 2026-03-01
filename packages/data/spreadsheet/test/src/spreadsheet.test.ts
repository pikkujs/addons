import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('spreadsheet addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  // ── CSV ────────────────────────────────────────────────

  await test('csvToJson parses simple CSV', async () => {
    const result = await rpc.invoke('spreadsheet:csvToJson', {
      csv: 'name,age\nAlice,30\nBob,25',
    })
    assert.equal(result.data.length, 2)
    assert.equal(result.data[0].name, 'Alice')
    assert.equal(result.data[0].age, '30')
    assert.equal(result.data[1].name, 'Bob')
  })

  await test('csvToJson with custom delimiter', async () => {
    const result = await rpc.invoke('spreadsheet:csvToJson', {
      csv: 'name;age\nAlice;30',
      delimiter: ';',
    })
    assert.equal(result.data[0].name, 'Alice')
    assert.equal(result.data[0].age, '30')
  })

  await test('csvToJson without headers', async () => {
    const result = await rpc.invoke('spreadsheet:csvToJson', {
      csv: 'Alice,30\nBob,25',
      columns: false,
    })
    assert.ok(Array.isArray(result.data[0]))
    assert.equal(result.data[0][0], 'Alice')
  })

  await test('jsonToCsv converts objects to CSV', async () => {
    const result = await rpc.invoke('spreadsheet:jsonToCsv', {
      data: [
        { name: 'Alice', age: '30' },
        { name: 'Bob', age: '25' },
      ],
    })
    const lines = result.csv.split('\n')
    assert.equal(lines[0], 'name,age')
    assert.equal(lines[1], 'Alice,30')
    assert.equal(lines[2], 'Bob,25')
  })

  await test('jsonToCsv without header', async () => {
    const result = await rpc.invoke('spreadsheet:jsonToCsv', {
      data: [{ name: 'Alice', age: '30' }],
      includeHeader: false,
    })
    assert.ok(!result.csv.includes('name'))
    assert.equal(result.csv, 'Alice,30')
  })

  await test('jsonToCsv escapes fields with commas', async () => {
    const result = await rpc.invoke('spreadsheet:jsonToCsv', {
      data: [{ name: 'Smith, John', age: '30' }],
    })
    assert.ok(result.csv.includes('"Smith, John"'))
  })

  await test('CSV round-trip: JSON -> CSV -> JSON', async () => {
    const original = [
      { name: 'Alice', city: 'NYC' },
      { name: 'Bob', city: 'LA' },
    ]
    const toCsv = await rpc.invoke('spreadsheet:jsonToCsv', { data: original })
    const back = await rpc.invoke('spreadsheet:csvToJson', { csv: toCsv.csv })
    assert.deepEqual(back.data, original)
  })

  // ── XLSX ───────────────────────────────────────────────

  await test('XLSX round-trip: JSON -> XLSX -> JSON', async () => {
    const original = [
      { name: 'Alice', score: 95 },
      { name: 'Bob', score: 87 },
    ]
    const toXlsx = await rpc.invoke('spreadsheet:jsonToXlsx', {
      data: original,
      sheetName: 'Results',
    })
    assert.ok(toXlsx.base64.length > 0)

    const back = await rpc.invoke('spreadsheet:xlsxToJson', {
      base64: toXlsx.base64,
    })
    assert.equal(back.data.length, 2)
    assert.equal(back.data[0].name, 'Alice')
    assert.ok([95, '95'].includes(back.data[0].score))
    assert.ok(back.sheetNames.includes('Results'))
  })

  await test('xlsxToJson returns sheet names', async () => {
    const toXlsx = await rpc.invoke('spreadsheet:jsonToXlsx', {
      data: [{ a: 1 }],
      sheetName: 'MySheet',
    })
    const result = await rpc.invoke('spreadsheet:xlsxToJson', {
      base64: toXlsx.base64,
    })
    assert.deepEqual(result.sheetNames, ['MySheet'])
  })

  await test('jsonToXlsx with CSV format', async () => {
    const result = await rpc.invoke('spreadsheet:jsonToXlsx', {
      data: [{ name: 'Alice', age: 30 }],
      format: 'csv',
    })
    const text = Buffer.from(result.base64, 'base64').toString('utf-8')
    assert.ok(text.includes('name'))
    assert.ok(text.includes('Alice'))
  })
})
