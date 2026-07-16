import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChartCreateInput = z.object({
  chart: z.string().describe("A Chart.js configuration object serialized as a JSON string"),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  format: z.string().optional(),
  backgroundColor: z.string().optional(),
  devicePixelRatio: z.number().int().optional(),
})

export const ChartCreateOutput = z.string()

export const chartCreate = pikkuSessionlessFunc({
  description: "Render a chart image from a Chart.js configuration",
  input: ChartCreateInput,
  output: ChartCreateOutput,
  func: async ({ quickchart }, data) => {
    return quickchart.call("GET", "/chart", data) as any
  },
})
