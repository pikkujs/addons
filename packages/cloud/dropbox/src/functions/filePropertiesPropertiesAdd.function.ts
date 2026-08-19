import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilePropertiesPropertiesAddInput = z.object({
  path: z.string().optional().describe("A unique identifier for the file or folder."),
  property_groups: z.array(z.object({
  fields: z.array(z.object({
    name: z.string().optional().describe("Key of the property field associated with a file and template. Keys can be up to 256 bytes."),
    value: z.string().optional().describe("Value of the property field associated with a file and template. Values can be up to 1024 bytes."),
  })).optional().describe("The actual properties associated with the template. There can be up to 32 property types per template."),
  template_id: z.string().optional().describe("A unique identifier for the associated template."),
})).optional().describe("The property groups which are to be added to a Dropbox file."),
})

export const FilePropertiesPropertiesAddOutput = z.unknown()

export const filePropertiesPropertiesAdd = pikkuSessionlessFunc({
  description: "Add property groups to a Dropbox file. See :route:`templates/add_for_user` or :route:`templates/add_for_team` to create new templates.",
  input: FilePropertiesPropertiesAddInput,
  output: FilePropertiesPropertiesAddOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/properties/add", data) as any
  },
})
