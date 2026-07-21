// Databases — Database endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const RetrieveDatabaseInput = z.object({
  database_id: z.string().describe("ID of a Notion database, a container for one or more data sources."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const RetrieveDatabaseOutput = z.union([z.object({
  object: z.string().describe("The database object type name."),
  id: z.string().uuid().describe("The ID of the database."),
}), z.object({
  object: z.string().describe("The database object type name."),
  id: z.string().uuid().describe("The ID of the database."),
  title: z.array(z.object({
    plain_text: z.string().describe("The plain text content of the rich text object, without any styling."),
    href: z.union([z.string(), z.unknown()]).describe("A URL that the rich text object links to or mentions."),
    annotations: z.object({
      bold: z.boolean(),
      italic: z.boolean(),
      strikethrough: z.boolean(),
      underline: z.boolean(),
      code: z.boolean(),
      color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`, `default_background`, `gray_background`, `brown_background`, `orange_background`, `yellow_background`, `green_background`, `blue_background`, `purple_background`, `pink_background`, `red_background`"),
    }).describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
  })).max(100).describe("The title of the database."),
  description: z.array(z.object({
    plain_text: z.string().describe("The plain text content of the rich text object, without any styling."),
    href: z.union([z.string(), z.unknown()]).describe("A URL that the rich text object links to or mentions."),
    annotations: z.object({
      bold: z.boolean(),
      italic: z.boolean(),
      strikethrough: z.boolean(),
      underline: z.boolean(),
      code: z.boolean(),
      color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`, `default_background`, `gray_background`, `brown_background`, `orange_background`, `yellow_background`, `green_background`, `blue_background`, `purple_background`, `pink_background`, `red_background`"),
    }).describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
  })).max(100).describe("The description of the database."),
  parent: z.union([z.object({
    type: z.string().describe("The parent type."),
    page_id: z.string().uuid().describe("The ID of the parent page."),
  }), z.object({
    type: z.string().describe("The parent type."),
    workspace: z.boolean().describe("Always true for workspace parent."),
  }), z.object({
    type: z.string().describe("The parent type."),
    database_id: z.string().uuid().describe("The ID of the parent database."),
  }), z.object({
    type: z.string().describe("The parent type."),
    block_id: z.string().uuid().describe("The ID of the parent block."),
  })]).describe("The parent of the database. This is typically a page, block, or workspace, but can be another database in the case of wikis."),
  is_inline: z.boolean().describe("Whether the database is inline."),
  in_trash: z.boolean().describe("Whether the database is in the trash."),
  is_locked: z.boolean().describe("Whether the database is locked from editing in the Notion app UI."),
  created_time: z.string().datetime().describe("The time when the database was created."),
  last_edited_time: z.string().datetime().describe("The time when the database was last edited."),
  data_sources: z.array(z.object({
    id: z.string().uuid().describe("The ID of the data source."),
    name: z.string().describe("The name of the data source."),
  })).max(100).describe("The data sources of the database."),
  icon: z.union([z.union([z.object({
    type: z.string().describe("Type of icon. In this case, an emoji."),
    emoji: z.string().describe("The emoji character used as the icon."),
  }), z.object({
    type: z.string().describe("Type of icon. In this case, a file."),
    file: z.object({
      url: z.string().describe("The URL of the file."),
      expiry_time: z.string().datetime().describe("The time when the URL will expire."),
    }).describe("The file URL for the icon."),
  }), z.object({
    type: z.string().describe("Type of icon. In this case, an external URL."),
    external: z.object({
      url: z.string().describe("The URL of the external file or resource."),
    }).describe("The external URL for the icon."),
  }), z.object({
    type: z.string().describe("Type of icon. In this case, a custom emoji."),
    custom_emoji: z.object({
      id: z.string().uuid().describe("The ID of the custom emoji."),
      name: z.string().describe("The name of the custom emoji."),
      url: z.string().describe("The URL of the custom emoji."),
    }).describe("The custom emoji details for the icon."),
  }), z.object({
    type: z.string().describe("Type of icon. In this case, a Notion native icon."),
    icon: z.object({
      name: z.string().describe("The name of the Notion icon (e.g. pizza, meeting, home). See the Notion icon picker for valid names."),
      color: z.enum(["gray", "lightgray", "brown", "yellow", "orange", "green", "blue", "purple", "pink", "red"]).describe("The color variant of the icon. Valid values: gray, lightgray, brown, yellow, orange, green, blue, purple, pink, red."),
    }).describe("The Notion native icon, specified by name and color."),
  })]), z.unknown()]).describe("The icon of the database."),
  cover: z.union([z.union([z.object({
    type: z.string().describe("Type of cover. In this case, a file."),
    file: z.object({
      url: z.string().describe("The URL of the file."),
      expiry_time: z.string().datetime().describe("The time when the URL will expire."),
    }).describe("The file URL for the cover."),
  }), z.object({
    type: z.string().describe("Type of cover. In this case, an external URL."),
    external: z.object({
      url: z.string().describe("The URL of the external file or resource."),
    }).describe("The external URL for the cover."),
  })]), z.unknown()]).describe("The cover of the database."),
  url: z.string().describe("The URL of the database."),
  public_url: z.union([z.string(), z.unknown()]).describe("The public URL of the database if it is publicly accessible."),
})])

export const retrieveDatabase = pikkuSessionlessFunc({
  description: "Retrieve a database",
  input: RetrieveDatabaseInput,
  output: RetrieveDatabaseOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/databases/{database_id}", data) as any
  },
})
