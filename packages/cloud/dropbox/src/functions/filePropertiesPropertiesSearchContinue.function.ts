import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilePropertiesPropertiesSearchContinueInput = z.object({
  cursor: z.string().optional().describe("The cursor returned by your last call to :route:`properties/search` or :route:`properties/search/continue`."),
})

export const FilePropertiesPropertiesSearchContinueOutput = z.object({
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

export const filePropertiesPropertiesSearchContinue = pikkuSessionlessFunc({
  description: "Once a cursor has been retrieved from :route:`properties/search`, use this to paginate through all search results.",
  input: FilePropertiesPropertiesSearchContinueInput,
  output: FilePropertiesPropertiesSearchContinueOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/properties/search/continue", data) as any
  },
})
