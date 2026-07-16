import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilePropertiesPropertiesUpdateInput = z.object({
  path: z.string().optional().describe("A unique identifier for the file or folder."),
  update_property_groups: z.array(z.object({
  remove_fields: z.array(z.string()).optional().describe("Property fields to remove (by name), provided they exist."),
  template_id: z.string().optional().describe("A unique identifier for a property template."),
  add_or_update_fields: z.array(z.object({
    name: z.string().optional().describe("Key of the property field associated with a file and template. Keys can be up to 256 bytes."),
    value: z.string().optional().describe("Value of the property field associated with a file and template. Values can be up to 1024 bytes."),
  })).optional().describe("Property fields to update. If the property field already exists, it is updated. If the property field doesn't exist, the property group is added."),
})).optional().describe("The property groups \"delta\" updates to apply."),
})

export const FilePropertiesPropertiesUpdateOutput = z.unknown()

export const filePropertiesPropertiesUpdate = pikkuSessionlessFunc({
  description: "Add, update or remove properties associated with the supplied file and templates. This endpoint should be used instead of :route:`properties/overwrite` when property groups are being updated via a \"delta\" instead of via a \"snapshot\" . In other words, this endpoint will not delete any omitted fields from a property group, whereas :route:`properties/overwrite` will delete any fields that are omitted from a property group.",
  input: FilePropertiesPropertiesUpdateInput,
  output: FilePropertiesPropertiesUpdateOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/properties/update", data) as any
  },
})
