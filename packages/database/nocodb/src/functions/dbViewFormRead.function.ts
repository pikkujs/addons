import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewFormReadInput = z.object({
  formViewId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Form View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewFormReadOutput = z.object({
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  banner_image_url: z.union([z.object({
    mimetype: z.string().optional().describe("The mimetype of the attachment"),
    path: z.string().optional().describe("The attachment stored path"),
    size: z.number().optional().describe("The size of the attachment"),
    title: z.string().optional().describe("The title of the attachment used in UI"),
    url: z.string().optional().describe("The attachment stored url"),
    signedPath: z.string().optional().describe("Attachment signedPath will allow to access attachment directly"),
    signedUrl: z.string().optional().describe("Attachment signedUrl will allow to access attachment directly"),
  }), z.unknown()]).optional().describe("Banner Image URL"),
  columns: z.array(z.object({
    id: z.string().min(0).max(20).optional().describe("Unique ID"),
    description: z.union([z.string(), z.unknown()]).optional().describe("Form Column Description"),
    fk_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
    fk_view_id: z.string().min(0).max(20).optional().describe("Foreign Key to View"),
    help: z.union([z.string(), z.unknown()]).optional().describe("Form Column Help Text (Not in use)"),
    label: z.union([z.string(), z.unknown()]).optional().describe("Form Column Label"),
    meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta Info"),
    order: z.number().optional().describe("The order among all the columns in the form"),
    required: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this form column required in submission?"),
    show: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this column shown in Form?"),
    enable_scanner: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Indicates whether the 'Fill by scan' button is visible for this column or not."),
    uuid: z.union([z.string(), z.unknown()]).optional().describe("Form Column UUID (Not in use)"),
  })).optional().describe("Form Columns"),
  email: z.union([z.string(), z.unknown()]).optional().describe("Email to sned after form is submitted"),
  fk_model_id: z.string().optional().describe("Foreign Key to Model"),
  source_id: z.string().optional().describe("Source ID"),
  heading: z.string().optional().describe("The heading of the form"),
  lock_type: z.enum(["collaborative", "locked", "personal"]).optional().describe("Lock Type of this view"),
  logo_url: z.union([z.object({
    mimetype: z.string().optional().describe("The mimetype of the attachment"),
    path: z.string().optional().describe("The attachment stored path"),
    size: z.number().optional().describe("The size of the attachment"),
    title: z.string().optional().describe("The title of the attachment used in UI"),
    url: z.string().optional().describe("The attachment stored url"),
    signedPath: z.string().optional().describe("Attachment signedPath will allow to access attachment directly"),
    signedUrl: z.string().optional().describe("Attachment signedUrl will allow to access attachment directly"),
  }), z.unknown()]).optional().describe("Logo URL"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta Info for this view"),
  redirect_after_secs: z.union([z.string(), z.unknown()]).optional().describe("The numbers of seconds to redirect after form submission"),
  redirect_url: z.union([z.string(), z.unknown()]).optional().describe("URL to redirect after submission"),
  show_blank_form: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Show `Blank Form` after 5 seconds"),
  subheading: z.union([z.string(), z.unknown()]).optional().describe("The subheading of the form"),
  submit_another_form: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Show `Submit Another Form` button"),
  success_msg: z.union([z.string(), z.unknown()]).optional().describe("Custom message after the form is successfully submitted"),
  title: z.string().optional().describe("Form View Title"),
}).describe("Model for Form")

export const dbViewFormRead = pikkuSessionlessFunc({
  description: "Get the form data by Form ID",
  input: DbViewFormReadInput,
  output: DbViewFormReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/forms/{formViewId}", data) as any
  },
})
