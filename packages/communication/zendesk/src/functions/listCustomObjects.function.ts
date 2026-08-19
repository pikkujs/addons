import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListCustomObjectsInput = z.object({
  include_ui_path: z.boolean().optional().describe("Include UI path in the response"),
})

export const ListCustomObjectsOutput = z.object({
  custom_objects: z.array(z.object({
    allows_attachments: z.boolean().optional().describe("If true, file attachments can be added to the object's records. If false, new attachments can't be added to the object's records, but existing attachments on records can still be viewed and downloaded"),
    allows_photos: z.boolean().optional().describe("If true, photos can be uploaded to the records of the object. If false, new photos cannot be uploaded but existing photos can still be viewed and removed"),
    created_at: z.string().datetime().optional().describe("The time the object type was created"),
    created_by_user_id: z.string().optional().describe("Id of a user who created the object"),
    description: z.string().optional().describe("User-defined description of the object"),
    include_in_list_view: z.boolean().describe("A flag setting the visibility of the object in the agent's list view. If true, all agents and admins have viewing access to the object in the Custom objects record page in the Agent Workspace. If false, only admins have viewing access"),
    key: z.string().describe("A user-defined unique identifier. Writable on create only"),
    raw_description: z.string().optional().describe("The dynamic content placeholder, if present, or the \"raw_description\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_title: z.string().optional().describe("The dynamic content placeholder, if present, or the \"title\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_title_pluralized: z.string().optional().describe("The dynamic content placeholder, if present, or the \"raw_title_pluralized\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    title: z.string().describe("User-defined display name for the object"),
    title_pluralized: z.string().describe("User-defined pluralized version of the object's title"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the object"),
    updated_by_user_id: z.string().optional().describe("Id of the last user who updated the object"),
    url: z.string().optional().describe("Direct link to the specific custom object"),
  })).optional(),
})

export const listCustomObjects = pikkuSessionlessFunc({
  description: "Lists all undeleted custom objects for the account\n#### Allowed For\n* Agents",
  input: ListCustomObjectsInput,
  output: ListCustomObjectsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects", data) as any
  },
})
