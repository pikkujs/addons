// Pages — Page endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const PostPageInput = z.any()

export const PostPageOutput = z.union([z.object({
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

export const postPage = pikkuSessionlessFunc({
  description: "Create a page",
  input: PostPageInput,
  output: PostPageOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/pages", data) as any
  },
})
