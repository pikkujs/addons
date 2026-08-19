// Databases — Database endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const CreateDatabaseInput = z.object({
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  parent: z.object({
  type: z.enum(["page_id", "workspace"]).describe("The type of parent."),
}).describe("The parent page or workspace where the database will be created."),
  title: z.array(z.object({
  annotations: z.object({
    bold: z.boolean().optional().describe("Whether the text is formatted as bold."),
    italic: z.boolean().optional().describe("Whether the text is formatted as italic."),
    strikethrough: z.boolean().optional().describe("Whether the text is formatted with a strikethrough."),
    underline: z.boolean().optional().describe("Whether the text is formatted with an underline."),
    code: z.boolean().optional().describe("Whether the text is formatted as code."),
    color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).optional().describe("The color of the text."),
  }).optional().describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
})).max(100).optional().describe("The title of the database."),
  description: z.array(z.object({
  annotations: z.object({
    bold: z.boolean().optional().describe("Whether the text is formatted as bold."),
    italic: z.boolean().optional().describe("Whether the text is formatted as italic."),
    strikethrough: z.boolean().optional().describe("Whether the text is formatted with a strikethrough."),
    underline: z.boolean().optional().describe("Whether the text is formatted with an underline."),
    code: z.boolean().optional().describe("Whether the text is formatted as code."),
    color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).optional().describe("The color of the text."),
  }).optional().describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
})).max(100).optional().describe("The description of the database."),
  is_inline: z.boolean().optional().describe("Whether the database should be displayed inline in the parent page. Defaults to false."),
  initial_data_source: z.object({
  properties: z.record(z.string(), z.object({
    description: z.union([z.string(), z.unknown()]).optional().describe("The description of the property."),
  })).optional().describe("Property schema for the initial data source, if you'd like to create one."),
}).optional().describe("Initial data source configuration for the database."),
  icon: z.union([z.object({
  type: z.string().optional().describe("Always `file_upload`"),
  file_upload: z.object({
    id: z.string().describe("ID of a FileUpload object that has the status `uploaded`."),
  }),
}), z.object({
  type: z.string().optional().describe("Always `emoji`"),
  emoji: z.string().describe("An emoji character."),
}), z.object({
  type: z.string().optional().describe("Always `external`"),
  external: z.object({
    url: z.string().describe("The URL of the external file."),
  }),
}), z.object({
  type: z.string().optional().describe("Always `custom_emoji`"),
  custom_emoji: z.object({
    id: z.string().describe("The ID of the custom emoji."),
    name: z.string().optional().describe("The name of the custom emoji."),
    url: z.string().optional().describe("The URL of the custom emoji."),
  }),
}), z.object({
  type: z.string().optional().describe("Always `icon`"),
  icon: z.object({
    name: z.string().describe("The name of the Notion icon (e.g. pizza, meeting, home). See the Notion icon picker for valid names."),
    color: z.enum(["gray", "lightgray", "brown", "yellow", "orange", "green", "blue", "purple", "pink", "red"]).optional().describe("The color variant of the icon. Defaults to gray if not specified. Valid values: gray, lightgray, brown, yellow, orange, green, blue, purple, pink, red."),
  }).describe("A Notion native icon, specified by name and optional color."),
})]).optional().describe("The icon for the database."),
  cover: z.union([z.object({
  type: z.string().optional().describe("Always `file_upload`"),
  file_upload: z.object({
    id: z.string().describe("ID of a FileUpload object that has the status `uploaded`."),
  }).describe("The file upload for the cover."),
}), z.object({
  type: z.string().optional().describe("Always `external`"),
  external: z.object({
    url: z.string().describe("The URL of the external file."),
  }).describe("External URL for the cover."),
})]).optional().describe("The cover image for the database."),
})

export const CreateDatabaseOutput = z.union([z.object({
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

export const createDatabase = pikkuSessionlessFunc({
  description: "Create a database",
  input: CreateDatabaseInput,
  output: CreateDatabaseOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/databases", data) as any
  },
})
