import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesPropertiesRemoveInput = z.object({
  path: z.string().optional().describe("A unique identifier for the file or folder."),
  property_template_ids: z.array(z.string()).optional().describe("A list of identifiers for a template created by :route:`templates/add_for_user` or :route:`templates/add_for_team`."),
})

export const FilesPropertiesRemoveOutput = z.unknown()

export const filesPropertiesRemove = pikkuSessionlessFunc({
  input: FilesPropertiesRemoveInput,
  output: FilesPropertiesRemoveOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/properties/remove", data) as any
  },
})
