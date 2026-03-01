import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('xml addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await test('xmlToJson parses simple XML', async () => {
    const result = await rpc.invoke('xml:xmlToJson', {
      xml: '<root><name>hello</name><value>42</value></root>',
    })
    // explicitRoot=false strips the root element
    assert.equal(result.data.name, 'hello')
    assert.equal(result.data.value, '42')
  })

  await test('xmlToJson parses XML with attributes (mergeAttrs=true)', async () => {
    const result = await rpc.invoke('xml:xmlToJson', {
      xml: '<item id="1" type="test"><name>foo</name></item>',
    })
    // mergeAttrs=true merges attributes into the parent, explicitRoot=false strips root
    assert.equal(result.data.id, '1')
    assert.equal(result.data.type, 'test')
    assert.equal(result.data.name, 'foo')
  })

  await test('xmlToJson with explicitArray', async () => {
    const result = await rpc.invoke('xml:xmlToJson', {
      xml: '<root><item>a</item><item>b</item></root>',
      explicitArray: true,
    })
    assert.ok(Array.isArray(result.data.item))
    assert.equal(result.data.item.length, 2)
  })

  await test('xmlToJson with ignoreAttrs', async () => {
    const result = await rpc.invoke('xml:xmlToJson', {
      xml: '<item id="1"><name>foo</name></item>',
      ignoreAttrs: true,
    })
    assert.equal(result.data.id, undefined)
    assert.equal(result.data.name, 'foo')
  })

  await test('xmlToJson with explicitRoot', async () => {
    const result = await rpc.invoke('xml:xmlToJson', {
      xml: '<root><name>hello</name></root>',
      explicitRoot: true,
    })
    assert.ok(result.data.root)
    assert.equal(result.data.root.name, 'hello')
  })

  await test('xmlToJson nested elements', async () => {
    const result = await rpc.invoke('xml:xmlToJson', {
      xml: '<root><person><name>Alice</name><age>30</age></person></root>',
    })
    assert.equal(result.data.person.name, 'Alice')
    assert.equal(result.data.person.age, '30')
  })

  await test('jsonToXml converts simple object', async () => {
    const result = await rpc.invoke('xml:jsonToXml', {
      data: { name: 'hello', value: '42' },
      rootName: 'item',
    })
    assert.ok(result.xml.includes('<item>'))
    assert.ok(result.xml.includes('<name>hello</name>'))
    assert.ok(result.xml.includes('<value>42</value>'))
  })

  await test('jsonToXml with custom rootName', async () => {
    const result = await rpc.invoke('xml:jsonToXml', {
      data: { name: 'test' },
      rootName: 'record',
    })
    assert.ok(result.xml.includes('<record>'))
    assert.ok(result.xml.includes('</record>'))
  })

  await test('jsonToXml with headless option', async () => {
    const result = await rpc.invoke('xml:jsonToXml', {
      data: { name: 'test' },
      rootName: 'doc',
      headless: true,
    })
    assert.ok(!result.xml.includes('<?xml'))
    assert.ok(result.xml.includes('<doc>'))
  })

  await test('jsonToXml includes XML header by default', async () => {
    const result = await rpc.invoke('xml:jsonToXml', {
      data: { name: 'test' },
      rootName: 'root',
    })
    assert.ok(result.xml.includes('<?xml'))
  })

  await test('round-trip: JSON -> XML -> JSON', async () => {
    const original = { name: 'round-trip', count: '3' }
    const toXml = await rpc.invoke('xml:jsonToXml', { data: original, rootName: 'data' })
    const backToJson = await rpc.invoke('xml:xmlToJson', { xml: toXml.xml })
    assert.deepEqual(backToJson.data, original)
  })
})
