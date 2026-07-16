import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilePropertiesPropertiesSearchInput = z.object({
  template_filter: z.object({
  filter_some: z.array(z.string()).optional().describe("Only templates with an ID in the supplied list will be returned (a subset of templates will be returned)."),
  ".tag": z.enum(["filter_some", "other", "filter_none"]).optional(),
}).optional().describe("filter_some: Only templates with an ID in the supplied list will be returned (a subset of templates will be returned).\nother: None\nfilter_none: No templates will be filtered from the result (all templates will be returned).\n"),
  queries: z.array(z.object({
  query: z.string().optional().describe("The property field value for which to search across templates."),
  logical_operator: z.object({
    ".tag": z.enum(["or_operator", "other"]).optional(),
  }).optional().describe("Logical operator to join search queries together.\nor_operator: Append a query with an \"or\" operator.\nother: None\n"),
  mode: z.object({
    ".tag": z.enum(["field_name", "other"]).optional(),
    field_name: z.string().optional().describe("Search for a value associated with this field name."),
  }).optional().describe("field_name: Search for a value associated with this field name.\nother: None\n"),
})).optional().describe("Queries to search."),
})

export const FilePropertiesPropertiesSearchOutput = z.object({
  matches: z.array(z.object({
    path: z.string().optional().describe("The path for the matched file or folder."),
    is_deleted: z.boolean().optional().describe("Whether the file or folder is deleted."),
    id: z.string().optional().describe("The ID for the matched file or folder."),
    property_groups: z.array(z.object({
      fields: z.array(z.object({
        name: z.string().optional().describe("Key of the property field associated with a file and template. Keys can be up to 256 bytes."),
        value: z.string().optional().describe("Value of the property field associated with a file and template. Values can be up to 1024 bytes."),
      })).optional().describe("The actual properties associated with the template. There can be up to 32 property types per template."),
      template_id: z.string().optional().describe("A unique identifier for the associated template."),
    })).optional().describe("List of custom property groups associated with the file."),
  })).optional().describe("A list (possibly empty) of matches for the query."),
  cursor: z.string().optional().describe("Pass the cursor into :route:`properties/search/continue` to continue to receive search results. Cursor will be null when there are no more results."),
}).describe("matches: A list (possibly empty) of matches for the query.\ncursor: Pass the cursor into :route:`properties/search/continue` to continue to receive search results. Cursor will be null when there are no more results.\n")

export const filePropertiesPropertiesSearch = pikkuSessionlessFunc({
  description: "Search across property templates for particular property field values.",
  input: FilePropertiesPropertiesSearchInput,
  output: FilePropertiesPropertiesSearchOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/properties/search", data) as any
  },
})
