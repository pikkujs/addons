import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsAggregatedMetaInfoInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const UtilsAggregatedMetaInfoOutput = z.object({
  baseCount: z.number().int().optional(),
  bases: z.array(z.object({
    tableCount: z.object({
      table: z.number().int().optional().describe("Table Count"),
      view: z.number().int().optional().describe("View Count"),
    }).optional(),
    external: z.boolean().optional().default(false).describe("External Base"),
    viewCount: z.object({
      formCount: z.number().int().optional().describe("Form Count"),
      gridCount: z.number().int().optional().describe("Grid Count"),
      galleryCount: z.number().int().optional().describe("Gallery Count"),
      kanbanCount: z.number().int().optional().describe("Kanban Count"),
      calendarCount: z.number().int().optional().describe("Calendar Count"),
      total: z.number().int().optional().describe("Total View Count"),
      sharedFormCount: z.number().int().optional().describe("Shared Form Count"),
      sharedGridCount: z.number().int().optional().describe("Shared Grid Count"),
      sharedGalleryCount: z.number().int().optional().describe("Shared Gallery Count"),
      sharedKanbanCount: z.number().int().optional().describe("Shared Kanban Count"),
      sharedCalendarCount: z.number().int().optional().describe("Shared Calendar Count"),
      sharedTotal: z.number().int().optional().describe("Shared Total View Count"),
      sharedLockedCount: z.number().int().optional().describe("Shared Locked View Count"),
    }).optional(),
    webhookCount: z.number().int().optional().describe("Webhook Count"),
    filterCount: z.number().int().optional().describe("Filter Count"),
    sortCount: z.number().int().optional().describe("Sort Count"),
    rowCount: z.array(z.object({
      TotalRecords: z.string().optional(),
    })).optional().describe("Row Count"),
    userCount: z.number().int().optional().describe("Total base user Count"),
  })).optional(),
  userCount: z.number().int().optional().describe("Total user Count"),
  sharedBaseCount: z.number().int().optional().describe("Total shared base Count"),
})

export const utilsAggregatedMetaInfo = pikkuSessionlessFunc({
  description: "Get Aggregated Meta Info such as tableCount, dbViewCount, viewCount and etc.",
  input: UtilsAggregatedMetaInfoInput,
  output: UtilsAggregatedMetaInfoOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/aggregated-meta-info", data) as any
  },
})
