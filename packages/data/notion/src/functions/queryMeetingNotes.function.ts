// Meeting notes — Meeting notes endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const QueryMeetingNotesInput = z.object({
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  filter: z.object({
  operator: z.enum(["and", "or"]).describe("Operator for combinator filters."),
  filters: z.array(z.union([z.object({
    operator: z.enum(["and", "or"]).describe("Operator for nested combinator filters."),
    filters: z.array(z.union([z.object({
      property: z.string().describe("Property name."),
      filter: z.object({
        operator: z.string().describe("Operator."),
        value: z.union([z.object({
          type: z.enum(["relative", "exact"]),
          value: z.union([z.string(), z.object({
            type: z.enum(["date", "datetime"]),
            start_date: z.string(),
            start_time: z.string().optional(),
            time_zone: z.string().optional(),
          })]),
        }), z.object({
          type: z.enum(["relative", "exact"]),
          value: z.union([z.string(), z.object({
            type: z.literal("daterange"),
            start_date: z.string(),
            end_date: z.string().optional(),
          })]),
          direction: z.enum(["past", "future"]).optional(),
          unit: z.enum(["day", "week", "month", "year"]).optional(),
          count: z.number().optional(),
        }), z.object({
          type: z.literal("exact"),
          value: z.string().describe("The text value to filter on."),
        }), z.array(z.object({
          type: z.literal("exact"),
          value: z.object({
            table: z.literal("notion_user"),
            id: z.string(),
          }),
        }))]).optional().describe("Value for the operator."),
      }),
    }), z.object({
      operator: z.enum(["and", "or"]).describe("Operator for nested combinator filters."),
      filters: z.array(z.object({
        property: z.string().describe("Property name."),
        filter: z.object({
          operator: z.string().describe("Operator."),
          value: z.union([z.object({
            type: z.enum(["relative", "exact"]),
            value: z.union([z.string(), z.object({
              type: z.enum(["date", "datetime"]),
              start_date: z.string(),
              start_time: z.string().optional(),
              time_zone: z.string().optional(),
            })]),
          }), z.object({
            type: z.enum(["relative", "exact"]),
            value: z.union([z.string(), z.object({
              type: z.literal("daterange"),
              start_date: z.string(),
              end_date: z.string().optional(),
            })]),
            direction: z.enum(["past", "future"]).optional(),
            unit: z.enum(["day", "week", "month", "year"]).optional(),
            count: z.number().optional(),
          }), z.object({
            type: z.literal("exact"),
            value: z.string().describe("The text value to filter on."),
          }), z.array(z.object({
            type: z.literal("exact"),
            value: z.object({
              table: z.any(),
              id: z.any(),
            }),
          }))]).optional().describe("Value for the operator."),
        }),
      })),
    })])).describe("Nested filters for combinator filters."),
  }), z.object({
    property: z.string().describe("Property name."),
    filter: z.object({
      operator: z.string().describe("Operator."),
      value: z.union([z.object({
        type: z.enum(["relative", "exact"]),
        value: z.union([z.string(), z.object({
          type: z.enum(["date", "datetime"]),
          start_date: z.string(),
          start_time: z.string().optional(),
          time_zone: z.string().optional(),
        })]),
      }), z.object({
        type: z.enum(["relative", "exact"]),
        value: z.union([z.string(), z.object({
          type: z.literal("daterange"),
          start_date: z.string(),
          end_date: z.string().optional(),
        })]),
        direction: z.enum(["past", "future"]).optional(),
        unit: z.enum(["day", "week", "month", "year"]).optional(),
        count: z.number().optional(),
      }), z.object({
        type: z.literal("exact"),
        value: z.string().describe("The text value to filter on."),
      }), z.array(z.object({
        type: z.literal("exact"),
        value: z.object({
          table: z.literal("notion_user"),
          id: z.string(),
        }),
      }))]).optional().describe("Value for the operator."),
    }),
  })])).max(100).optional().describe("Nested filters; each may be a combinator (and/or) or property filter."),
}).optional().describe("Optional filter for querying meeting notes. Supports combinator (and/or) and property filters on title, attendees, created_time, created_by, last_edited_time, last_edited_by."),
  sort: z.array(z.object({
  property: z.enum(["title", "attendees", "created_time", "created_by", "last_edited_time", "last_edited_by"]).describe("Property name to sort by."),
  direction: z.enum(["ascending", "descending"]).describe("Sort direction. Must be 'ascending' or 'descending'."),
})).max(100).optional().describe("Optional sort order for the results. Each entry specifies a property name and direction."),
  limit: z.number().int().min(1).max(50).optional().describe("Maximum number of results to return. Defaults to 50."),
})

export const QueryMeetingNotesOutput = z.object({
  results: z.array(z.object({
    object: z.string().describe("Always \"block\"."),
    id: z.string().uuid().describe("The ID of the meeting note block."),
    type: z.string().describe("Always \"meeting_notes\"."),
    meeting_notes: z.object({
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
      })).max(100).optional().describe("Title of the meeting note as rich text."),
      status: z.enum(["transcription_not_started", "transcription_paused", "transcription_in_progress", "summary_in_progress", "notes_ready"]).optional().describe("Current processing status of the meeting note transcription."),
      children: z.object({
        summary_block_id: z.string().uuid().optional().describe("Block ID of the AI summary tab."),
        notes_block_id: z.string().uuid().optional().describe("Block ID of the meeting notes tab."),
        transcript_block_id: z.string().uuid().optional().describe("Block ID of the transcript tab."),
      }).optional().describe("Block IDs for each tab (summary, notes, transcript)."),
      calendar_event: z.object({
        start_time: z.string().describe("ISO-8601 start time of the calendar event."),
        end_time: z.string().describe("ISO-8601 end time of the calendar event."),
        attendees: z.array(z.string().uuid()).max(100).optional().describe("List of attendee user IDs."),
      }).optional().describe("Calendar event metadata associated with this meeting note."),
      recording: z.object({
        start_time: z.string().optional().describe("ISO-8601 timestamp when the recording started."),
        end_time: z.string().optional().describe("ISO-8601 timestamp when the recording ended."),
      }).optional().describe("Start and end times of the actual recording."),
    }).describe("Meeting note content fields."),
    created_time: z.string().describe("ISO-8601 timestamp when this meeting note was created."),
    last_edited_time: z.string().describe("ISO-8601 timestamp when this meeting note was last edited."),
    created_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("User who created this meeting note."),
    last_edited_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("User who last edited this meeting note."),
    has_children: z.boolean().describe("Whether this block has child blocks."),
    in_trash: z.boolean().describe("Whether this meeting note is in the trash."),
  })).max(100).describe("Meeting note transcription block objects."),
  has_more: z.boolean().describe("Whether additional results exist beyond the returned limit."),
})

export const queryMeetingNotes = pikkuSessionlessFunc({
  description: "Query meeting notes",
  input: QueryMeetingNotesInput,
  output: QueryMeetingNotesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/blocks/meeting_notes/query", data) as any
  },
})
