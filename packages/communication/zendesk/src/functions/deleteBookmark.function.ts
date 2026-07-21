import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteBookmarkInput = z.object({
  bookmark_id: z.number().int().describe("The ID of the bookmark. Example: 900000001111"),
})

export const deleteBookmark = pikkuSessionlessFunc({
  description: "#### Allowed For\n- Agents (own bookmarks only)\n\nIf the bookmark already exists with a specified ticket id, the response status will be `http Status: 200 OK`.",
  input: DeleteBookmarkInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/bookmarks/{bookmark_id}", data)
  },
})
