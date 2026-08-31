import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formEncode } from '@pikku/addon-stripe-commerce'

const decode = (encoded: string): string => decodeURIComponent(encoded).replace(/\+/g, ' ')

test('encodes flat values', () => {
  assert.equal(decode(formEncode({ mode: 'payment', quantity: 2 })), 'mode=payment&quantity=2')
})

test('encodes nested objects with bracket syntax', () => {
  assert.equal(
    decode(formEncode({ metadata: { stageId: 'stg_1', orderId: 'ord_2' } })),
    'metadata[stageId]=stg_1&metadata[orderId]=ord_2'
  )
})

test('encodes arrays with numeric indexes', () => {
  assert.equal(
    decode(formEncode({ line_items: [{ price: 'price_1', quantity: 1 }] })),
    'line_items[0][price]=price_1&line_items[0][quantity]=1'
  )
})

test('encodes deeply nested price_data the way Stripe expects', () => {
  assert.equal(
    decode(
      formEncode({
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              unit_amount: 500,
              product_data: { name: 'Plant pot' },
              recurring: { interval: 'month' },
            },
          },
        ],
      })
    ),
    'line_items[0][quantity]=1&line_items[0][price_data][currency]=usd&' +
      'line_items[0][price_data][unit_amount]=500&' +
      'line_items[0][price_data][product_data][name]=Plant pot&' +
      'line_items[0][price_data][recurring][interval]=month'
  )
})

test('omits null and undefined rather than sending the string "null"', () => {
  assert.equal(decode(formEncode({ a: 'kept', b: null, c: undefined })), 'a=kept')
})

test('keeps false, which is meaningful to Stripe', () => {
  assert.equal(decode(formEncode({ enabled: false })), 'enabled=false')
})

test('percent-encodes values that need it', () => {
  assert.equal(formEncode({ success_url: 'https://x.test/a?b=c' }), 'success_url=https%3A%2F%2Fx.test%2Fa%3Fb%3Dc')
})
