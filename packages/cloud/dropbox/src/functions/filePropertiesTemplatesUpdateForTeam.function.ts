import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilePropertiesTemplatesUpdateForTeamInput = z.object({
  add_fields: z.array(z.object({
  type: z.object({
    ".tag": z.enum(["string", "other"]).optional(),
  }).optional().describe("Data type of the given property field added.\nstring: The associated property field will be of type string. Unicode is supported.\nother: None\n"),
  name: z.string().optional().describe("Key of the property field being described. Property field keys can be up to 256 bytes."),
  description: z.string().optional().describe("Description of the property field. Property field descriptions can be up to 1024 bytes."),
})).optional().describe("Property field templates to be added to the group template. There can be up to 32 properties in a single template."),
  description: z.string().optional().describe("Description for the new template. Template descriptions can be up to 1024 bytes."),
  template_id: z.string().optional().describe("An identifier for template added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
  name: z.string().optional().describe("A display name for the template. template names can be up to 256 bytes."),
})

export const FilePropertiesTemplatesUpdateForTeamOutput = z.object({
  template_id: z.string().optional().describe("An identifier for template added by route  See :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
}).describe("template_id: An identifier for template added by route  See :route:`templates/add_for_user` or :route:`templates/add_for_team`.\n")

export const filePropertiesTemplatesUpdateForTeam = pikkuSessionlessFunc({
  description: "Update a template associated with a team. This route can update the template name, the template description and add optional properties to templates.",
  input: FilePropertiesTemplatesUpdateForTeamInput,
  output: FilePropertiesTemplatesUpdateForTeamOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/templates/update_for_team", data) as any
  },
})
