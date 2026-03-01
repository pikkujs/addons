import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('html addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('htmlToText converts simple HTML', async () => {
    const result = await rpc.invoke('html:htmlToText', {
      html: '<h1>Hello</h1><p>This is a <strong>test</strong> paragraph.</p>',
    })
    assert.ok(result.text.toLowerCase().includes('hello'))
    assert.ok(result.text.includes('test'))
    assert.ok(result.text.includes('paragraph'))
  })

  await t.test('htmlToText strips tags', async () => {
    const result = await rpc.invoke('html:htmlToText', {
      html: '<div><a href="https://example.com">Click here</a></div>',
    })
    assert.ok(result.text.includes('Click here'))
    assert.ok(!result.text.includes('<a'))
  })

  await t.test('htmlToText handles lists', async () => {
    const result = await rpc.invoke('html:htmlToText', {
      html: '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
    })
    assert.ok(result.text.includes('Item 1'))
    assert.ok(result.text.includes('Item 2'))
    assert.ok(result.text.includes('Item 3'))
  })

  await t.test('htmlToMarkdown converts headings', async () => {
    const result = await rpc.invoke('html:htmlToMarkdown', {
      html: '<h1>Title</h1><h2>Subtitle</h2><p>Body text</p>',
    })
    assert.ok(result.markdown.includes('# Title'))
    assert.ok(result.markdown.includes('## Subtitle'))
    assert.ok(result.markdown.includes('Body text'))
  })

  await t.test('htmlToMarkdown converts links', async () => {
    const result = await rpc.invoke('html:htmlToMarkdown', {
      html: '<a href="https://example.com">Example</a>',
    })
    assert.ok(result.markdown.includes('[Example]'))
    assert.ok(result.markdown.includes('https://example.com'))
  })

  await t.test('htmlToMarkdown converts bold and italic', async () => {
    const result = await rpc.invoke('html:htmlToMarkdown', {
      html: '<strong>Bold</strong> and <em>Italic</em>',
    })
    assert.ok(result.markdown.includes('**Bold**'))
    assert.ok(result.markdown.includes('_Italic_') || result.markdown.includes('*Italic*'))
  })

  await t.test('htmlToTable generates table from data', async () => {
    const result = await rpc.invoke('html:htmlToTable', {
      data: [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ],
    })
    assert.ok(result.html.includes('<table'))
    assert.ok(result.html.includes('<th'))
    assert.ok(result.html.includes('Alice'))
    assert.ok(result.html.includes('Bob'))
    assert.ok(result.html.includes('30'))
    assert.ok(result.html.includes('25'))
  })

  await t.test('htmlToTable capitalizes headers', async () => {
    const result = await rpc.invoke('html:htmlToTable', {
      data: [{ name: 'Alice' }],
      capitalize: true,
    })
    assert.ok(result.html.includes('Name'))
  })

  await t.test('htmlToTable adds caption', async () => {
    const result = await rpc.invoke('html:htmlToTable', {
      data: [{ x: 1 }],
      caption: 'My Table',
    })
    assert.ok(result.html.includes('<caption>My Table</caption>'))
  })

  await t.test('htmlToTable handles empty data', async () => {
    const result = await rpc.invoke('html:htmlToTable', {
      data: [],
    })
    assert.ok(result.html.includes('<table'))
    assert.ok(result.html.includes('</table>'))
  })

  await t.test('htmlToTable escapes HTML in values', async () => {
    const result = await rpc.invoke('html:htmlToTable', {
      data: [{ text: '<script>alert("xss")</script>' }],
    })
    assert.ok(!result.html.includes('<script>'))
    assert.ok(result.html.includes('&lt;script&gt;'))
  })
})
