// Async tasks — Async task endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const RetrieveAsyncTaskInput = z.object({
  task_id: z.string().min(1).describe("The ID of the async task to retrieve."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const RetrieveAsyncTaskOutput = z.union([z.object({
  object: z.string(),
  id: z.string().min(1),
  status_url: z.string().min(1),
  created_time: z.string().datetime(),
  operation: z.object({
    surface: z.enum(["rest", "mcp"]),
    name: z.string().min(1),
  }),
  status: z.enum(["queued", "running", "retrying"]),
  poll_after_seconds: z.number().int().min(0),
}), z.object({
  object: z.string(),
  id: z.string().min(1),
  status_url: z.string().min(1),
  created_time: z.string().datetime(),
  operation: z.object({
    surface: z.enum(["rest", "mcp"]),
    name: z.string().min(1),
  }),
  status: z.string(),
  result: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.unknown(), z.array(z.union([z.string(), z.number(), z.boolean(), z.unknown(), z.any(), z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.unknown(), z.any(), z.any()]))])), z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.unknown(), z.array(z.union([z.string(), z.number(), z.boolean(), z.unknown(), z.any(), z.any()])), z.any()]))])),
}), z.object({
  object: z.string(),
  id: z.string().min(1),
  status_url: z.string().min(1),
  created_time: z.string().datetime(),
  operation: z.object({
    surface: z.enum(["rest", "mcp"]),
    name: z.string().min(1),
  }),
  status: z.string(),
  error: z.union([z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  }), z.object({
    object: z.string(),
    status: z.number().int(),
    code: z.string(),
    message: z.string().min(1),
    additional_data: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  })]),
})])

export const retrieveAsyncTask = pikkuSessionlessFunc({
  description: "Retrieve an async task",
  input: RetrieveAsyncTaskInput,
  output: RetrieveAsyncTaskOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/async_tasks/{task_id}", data) as any
  },
})
