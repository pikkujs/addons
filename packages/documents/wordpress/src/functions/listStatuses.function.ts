import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListStatusesInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const ListStatusesOutput = z.object({
  name: z.string().optional().describe("The title for the status."),
  private: z.boolean().optional().describe("Whether posts with this status should be private."),
  protected: z.boolean().optional().describe("Whether posts with this status should be protected."),
  public: z.boolean().optional().describe("Whether posts of this status should be shown in the front end of the site."),
  queryable: z.boolean().optional().describe("Whether posts with this status should be publicly-queryable."),
  show_in_list: z.boolean().optional().describe("Whether to include posts in the edit listing for their post type."),
  slug: z.string().optional().describe("An alphanumeric identifier for the status."),
  date_floating: z.boolean().optional().describe("Whether posts of this status may have floating published dates."),
})

export const listStatuses = pikkuSessionlessFunc({
  input: ListStatusesInput,
  output: ListStatusesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/statuses", data) as any
  },
})
