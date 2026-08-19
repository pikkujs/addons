import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilePropertiesPropertiesRemoveInput = z.object({
  path: z.string().optional().describe("A unique identifier for the file or folder."),
  property_template_ids: z.array(z.string()).optional().describe("A list of identifiers for a template created by :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
})

export const FilePropertiesPropertiesRemoveOutput = z.unknown()

export const filePropertiesPropertiesRemove = pikkuSessionlessFunc({
  description: "Permanently removes the specified property group from the file. To remove specific property field key value pairs, see :route:`properties/update`. To update a template, see :route:`templates/update_for_user` or :route:`templates/update_for_team`. To remove a template, see :route:`templates/remove_for_user` or :route:`templates/remove_for_team`.",
  input: FilePropertiesPropertiesRemoveInput,
  output: FilePropertiesPropertiesRemoveOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/properties/remove", data) as any
  },
})
