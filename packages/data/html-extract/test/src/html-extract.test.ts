import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

const sampleHtml = `
<html>
<head><title>Test Page</title></head>
<body>
  <h1 class="title">Hello World</h1>
  <div id="content">
    <p class="intro">Welcome to the <strong>test</strong> page.</p>
    <ul>
      <li class="item">Item 1</li>
      <li class="item">Item 2</li>
      <li class="item">Item 3</li>
    </ul>
    <a href="https://example.com" class="link">Visit Example</a>
    <input type="text" id="name" value="John Doe" />
    <div class="nested"><span class="keep">Keep this</span> <span class="skip">Skip this</span></div>
  </div>
</body>
</html>
`

test('html-extract addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('extracts text content', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: sampleHtml,
      extractions: [{ key: 'title', cssSelector: 'h1.title', returnValue: 'text' }],
    })
    assert.equal(result.data.title, 'Hello World')
  })

  await t.test('extracts inner HTML', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: sampleHtml,
      extractions: [{ key: 'intro', cssSelector: 'p.intro', returnValue: 'html' }],
    })
    assert.ok(result.data.intro.includes('<strong>test</strong>'))
  })

  await t.test('extracts attribute value', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: sampleHtml,
      extractions: [{ key: 'href', cssSelector: 'a.link', returnValue: 'attribute', attribute: 'href' }],
    })
    assert.equal(result.data.href, 'https://example.com')
  })

  await t.test('extracts input value', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: sampleHtml,
      extractions: [{ key: 'name', cssSelector: '#name', returnValue: 'value' }],
    })
    assert.equal(result.data.name, 'John Doe')
  })

  await t.test('returns array of matches', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: sampleHtml,
      extractions: [{ key: 'items', cssSelector: 'li.item', returnValue: 'text', returnArray: true }],
    })
    assert.deepEqual(result.data.items, ['Item 1', 'Item 2', 'Item 3'])
  })

  await t.test('trims whitespace when enabled', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: '<p>   spaced   </p>',
      extractions: [{ key: 'text', cssSelector: 'p', returnValue: 'text' }],
      trimValues: true,
    })
    assert.equal(result.data.text, 'spaced')
  })

  await t.test('cleans up whitespace when enabled', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: '<p>hello    world   test</p>',
      extractions: [{ key: 'text', cssSelector: 'p', returnValue: 'text' }],
      cleanUpText: true,
    })
    assert.equal(result.data.text, 'hello world test')
  })

  await t.test('skips selectors in extraction', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: sampleHtml,
      extractions: [{ key: 'text', cssSelector: '.nested', returnValue: 'text', skipSelectors: '.skip' }],
      trimValues: true,
    })
    assert.ok(result.data.text.includes('Keep this'))
    assert.ok(!result.data.text.includes('Skip this'))
  })

  await t.test('multiple extractions in one call', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: sampleHtml,
      extractions: [
        { key: 'title', cssSelector: 'h1', returnValue: 'text' },
        { key: 'link', cssSelector: 'a.link', returnValue: 'attribute', attribute: 'href' },
        { key: 'items', cssSelector: 'li.item', returnValue: 'text', returnArray: true },
      ],
    })
    assert.equal(result.data.title, 'Hello World')
    assert.equal(result.data.link, 'https://example.com')
    assert.equal(result.data.items.length, 3)
  })

  await t.test('returns empty string for non-matching selector', async () => {
    const result = await rpc.invoke('html-extract:htmlExtract', {
      html: sampleHtml,
      extractions: [{ key: 'missing', cssSelector: '.nonexistent', returnValue: 'text' }],
    })
    assert.equal(result.data.missing, '')
  })
})
