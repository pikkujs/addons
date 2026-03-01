import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('quickchart addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await test('generateChart returns a URL for a bar chart', async () => {
    const result = await rpc.invoke('quickchart:generateChart', {
      chartType: 'bar',
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{ data: [10, 20, 30], label: 'Sales' }],
    })
    assert.ok(result.url.startsWith('https://quickchart.io/chart?'))
    assert.ok(result.url.includes('bar'))
    assert.equal(result.config.type, 'bar')
  })

  await test('generateChart includes dimensions in URL', async () => {
    const result = await rpc.invoke('quickchart:generateChart', {
      chartType: 'line',
      labels: ['A', 'B'],
      datasets: [{ data: [1, 2] }],
      width: 800,
      height: 400,
    })
    assert.ok(result.url.includes('w=800'))
    assert.ok(result.url.includes('h=400'))
  })

  await test('generateChart supports format parameter', async () => {
    const result = await rpc.invoke('quickchart:generateChart', {
      chartType: 'pie',
      labels: ['Red', 'Blue'],
      datasets: [{ data: [60, 40] }],
      format: 'svg',
    })
    assert.ok(result.url.includes('f=svg'))
  })

  await test('generateChart config contains labels and datasets', async () => {
    const labels = ['Q1', 'Q2', 'Q3', 'Q4']
    const datasets = [
      { data: [100, 200, 150, 300], label: 'Revenue' },
      { data: [80, 150, 120, 250], label: 'Costs' },
    ]
    const result = await rpc.invoke('quickchart:generateChart', {
      chartType: 'bar',
      labels,
      datasets,
    })
    assert.deepEqual(result.config.data.labels, labels)
    assert.equal(result.config.data.datasets.length, 2)
  })

  await test('generateChart supports background color', async () => {
    const result = await rpc.invoke('quickchart:generateChart', {
      chartType: 'doughnut',
      labels: ['A', 'B', 'C'],
      datasets: [{ data: [1, 2, 3] }],
      backgroundColor: '#ffffff',
    })
    assert.ok(result.url.includes('bkg=%23ffffff'))
  })

  await test('generateChart URL is fetchable', async () => {
    const result = await rpc.invoke('quickchart:generateChart', {
      chartType: 'bar',
      labels: ['X', 'Y'],
      datasets: [{ data: [5, 10] }],
      width: 200,
      height: 200,
    })
    const response = await fetch(result.url)
    assert.equal(response.status, 200)
    assert.ok(response.headers.get('content-type')?.includes('image/png'))
  })
})
