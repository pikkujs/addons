import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('math addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await test('evaluate handles arithmetic', async () => {
    const result = await rpc.invoke('math:evaluate', {
      expression: 'sqrt(3^2 + 4^2)',
    })
    assert.equal(result.result, '5')
    assert.equal(result.numeric, 5)
  })

  await test('evaluate resolves named-variable scopes', async () => {
    const result = await rpc.invoke('math:evaluate', {
      expression: '2 * x + 1',
      scope: { x: 10 },
    })
    assert.equal(result.numeric, 21)
  })

  await test('evaluate returns a null numeric for unit results', async () => {
    const result = await rpc.invoke('math:evaluate', {
      expression: '12 cm to inch',
    })
    assert.match(result.result, /inch/)
    assert.equal(result.numeric, null)
  })

  await test('derivative differentiates symbolically', async () => {
    const result = await rpc.invoke('math:derivative', {
      expression: '2x^2 + 3x + 1',
      variable: 'x',
    })
    assert.match(result.result.replace(/\s/g, ''), /4\*x\+3/)
  })

  await test('simplify collapses like terms', async () => {
    const result = await rpc.invoke('math:simplify', {
      expression: '2x + 3x',
    })
    assert.match(result.result.replace(/\s/g, ''), /5\*x/)
  })
})
