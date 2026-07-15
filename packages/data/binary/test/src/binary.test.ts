import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('binary addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  const b64 = (s: string) => Buffer.from(s, 'utf8').toString('base64')

  await test('extractText decodes base64 bytes to text', async () => {
    const result = await rpc.invoke('binary:extractText', {
      base64: b64('hello world'),
    })
    assert.equal(result.text, 'hello world')
  })

  await test('extractJson parses base64 JSON bytes', async () => {
    const result = await rpc.invoke('binary:extractJson', {
      base64: b64('{"a":1,"b":[2,3]}'),
    })
    assert.deepEqual(result.data, { a: 1, b: [2, 3] })
  })

  await test('toTextFile encodes text to base64 bytes', async () => {
    const result = await rpc.invoke('binary:toTextFile', { text: 'hello world' })
    assert.equal(Buffer.from(result.base64, 'base64').toString('utf8'), 'hello world')
  })

  await test('toJsonFile serializes a value to base64 bytes', async () => {
    const result = await rpc.invoke('binary:toJsonFile', { data: { a: 1 } })
    assert.equal(Buffer.from(result.base64, 'base64').toString('utf8'), '{"a":1}')
  })

  await test('toJsonFile pretty-prints when requested', async () => {
    const result = await rpc.invoke('binary:toJsonFile', {
      data: { a: 1 },
      pretty: true,
    })
    assert.equal(
      Buffer.from(result.base64, 'base64').toString('utf8'),
      '{\n  "a": 1\n}'
    )
  })

  await test('text round-trip: toTextFile -> extractText', async () => {
    const enc = await rpc.invoke('binary:toTextFile', { text: 'café ☕' })
    const dec = await rpc.invoke('binary:extractText', { base64: enc.base64 })
    assert.equal(dec.text, 'café ☕')
  })

  await test('json round-trip: toJsonFile -> extractJson', async () => {
    const original = { name: 'Alice', tags: ['a', 'b'], n: 42 }
    const enc = await rpc.invoke('binary:toJsonFile', { data: original })
    const dec = await rpc.invoke('binary:extractJson', { base64: enc.base64 })
    assert.deepEqual(dec.data, original)
  })

  await test('moveBinaryData jsonToBinary encodes JSON', async () => {
    const result = await rpc.invoke('binary:moveBinaryData', {
      mode: 'jsonToBinary',
      data: { a: 1 },
    })
    assert.equal(Buffer.from(result.base64!, 'base64').toString('utf8'), '{"a":1}')
  })

  await test('moveBinaryData binaryToJson parses JSON', async () => {
    const result = await rpc.invoke('binary:moveBinaryData', {
      mode: 'binaryToJson',
      base64: b64('{"x":true}'),
    })
    assert.deepEqual(result.data, { x: true })
  })

  await test('moveBinaryData binaryToJson keepAsString keeps raw text', async () => {
    const result = await rpc.invoke('binary:moveBinaryData', {
      mode: 'binaryToJson',
      base64: b64('{"x":true}'),
      keepAsString: true,
    })
    assert.equal(result.data, '{"x":true}')
  })

  await test('moveBinaryData binaryToJson falls back to text on invalid JSON', async () => {
    const result = await rpc.invoke('binary:moveBinaryData', {
      mode: 'binaryToJson',
      base64: b64('not json'),
    })
    assert.equal(result.data, 'not json')
  })
})
