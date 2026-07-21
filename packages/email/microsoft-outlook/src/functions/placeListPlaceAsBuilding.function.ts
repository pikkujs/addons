import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceListPlaceAsBuildingInput = z.object({
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceListPlaceAsBuildingOutput = z.object({
  value: z.array(z.object({
    resourceLinks: z.array(z.object({
      linkType: z.enum(["url", "unknownFutureValue"]).optional(),
      name: z.string().nullable().optional().describe("The link text that is visible in the Places app. The maximum length is 200 characters."),
      value: z.string().nullable().optional().describe("The URL of the resource link. The maximum length is 200 characters."),
    })).optional().describe("A set of links to external resources that are associated with the building. Inherited from place."),
    wifiState: z.enum(["unknown", "enabled", "disabled", "unknownFutureValue"]).optional(),
    map: z.object({
      placeId: z.string().nullable().optional().describe("Identifier for the building to which this buildingMap belongs."),
      footprints: z.array(z.unknown()).optional().describe("Represents the approximate physical extent of a referenced building. It corresponds to footprint.geojson in IMDF format."),
      levels: z.array(z.object({
        placeId: z.string().nullable().optional().describe("Identifier of the floor to which this levelMap belongs."),
        fixtures: z.array(z.object({
          placeId: z.string().nullable().optional().describe("Identifier for the floor to which this fixtureMap belongs."),
        })).optional().describe("Collection of fixtures (such as furniture or equipment) on this level. Supports upsert."),
        sections: z.array(z.object({
          placeId: z.string().nullable().optional().describe("Identifier of the section to which this sectionMap belongs."),
        })).optional().describe("Collection of sections (such as zones or partitions) on this level. Supports upsert."),
        units: z.array(z.object({
          placeId: z.string().nullable().optional().describe("Identifier of the place (such as a room) to which this unitMap belongs."),
        })).optional().describe("Collection of units (such as rooms or offices) on this level. Supports upsert."),
      })).optional().describe("Represents a physical floor structure within a building. It corresponds to level.geojson in IMDF format."),
    }).optional(),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeListPlaceAsBuilding = pikkuSessionlessFunc({
  description: "Get a collection of the specified type of place objects defined in a tenant. You can do the following for a given tenant:\r\n- List all buildings.\r\n- List all floors.\r\n- List all sections.\r\n- List all desks.\r\n- List all rooms.\r\n- List all workspaces.\r\n- List all room lists.\r\n- List rooms in a specific room list.\r\n- List workspaces in a specific room list.",
  input: PlaceListPlaceAsBuildingInput,
  output: PlaceListPlaceAsBuildingOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/microsoft.graph.building", data) as any
  },
})
