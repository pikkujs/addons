import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateSidebarInput = z.object({
  id: z.string(),
  widgets: z.array(z.union([z.record(z.string(), z.unknown()), z.string()])).optional().describe("Nested widgets."),
})

export const CreateSidebarOutput = z.object({
  id: z.string().optional().describe("ID of sidebar."),
  name: z.string().optional().describe("Unique name identifying the sidebar."),
  description: z.string().optional().describe("Description of sidebar."),
  class: z.string().optional().describe("Extra CSS class to assign to the sidebar in the Widgets interface."),
  before_widget: z.string().optional().default("").describe("HTML content to prepend to each widget's HTML output when assigned to this sidebar. Default is an opening list item element."),
  after_widget: z.string().optional().default("").describe("HTML content to append to each widget's HTML output when assigned to this sidebar. Default is a closing list item element."),
  before_title: z.string().optional().default("").describe("HTML content to prepend to the sidebar title when displayed. Default is an opening h2 element."),
  after_title: z.string().optional().default("").describe("HTML content to append to the sidebar title when displayed. Default is a closing h2 element."),
  status: z.enum(["active", "inactive"]).optional().describe("Status of sidebar."),
  widgets: z.array(z.union([z.record(z.string(), z.unknown()), z.string()])).optional().default([]).describe("Nested widgets."),
})

export const createSidebar = pikkuSessionlessFunc({
  input: CreateSidebarInput,
  output: CreateSidebarOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/sidebars/{id}", data) as any
  },
})
