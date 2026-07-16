import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteSectionInput = z.object({
  sectionId: z.string().describe("Section ID."),
})

export const deleteSection = pikkuSessionlessFunc({
  description: "Deletes a section.\n\nA successful response has 204 No Content status and an empty body.",
  input: DeleteSectionInput,
  func: async ({ todoist }, data) => {
    return todoist.call("DELETE", "/sections/{sectionId}", data)
  },
})
