import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilePropertiesTemplatesListForUserInput = z.object({
  body: z.unknown(),
})

export const FilePropertiesTemplatesListForUserOutput = z.object({
  template_ids: z.array(z.string()).optional().describe("List of identifiers for templates added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
}).describe("template_ids: List of identifiers for templates added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`.\n")

export const filePropertiesTemplatesListForUser = pikkuSessionlessFunc({
  description: "Get the template identifiers for a team. To get the schema of each template use :route:`templates/get_for_user`. This endpoint can't be called on a team member or admin's behalf.",
  input: FilePropertiesTemplatesListForUserInput,
  output: FilePropertiesTemplatesListForUserOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/templates/list_for_user", data) as any
  },
})
