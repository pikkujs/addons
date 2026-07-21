import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateWidgetsInput = z.object({
  id: z.string().optional().describe("Unique identifier for the widget."),
  id_base: z.string().optional().describe("The type of the widget. Corresponds to ID in widget-types endpoint."),
  sidebar: z.string().default("wp_inactive_widgets").describe("The sidebar the widget belongs to."),
  instance: z.object({
  encoded: z.string().optional().describe("Base64 encoded representation of the instance settings."),
  hash: z.string().optional().describe("Cryptographic hash of the instance settings."),
  raw: z.record(z.string(), z.unknown()).optional().describe("Unencoded instance settings, if supported."),
}).optional().describe("Instance settings of the widget, if supported."),
  form_data: z.string().optional().describe("URL-encoded form data from the widget admin form. Used to update a widget that does not support instance. Write only."),
})

export const CreateWidgetsOutput = z.object({
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

export const createWidgets = pikkuSessionlessFunc({
  input: CreateWidgetsInput,
  output: CreateWidgetsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/widgets", data) as any
  },
})
