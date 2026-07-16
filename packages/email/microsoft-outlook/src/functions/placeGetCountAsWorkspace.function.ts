import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceGetCountAsWorkspaceInput = z.object({
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const placeGetCountAsWorkspace = pikkuSessionlessFunc({
  input: PlaceGetCountAsWorkspaceInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/microsoft.graph.workspace/$count", data)
  },
})
