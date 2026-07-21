// Screens — This resource represents the screens used to record issue details. Use it to: * get details of all screens. * get details of all the fields available for use on screens. * create screens. * delete screens. * update screens. * add a field to the default screen.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetScreensForFieldInput = z.object({
  fieldId: z.string().describe("The ID of the field to return screens for."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(100).describe("The maximum number of items to return per page."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about screens in the response. This parameter accepts `tab` which returns details about the screen tabs the field is used in."),
})

export const GetScreensForFieldOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    description: z.string().optional().describe("The description of the screen."),
    id: z.number().int().optional().describe("The ID of the screen."),
    name: z.string().optional().describe("The name of the screen."),
    scope: z.object({
      project: z.object({
        avatarUrls: z.object({
          "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
          "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
          "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
          "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
        }).optional().describe("The URLs of the project's avatars."),
        id: z.string().optional().describe("The ID of the project."),
        key: z.string().optional().describe("The key of the project."),
        name: z.string().optional().describe("The name of the project."),
        projectCategory: z.object({
          description: z.string().optional().describe("The name of the project category."),
          id: z.string().optional().describe("The ID of the project category."),
          name: z.string().optional().describe("The description of the project category."),
          self: z.string().optional().describe("The URL of the project category."),
        }).optional().describe("The category the project belongs to."),
        projectTypeKey: z.enum(["software", "service_desk", "business"]).optional().describe("The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project."),
        self: z.string().optional().describe("The URL of the project details."),
        simplified: z.boolean().optional().describe("Whether or not the project is simplified."),
      }).optional().describe("The project the item has scope in."),
      type: z.enum(["PROJECT", "TEMPLATE"]).optional().describe("The type of scope."),
    }).optional().describe("The scope of the screen."),
    tab: z.object({
      id: z.number().int().optional().describe("The ID of the screen tab."),
      name: z.string().describe("The name of the screen tab. The maximum length is 255 characters."),
    }).optional().describe("The tab for the screen."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getScreensForField = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of the screens a field is used in.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetScreensForFieldInput,
  output: GetScreensForFieldOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/field/{fieldId}/screens", data) as any
  },
})
