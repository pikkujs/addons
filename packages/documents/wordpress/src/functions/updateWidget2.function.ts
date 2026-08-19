import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateWidget2Input = z.object({
  id: z.string().describe("Unique identifier for the widget."),
  id_base: z.string().optional().describe("The type of the widget. Corresponds to ID in widget-types endpoint."),
  sidebar: z.string().optional().describe("The sidebar the widget belongs to."),
  instance: z.object({
  encoded: z.string().optional().describe("Base64 encoded representation of the instance settings."),
  hash: z.string().optional().describe("Cryptographic hash of the instance settings."),
  raw: z.record(z.string(), z.unknown()).optional().describe("Unencoded instance settings, if supported."),
}).optional().describe("Instance settings of the widget, if supported."),
  form_data: z.string().optional().describe("URL-encoded form data from the widget admin form. Used to update a widget that does not support instance. Write only."),
})

export const UpdateWidget2Output = z.object({
  id: z.string().optional().describe("Unique identifier for the widget."),
  id_base: z.string().optional().describe("The type of the widget. Corresponds to ID in widget-types endpoint."),
  sidebar: z.string().optional().default("wp_inactive_widgets").describe("The sidebar the widget belongs to."),
  rendered: z.string().optional().describe("HTML representation of the widget."),
  rendered_form: z.string().optional().describe("HTML representation of the widget admin form."),
  instance: z.object({
    encoded: z.string().optional().describe("Base64 encoded representation of the instance settings."),
    hash: z.string().optional().describe("Cryptographic hash of the instance settings."),
    raw: z.record(z.string(), z.unknown()).optional().describe("Unencoded instance settings, if supported."),
  }).optional().describe("Instance settings of the widget, if supported."),
  form_data: z.string().optional().describe("URL-encoded form data from the widget admin form. Used to update a widget that does not support instance. Write only."),
})

export const updateWidget2 = pikkuSessionlessFunc({
  input: UpdateWidget2Input,
  output: UpdateWidget2Output,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PATCH", "/widgets/{id}", data) as any
  },
})
