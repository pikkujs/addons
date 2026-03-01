import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GenerateChartInput = z.object({
  chartType: z.enum(['bar', 'line', 'pie', 'doughnut', 'polarArea', 'radar', 'scatter', 'bubble']).describe('Type of chart'),
  labels: z.array(z.string()).describe('Labels for the chart axis'),
  datasets: z.array(z.object({
    label: z.string().optional().describe('Legend label for this dataset'),
    data: z.array(z.number()).describe('Data values'),
    backgroundColor: z.union([z.string(), z.array(z.string())]).optional().describe('Background color(s)'),
    borderColor: z.union([z.string(), z.array(z.string())]).optional().describe('Border color(s)'),
    fill: z.boolean().optional().describe('Fill area under line'),
  })).describe('Datasets to plot'),
  width: z.number().optional().describe('Image width in pixels'),
  height: z.number().optional().describe('Image height in pixels'),
  format: z.enum(['png', 'svg', 'webp', 'pdf']).optional().describe('Output format'),
  backgroundColor: z.string().optional().describe('Chart background color'),
  devicePixelRatio: z.number().optional().describe('Device pixel ratio (1 or 2)'),
})

export const GenerateChartOutput = z.object({
  url: z.string().describe('URL to the generated chart image'),
  config: z.any().describe('The Chart.js configuration that was used'),
})

export const generateChart = pikkuSessionlessFunc({
  description: 'Generate a chart image via QuickChart.io',
  input: GenerateChartInput,
  output: GenerateChartOutput,
  node: { displayName: 'Generate Chart', category: 'Chart', type: 'action' },
  func: async (_services, { chartType, labels, datasets, width, height, format, backgroundColor, devicePixelRatio }) => {
    const config = {
      type: chartType,
      data: { labels, datasets },
    }

    const params = new URLSearchParams({
      c: JSON.stringify(config),
    })

    if (width) params.set('w', String(width))
    if (height) params.set('h', String(height))
    if (format) params.set('f', format)
    if (backgroundColor) params.set('bkg', backgroundColor)
    if (devicePixelRatio) params.set('devicePixelRatio', String(devicePixelRatio))

    const url = `https://quickchart.io/chart?${params.toString()}`

    return { url, config }
  },
})
