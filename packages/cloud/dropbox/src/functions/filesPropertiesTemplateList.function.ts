import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesPropertiesTemplateListInput = z.object({
  body: z.unknown(),
})

export const FilesPropertiesTemplateListOutput = z.object({
  template_ids: z.array(z.string()).optional().describe("List of identifiers for templates added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
}).describe("template_ids: List of identifiers for templates added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`.\n")

export const filesPropertiesTemplateList = pikkuSessionlessFunc({
  input: FilesPropertiesTemplateListInput,
  output: FilesPropertiesTemplateListOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/properties/template/list", data) as any
  },
})
