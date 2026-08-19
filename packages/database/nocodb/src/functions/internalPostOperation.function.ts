import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InternalPostOperationInput = z.object({
  workspaceId: z.string(),
  baseId: z.string(),
  operation: z.string().describe("Operation to trigger"),
  fk_model_id: z.string().optional().describe("Model ID"),
  row_id: z.string().optional().describe("Row ID"),
  workflowId: z.string().optional().describe("Workflow ID"),
  cursor: z.string().optional().describe("Cursor"),
  tableId: z.string().optional().describe("Table Id"),
  mcpTokenId: z.string().optional().describe("MCP Token Id"),
  viewId: z.string().optional().describe("View Id"),
  formViewId: z.string().optional().describe("Form View Id"),
  gridViewId: z.string().optional().describe("Grid View Id"),
  kanbanViewId: z.string().optional().describe("Kanban View Id"),
  galleryViewId: z.string().optional().describe("Gallery View Id"),
  calendarViewId: z.string().optional().describe("Calendar View Id"),
  publicDataUuid: z.string().optional().describe("Public Data UUID"),
  sharedViewUuid: z.string().optional().describe("Shared View UUID"),
  sharedBaseUuid: z.string().optional().describe("Shared Base UUID"),
  sharedDashboardUuid: z.string().optional().describe("Shared Dashboard UUID"),
  hookId: z.string().optional().describe("Hook Id"),
  rowColorConditionId: z.string().optional().describe("Row Color Condition Id"),
  gridViewColumnId: z.string().optional().describe("Grid View Column Id"),
  formViewColumnId: z.string().optional().describe("Form View Column Id"),
  galleryViewColumnId: z.string().optional().describe("Gallery View Column Id"),
  columnId: z.string().optional().describe("Column Id"),
  filterId: z.string().optional().describe("Filter Id"),
  filterParentId: z.string().optional().describe("Filter Parent Id"),
  widgetId: z.string().optional().describe("Widget ID"),
  sortId: z.string().optional().describe("Sort Id"),
  syncId: z.string().optional().describe("Sync Id"),
  extensionId: z.string().optional().describe("Extension Id"),
  teamId: z.string().optional().describe("Team ID"),
  clientId: z.string().optional().describe("Client ID"),
  tokenId: z.string().optional().describe("Token ID"),
  dashboardId: z.string().optional().describe("Dashboard ID"),
  id: z.string().optional().describe("Entity ID"),
  body: z.record(z.string(), z.unknown()),
})

export const InternalPostOperationOutput = z.record(z.string(), z.unknown())

export const internalPostOperation = pikkuSessionlessFunc({
  description: "Trigger an internal operation",
  input: InternalPostOperationInput,
  output: InternalPostOperationOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/internal/:workspaceId/:baseId", data) as any
  },
})
