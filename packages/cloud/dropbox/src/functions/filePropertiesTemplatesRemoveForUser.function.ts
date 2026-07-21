import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilePropertiesTemplatesRemoveForUserInput = z.object({
  template_id: z.string().optional().describe("An identifier for a template created by :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
})

export const FilePropertiesTemplatesRemoveForUserOutput = z.unknown()

export const filePropertiesTemplatesRemoveForUser = pikkuSessionlessFunc({
  description: "Permanently removes the specified template created from :route:`templates/add_for_user`. All properties associated with the template will also be removed. This action cannot be undone.",
  input: FilePropertiesTemplatesRemoveForUserInput,
  output: FilePropertiesTemplatesRemoveForUserOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/templates/remove_for_user", data) as any
  },
})
