import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilePropertiesTemplatesListForTeamInput = z.object({
  body: z.unknown(),
})

export const FilePropertiesTemplatesListForTeamOutput = z.object({
  template_ids: z.array(z.string()).optional().describe("List of identifiers for templates added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
}).describe("template_ids: List of identifiers for templates added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`.\n")

export const filePropertiesTemplatesListForTeam = pikkuSessionlessFunc({
  description: "Get the template identifiers for a team. To get the schema of each template use :route:`templates/get_for_team`.",
  input: FilePropertiesTemplatesListForTeamInput,
  output: FilePropertiesTemplatesListForTeamOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/templates/list_for_team", data) as any
  },
})
