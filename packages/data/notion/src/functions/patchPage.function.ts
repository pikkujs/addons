// Pages — Page endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const PatchPageInput = z.object({
  page_id: z.string(),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  properties: z.record(z.string(), z.union([z.object({
  title: z.array(z.object({
    annotations: z.object({
      bold: z.boolean().optional().describe("Whether the text is formatted as bold."),
      italic: z.boolean().optional().describe("Whether the text is formatted as italic."),
      strikethrough: z.boolean().optional().describe("Whether the text is formatted with a strikethrough."),
      underline: z.boolean().optional().describe("Whether the text is formatted with an underline."),
      code: z.boolean().optional().describe("Whether the text is formatted as code."),
      color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).optional().describe("The color of the text."),
    }).optional().describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
  })).max(100),
  type: z.string().optional(),
}), z.object({
  rich_text: z.array(z.object({
    annotations: z.object({
      bold: z.boolean().optional().describe("Whether the text is formatted as bold."),
      italic: z.boolean().optional().describe("Whether the text is formatted as italic."),
      strikethrough: z.boolean().optional().describe("Whether the text is formatted with a strikethrough."),
      underline: z.boolean().optional().describe("Whether the text is formatted with an underline."),
      code: z.boolean().optional().describe("Whether the text is formatted as code."),
      color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).optional().describe("The color of the text."),
    }).optional().describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
  })).max(100),
  type: z.string().optional(),
}), z.object({
  number: z.unknown(),
  type: z.string().optional(),
}), z.object({
  url: z.union([z.string(), z.unknown()]),
  type: z.string().optional(),
}), z.object({
  select: z.union([z.object({
    id: z.string().min(1).max(100),
    name: z.string().min(1).max(2000).optional(),
    color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"]).optional().describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`"),
    description: z.union([z.string(), z.unknown()]).optional(),
  }), z.object({
    name: z.string().min(1).max(2000),
    id: z.string().min(1).max(100).optional(),
    color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"]).optional().describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`"),
    description: z.union([z.string(), z.unknown()]).optional(),
  }), z.unknown()]),
  type: z.string().optional(),
}), z.object({
  multi_select: z.array(z.union([z.object({
    id: z.string().min(1).max(100),
    name: z.string().min(1).max(2000).optional(),
    color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"]).optional().describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`"),
    description: z.union([z.string(), z.unknown()]).optional(),
  }), z.object({
    name: z.string().min(1).max(2000),
    id: z.string().min(1).max(100).optional(),
    color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"]).optional().describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`"),
    description: z.union([z.string(), z.unknown()]).optional(),
  })])).max(100),
  type: z.string().optional(),
}), z.object({
  people: z.array(z.union([z.object({
    id: z.string().describe("The ID of the user."),
    object: z.string().optional().describe("The user object type name."),
  }), z.object({
    id: z.string(),
    name: z.unknown().optional(),
    object: z.string().optional(),
  })])).max(100),
  type: z.string().optional(),
}), z.object({
  email: z.union([z.string(), z.unknown()]),
  type: z.string().optional(),
}), z.object({
  phone_number: z.union([z.string(), z.unknown()]),
  type: z.string().optional(),
}), z.object({
  date: z.union([z.object({
    start: z.string().date().describe("The start date of the date object."),
    end: z.union([z.string().date(), z.unknown()]).optional().describe("The end date of the date object, if any."),
    time_zone: z.union([z.string(), z.unknown()]).optional().describe("The time zone of the date object, if any. E.g. America/Los_Angeles, Europe/London, etc."),
  }), z.unknown()]),
  type: z.string().optional(),
}), z.object({
  checkbox: z.boolean(),
  type: z.string().optional(),
}), z.object({
  relation: z.array(z.object({
    id: z.string(),
  })).max(100),
  type: z.string().optional(),
}), z.object({
  files: z.array(z.union([z.union([z.object({
    file: z.object({
      url: z.string(),
      expiry_time: z.string().datetime().optional(),
    }),
    name: z.string().min(1).max(100),
    type: z.string().optional(),
  }), z.object({
    external: z.object({
      url: z.string().min(1).max(2000),
    }),
    name: z.string().min(1).max(100),
    type: z.string().optional(),
  })]), z.object({
    file_upload: z.object({
      id: z.string(),
    }),
    type: z.string().optional(),
    name: z.string().min(1).max(100).optional(),
  })])).max(100),
  type: z.string().optional(),
}), z.object({
  status: z.union([z.object({
    id: z.string().min(1).max(100),
    name: z.string().min(1).max(2000).optional(),
    color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"]).optional().describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`"),
    description: z.union([z.string(), z.unknown()]).optional(),
  }), z.object({
    name: z.string().min(1).max(2000),
    id: z.string().min(1).max(100).optional(),
    color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"]).optional().describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`"),
    description: z.union([z.string(), z.unknown()]).optional(),
  }), z.unknown()]),
  type: z.string().optional(),
}), z.object({
  place: z.object({
    lat: z.number(),
    lon: z.number(),
    name: z.unknown().optional(),
    address: z.unknown().optional(),
    aws_place_id: z.unknown().optional(),
    google_place_id: z.unknown().optional(),
  }),
  type: z.string().optional(),
}), z.object({
  verification: z.union([z.object({
    state: z.string(),
    date: z.object({
      start: z.string().date().describe("The start date of the date object."),
      end: z.union([z.string().date(), z.unknown()]).optional().describe("The end date of the date object, if any."),
      time_zone: z.union([z.string(), z.unknown()]).optional().describe("The time zone of the date object, if any. E.g. America/Los_Angeles, Europe/London, etc."),
    }).optional(),
  }), z.object({
    state: z.string(),
  })]),
  type: z.string().optional(),
})])).optional(),
  icon: z.union([z.union([z.object({
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
})]), z.unknown()]).optional(),
  cover: z.union([z.union([z.object({
  type: z.string().optional().describe("Always `file_upload`"),
  file_upload: z.object({
    id: z.string().describe("ID of a FileUpload object that has the status `uploaded`."),
  }).describe("The file upload for the cover."),
}), z.object({
  type: z.string().optional().describe("Always `external`"),
  external: z.object({
    url: z.string().describe("The URL of the external file."),
  }).describe("External URL for the cover."),
})]), z.unknown()]).optional(),
  is_locked: z.boolean().optional().describe("Whether the page should be locked from editing in the Notion app UI. If not provided, the locked state will not be updated."),
  template: z.union([z.object({
  type: z.string(),
  timezone: z.string().optional().describe("IANA timezone to use when resolving template variables like @now and @today (e.g. 'America/New_York'). Defaults to the authorizing user's timezone for public integrations, or UTC for internal integrations."),
}), z.object({
  type: z.string(),
  template_id: z.string(),
  timezone: z.string().optional().describe("IANA timezone to use when resolving template variables like @now and @today (e.g. 'America/New_York'). Defaults to the authorizing user's timezone for public integrations, or UTC for internal integrations."),
})]).optional(),
  erase_content: z.boolean().optional().describe("Whether to erase all existing content from the page. When used with a template, the template content replaces the existing content. When used without a template, simply clears the page content."),
  in_trash: z.boolean().optional(),
  is_archived: z.boolean().optional(),
})

export const PatchPageOutput = z.union([z.object({
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
})])

export const patchPage = pikkuSessionlessFunc({
  description: "Update page",
  input: PatchPageInput,
  output: PatchPageOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("PATCH", "/v1/pages/{page_id}", data) as any
  },
})
