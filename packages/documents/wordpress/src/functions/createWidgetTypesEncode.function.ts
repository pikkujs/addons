import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateWidgetTypesEncodeInput = z.object({
  id: z.string().describe("The widget type id."),
  instance: z.record(z.string(), z.unknown()).optional().describe("Current instance settings of the widget."),
  form_data: z.string().optional().describe("Serialized widget form data to encode into instance settings."),
})

export const createWidgetTypesEncode = pikkuSessionlessFunc({
  input: CreateWidgetTypesEncodeInput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/widget-types/{id}/encode", data)
  },
})
