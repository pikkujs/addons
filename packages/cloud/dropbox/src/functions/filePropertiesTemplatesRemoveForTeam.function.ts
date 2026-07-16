import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilePropertiesTemplatesRemoveForTeamInput = z.object({
  template_id: z.string().optional().describe("An identifier for a template created by :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
})

export const FilePropertiesTemplatesRemoveForTeamOutput = z.unknown()

export const filePropertiesTemplatesRemoveForTeam = pikkuSessionlessFunc({
  description: "Permanently removes the specified template created from :route:`templates/add_for_user`. All properties associated with the template will also be removed. This action cannot be undone.",
  input: FilePropertiesTemplatesRemoveForTeamInput,
  output: FilePropertiesTemplatesRemoveForTeamOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/templates/remove_for_team", data) as any
  },
})
