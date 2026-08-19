import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetWidgetTypeInput = z.object({
  id: z.string().describe("The widget type id."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const GetWidgetTypeOutput = z.object({
  id: z.string().optional().describe("Unique slug identifying the widget type."),
  name: z.string().optional().default("").describe("Human-readable name identifying the widget type."),
  description: z.string().optional().default("").describe("Description of the widget."),
  is_multi: z.boolean().optional().describe("Whether the widget supports multiple instances"),
  classname: z.string().optional().default("").describe("Class name"),
})

export const getWidgetType = pikkuSessionlessFunc({
  input: GetWidgetTypeInput,
  output: GetWidgetTypeOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/widget-types/{id}", data) as any
  },
})
