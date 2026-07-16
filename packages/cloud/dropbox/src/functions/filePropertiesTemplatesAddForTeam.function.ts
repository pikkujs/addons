import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilePropertiesTemplatesAddForTeamInput = z.object({
  fields: z.array(z.object({
  type: z.object({
    ".tag": z.enum(["string", "other"]).optional(),
  }).optional().describe("Data type of the given property field added.\nstring: The associated property field will be of type string. Unicode is supported.\nother: None\n"),
  name: z.string().optional().describe("Key of the property field being described. Property field keys can be up to 256 bytes."),
  description: z.string().optional().describe("Description of the property field. Property field descriptions can be up to 1024 bytes."),
})).optional().describe("Definitions of the property fields associated with this template. There can be up to 32 properties in a single template."),
  name: z.string().optional().describe("Display name for the template. Template names can be up to 256 bytes."),
  description: z.string().optional().describe("Description for the template. Template descriptions can be up to 1024 bytes."),
})

export const FilePropertiesTemplatesAddForTeamOutput = z.object({
  template_id: z.string().optional().describe("An identifier for template added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
}).describe("template_id: An identifier for template added by  See :route:`templates/add_for_user` or :route:`templates/add_for_team`.\n")

export const filePropertiesTemplatesAddForTeam = pikkuSessionlessFunc({
  description: "Add a template associated with a team. See :route:`properties/add` to add properties to a file or folder.\nNote: this endpoint will create team-owned templates.",
  input: FilePropertiesTemplatesAddForTeamInput,
  output: FilePropertiesTemplatesAddForTeamOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/file_properties/templates/add_for_team", data) as any
  },
})
