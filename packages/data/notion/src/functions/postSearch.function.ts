// Search — Search endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const PostSearchInput = z.object({
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  sort: z.union([z.object({
  timestamp: z.literal("last_edited_time"),
  direction: z.enum(["ascending", "descending"]),
}), z.object({
  property: z.literal("relevance"),
})]).optional(),
  query: z.string().optional(),
  start_cursor: z.string().uuid().optional(),
  page_size: z.number().optional(),
  filter: z.object({
  property: z.literal("object"),
  value: z.enum(["page", "data_source"]),
}).optional(),
})

export const PostSearchOutput = z.object({
  type: z.string(),
  page_or_data_source: z.record(z.string(), z.unknown()),
  object: z.string(),
  next_cursor: z.unknown(),
  has_more: z.boolean(),
  results: z.array(z.union([z.union([z.object({
    object: z.string().describe("The page object type name."),
    id: z.string().uuid().describe("The ID of the page."),
    created_time: z.string().datetime().describe("Date and time when this page was created."),
    last_edited_time: z.string().datetime().describe("Date and time when this page was last edited."),
    in_trash: z.boolean().describe("Whether the page is in trash."),
    is_archived: z.boolean().describe("Whether the page has been archived."),
    is_locked: z.boolean().describe("Whether the page is locked from editing in the Notion app UI."),
    url: z.string().describe("The URL of the Notion page."),
    public_url: z.union([z.string(), z.unknown()]).describe("The public URL of the Notion page, if it has been published to the web."),
    parent: z.union([z.object({
      type: z.string().describe("The parent type."),
      database_id: z.string().uuid().describe("The ID of the parent database."),
    }), z.object({
      type: z.string().describe("The parent type."),
      data_source_id: z.string().uuid().describe("The ID of the parent data source."),
      database_id: z.string().uuid().describe("The ID of the data source's parent database."),
    }), z.object({
      type: z.string().describe("The parent type."),
      page_id: z.string().uuid().describe("The ID of the parent page."),
    }), z.object({
      type: z.string().describe("The parent type."),
      block_id: z.string().uuid().describe("The ID of the parent block."),
    }), z.object({
      type: z.string().describe("The parent type."),
      agent_id: z.string().uuid().describe("The ID of the parent agent."),
    }), z.object({
      type: z.string().describe("The parent type."),
      workspace: z.boolean().describe("Always true for workspace parent."),
    })]).describe("Information about the page's parent."),
    properties: z.record(z.string(), z.object({
      id: z.string(),
    })).describe("Property values of this page."),
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
    })]), z.unknown()]).describe("Page icon."),
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
    })]), z.unknown()]).describe("Page cover image."),
    created_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("User who created the page."),
    last_edited_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("User who last edited the page."),
  }), z.object({
    object: z.string().describe("The page object type name."),
    id: z.string().uuid().describe("The ID of the page."),
  })]), z.union([z.object({
    object: z.string().describe("The data source object type name."),
    id: z.string().uuid().describe("The ID of the data source."),
    properties: z.record(z.string(), z.object({
      id: z.string().describe("The ID of the property."),
      name: z.string().describe("The name of the property."),
      description: z.union([z.string(), z.unknown()]).describe("The description of the property."),
    })).describe("The properties schema of the data source."),
  }), z.object({
    object: z.string().describe("The data source object type name."),
    id: z.string().uuid().describe("The ID of the data source."),
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
    })).max(100).describe("The title of the data source."),
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
    })).max(100).describe("The description of the data source."),
    parent: z.union([z.object({
      type: z.string().describe("The parent type."),
      database_id: z.string().uuid().describe("The ID of the parent database."),
    }), z.object({
      type: z.string().describe("The parent type."),
      data_source_id: z.string().uuid().describe("The ID of the parent data source."),
      database_id: z.string().uuid().describe("The ID of the data source's parent database."),
    })]).describe("The parent of the data source."),
    database_parent: z.union([z.object({
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
    })]).describe("The parent of the data source's containing database. This is typically a page, block, or workspace, but can be another database in the case of wikis."),
    is_inline: z.boolean().describe("Whether the data source is inline."),
    in_trash: z.boolean().describe("Whether the data source is in the trash."),
    created_time: z.string().datetime().describe("The time when the data source was created."),
    last_edited_time: z.string().datetime().describe("The time when the data source was last edited."),
    created_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("The user who created the data source."),
    last_edited_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("The user who last edited the data source."),
    properties: z.record(z.string(), z.object({
      id: z.string().describe("The ID of the property."),
      name: z.string().describe("The name of the property."),
      description: z.union([z.string(), z.unknown()]).describe("The description of the property."),
    })).describe("The properties schema of the data source."),
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
    })]), z.unknown()]).describe("The icon of the data source."),
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
    })]), z.unknown()]).describe("The cover of the data source."),
    url: z.string().describe("The URL of the data source."),
    public_url: z.union([z.string(), z.unknown()]).describe("The public URL of the data source if it is publicly accessible."),
  })])])),
  request_status: z.object({
    type: z.enum(["complete", "incomplete"]),
    incomplete_reason: z.literal("query_result_limit_reached").optional(),
  }).optional(),
})

export const postSearch = pikkuSessionlessFunc({
  description: "Search by title",
  input: PostSearchInput,
  output: PostSearchOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/search", data) as any
  },
})
