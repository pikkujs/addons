import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowWorkspaceInput = z.object({
  workspace_id: z.number().int().describe("The id of the workspace. Example: 3133"),
})

export const ShowWorkspaceOutput = z.object({
  workspace: z.object({
    activated: z.boolean().optional().describe("If true, this workspace is available for use"),
    apps: z.array(z.record(z.string(), z.unknown())).optional().describe("The apps associated to this workspace"),
    conditions: z.object({
      all: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.string().optional().describe("The value of a ticket field"),
      })).optional().describe("Logical AND. Tickets must fulfill all of the conditions to be considered matching"),
      any: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.string().optional().describe("The value of a ticket field"),
      })).optional().describe("Logical OR. Tickets may satisfy any of the conditions to be considered matching"),
    }).optional().describe("An object that describes the conditions under which the automation will execute. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)"),
    created_at: z.string().datetime().optional().describe("The time the workspace was created"),
    description: z.string().optional().describe("User-defined description of this workspace's purpose"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    macro_ids: z.array(z.number().int()).optional().describe("The ids of the macros associated to this workspace"),
    macros: z.array(z.number().int()).optional().describe("The ids of the macros associated to this workspace"),
    position: z.number().int().optional().describe("Ordering of the workspace relative to other workspaces"),
    prefer_workspace_app_order: z.boolean().optional().describe("If true, the order of apps within the workspace will be preserved"),
    selected_macros: z.array(z.object({
      actions: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field to modify"),
        value: z.string().optional().describe("The new value of the field"),
      })).describe("Each action describes what the macro will do. See [Actions reference](/documentation/ticketing/reference-guides/actions-reference)"),
      active: z.boolean().optional().describe("Useful for determining if the macro should be displayed"),
      created_at: z.string().datetime().optional().describe("The time the macro was created"),
      default: z.boolean().optional().describe("If true, the macro is a default macro"),
      description: z.string().nullable().optional().describe("The description of the macro"),
      id: z.number().int().optional().describe("The id automatically assigned when a macro is created"),
      position: z.number().int().optional().describe("The position of the macro"),
      raw_title: z.string().optional().describe("The raw format of the title of the macro"),
      restriction: z.record(z.string(), z.unknown()).nullable().optional().describe("Access to this macro. A null value allows unrestricted access for all users in the account"),
      title: z.string().describe("The title of the macro"),
      updated_at: z.string().datetime().optional().describe("The time of the last update of the macro"),
      url: z.string().optional().describe("A URL to access the macro's details"),
      app_installation: z.string().nullable().optional().describe("The app installation that requires each macro, if present"),
      categories: z.string().nullable().optional().describe("The macro categories"),
      permissions: z.string().nullable().optional().describe("Permissions for each macro"),
      usage_1h: z.number().int().optional().describe("The number of times each macro has been used in the past hour"),
      usage_7d: z.number().int().optional().describe("The number of times each macro has been used in the past week"),
      usage_24h: z.number().int().optional().describe("The number of times each macro has been used in the past day"),
      usage_30d: z.number().int().optional().describe("The number of times each macro has been used in the past thirty days"),
    })).optional().describe("An array of the macro objects that will be used in this workspace. See [Macros](/api-reference/ticketing/business-rules/macros/)"),
    ticket_form_id: z.number().int().optional().describe("The id of the ticket web form associated to this workspace"),
    title: z.string().optional().describe("The title of the workspace"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the workspace"),
    url: z.string().optional().describe("The URL for this resource"),
  }).optional(),
})

export const showWorkspace = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins",
  input: ShowWorkspaceInput,
  output: ShowWorkspaceOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/workspaces/{workspace_id}", data) as any
  },
})
