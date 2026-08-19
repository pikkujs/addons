import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceDeletePlaceInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeDeletePlace = pikkuSessionlessFunc({
  description: "Delete a place object. You can also use this method to delete the following child object types: building, floor, section, or desk.",
  input: PlaceDeletePlaceInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}", data)
  },
})
