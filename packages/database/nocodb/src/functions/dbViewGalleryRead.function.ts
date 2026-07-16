import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewGalleryReadInput = z.object({
  galleryViewId: z.string().describe("Unique Gallery View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewGalleryReadOutput = z.object({
  alias: z.string().optional(),
  columns: z.array(z.object({
    fk_col_id: z.string().optional(),
    fk_gallery_id: z.string().optional(),
    help: z.string().optional(),
    id: z.string().min(0).max(20).optional().describe("Unique ID"),
    label: z.string().optional(),
  })).optional(),
  cover_image: z.string().optional(),
  cover_image_idx: z.number().int().optional(),
  deleted: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
  fk_cover_image_col_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Cover Image Column"),
  fk_model_id: z.string().optional().describe("Foreign Key to Model"),
  fk_view_id: z.string().optional().describe("Foreign Key to View"),
  lock_type: z.enum(["collaborative", "locked", "personal"]).optional(),
  next_enabled: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
  order: z.number().optional().describe("Order of Gallery"),
  prev_enabled: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
  restrict_number: z.string().optional(),
  restrict_size: z.string().optional(),
  restrict_types: z.string().optional(),
  title: z.string().optional(),
}).describe("Model for Gallery")

export const dbViewGalleryRead = pikkuSessionlessFunc({
  description: "Get the Gallery View data with Gallery ID",
  input: DbViewGalleryReadInput,
  output: DbViewGalleryReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/galleries/{galleryViewId}", data) as any
  },
})
