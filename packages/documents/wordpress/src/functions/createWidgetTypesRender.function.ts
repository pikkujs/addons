import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateWidgetTypesRenderInput = z.object({
  id: z.string().describe("The widget type id."),
  instance: z.record(z.string(), z.unknown()).optional().describe("Current instance settings of the widget."),
})

export const createWidgetTypesRender = pikkuSessionlessFunc({
  input: CreateWidgetTypesRenderInput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/widget-types/{id}/render", data)
  },
})
