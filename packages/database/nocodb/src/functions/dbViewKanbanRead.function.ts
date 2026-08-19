import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewKanbanReadInput = z.object({
  kanbanViewId: z.string().describe("Unique Kanban View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewKanbanReadOutput = z.object({
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  fk_grp_col_id: z.union([z.string(), z.unknown()]).optional().describe("Grouping Field Column ID"),
  fk_view_id: z.string().min(0).max(20).optional().describe("View ID"),
  fk_cover_image_col_id: z.union([z.string(), z.unknown()]).optional().describe("Cover Image Column ID"),
  columns: z.array(z.object({
    id: z.string().min(0).max(20).optional().describe("Unique ID"),
    fk_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
    fk_view_id: z.string().min(0).max(20).optional().describe("Foreign Key to View"),
    source_id: z.string().min(0).max(20).optional().describe("Baes ID\n"),
    base_id: z.string().min(0).max(20).optional().describe("Base ID"),
    title: z.string().optional().describe("Base ID"),
    show: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this column shown?"),
    order: z.number().optional().describe("Column Order"),
  })).optional().describe("Kanban Columns"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta Info for Kanban"),
  title: z.string().optional().describe("Kanban Title"),
}).describe("Model for Kanban")

export const dbViewKanbanRead = pikkuSessionlessFunc({
  description: "Get the Kanban View data by Kanban ID",
  input: DbViewKanbanReadInput,
  output: DbViewKanbanReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/kanbans/{kanbanViewId}", data) as any
  },
})
