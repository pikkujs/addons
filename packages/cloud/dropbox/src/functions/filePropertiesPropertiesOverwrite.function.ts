import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilePropertiesPropertiesOverwriteInput = z.object({
  path: z.string().optional().describe("A unique identifier for the file or folder."),
  property_groups: z.array(z.object({
  fields: z.array(z.object({
    name: z.string().optional().describe("Key of the property field associated with a file and template. Keys can be up to 256 bytes."),
    value: z.string().optional().describe("Value of the property field associated with a file and template. Values can be up to 1024 bytes."),
  })).optional().describe("The actual properties associated with the template. There can be up to 32 property types per template."),
  template_id: z.string().optional().describe("A unique identifier for the associated template."),
})).optional().describe("The property groups \"snapshot\" updates to force apply."),
})

export const FilePropertiesPropertiesOverwriteOutput = z.unknown()

export const filePropertiesPropertiesOverwrite = pikkuSessionlessFunc({
  description: "Overwrite property groups associated with a file. This endpoint should be used instead of :route:`properties/update` when property groups are being updated via a \"snapshot\" instead of via a \"delta\". In other words, this endpoint will delete all omitted fields from a property group, whereas :route:`properties/update` will only delete fields that are explicitly marked for deletion.",
  input: FilePropertiesPropertiesOverwriteInput,
  output: FilePropertiesPropertiesOverwriteOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/properties/overwrite", data) as any
  },
})
