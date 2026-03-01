import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('markdown addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('markdownToHtml converts headings', async () => {
    const result = await rpc.invoke('markdown:markdownToHtml', {
      markdown: '# Hello\n## World',
    })
    assert.ok(result.html.includes('<h1>Hello</h1>'))
    assert.ok(result.html.includes('<h2>World</h2>'))
  })

  await t.test('markdownToHtml converts bold and italic', async () => {
    const result = await rpc.invoke('markdown:markdownToHtml', {
      markdown: '**bold** and *italic*',
    })
    assert.ok(result.html.includes('<strong>bold</strong>'))
    assert.ok(result.html.includes('<em>italic</em>'))
  })

  await t.test('markdownToHtml converts links', async () => {
    const result = await rpc.invoke('markdown:markdownToHtml', {
      markdown: '[Example](https://example.com)',
    })
    assert.ok(result.html.includes('<a href="https://example.com">Example</a>'))
  })

  await t.test('markdownToHtml converts lists', async () => {
    const result = await rpc.invoke('markdown:markdownToHtml', {
      markdown: '- Item 1\n- Item 2\n- Item 3',
    })
    assert.ok(result.html.includes('<ul>'))
    assert.ok(result.html.includes('<li>Item 1</li>'))
    assert.ok(result.html.includes('<li>Item 2</li>'))
  })

  await t.test('markdownToHtml converts code blocks', async () => {
    const result = await rpc.invoke('markdown:markdownToHtml', {
      markdown: '```js\nconst x = 1\n```',
    })
    assert.ok(result.html.includes('<code'))
    assert.ok(result.html.includes('const x = 1'))
  })

  await t.test('markdownToHtml with GFM tables', async () => {
    const result = await rpc.invoke('markdown:markdownToHtml', {
      markdown: '| Name | Age |\n|------|-----|\n| Alice | 30 |',
      gfm: true,
    })
    assert.ok(result.html.includes('<table>'))
    assert.ok(result.html.includes('Alice'))
  })

  await t.test('markdownToHtml with breaks option', async () => {
    const result = await rpc.invoke('markdown:markdownToHtml', {
      markdown: 'Line 1\nLine 2',
      breaks: true,
    })
    assert.ok(result.html.includes('<br'))
  })

  await t.test('htmlToMarkdown converts headings', async () => {
    const result = await rpc.invoke('markdown:htmlToMarkdown', {
      html: '<h1>Title</h1><h2>Subtitle</h2>',
    })
    assert.ok(result.markdown.includes('# Title'))
    assert.ok(result.markdown.includes('## Subtitle'))
  })

  await t.test('htmlToMarkdown converts links', async () => {
    const result = await rpc.invoke('markdown:htmlToMarkdown', {
      html: '<a href="https://example.com">Example</a>',
    })
    assert.ok(result.markdown.includes('[Example]'))
    assert.ok(result.markdown.includes('https://example.com'))
  })

  await t.test('htmlToMarkdown converts bold and italic', async () => {
    const result = await rpc.invoke('markdown:htmlToMarkdown', {
      html: '<strong>Bold</strong> and <em>Italic</em>',
    })
    assert.ok(result.markdown.includes('**Bold**'))
    assert.ok(result.markdown.includes('_Italic_') || result.markdown.includes('*Italic*'))
  })

  await t.test('htmlToMarkdown converts lists', async () => {
    const result = await rpc.invoke('markdown:htmlToMarkdown', {
      html: '<ul><li>A</li><li>B</li></ul>',
    })
    assert.ok(result.markdown.includes('A'))
    assert.ok(result.markdown.includes('B'))
  })
})
