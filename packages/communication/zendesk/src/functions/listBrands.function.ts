import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListBrandsInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Cursor pagination parameters using deepObject format.\n\nUse `?page[size]=50&page[after]=cursor` to paginate through results.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n\n(Marked internal-only because only used with traditional offset pagination,\nwhich is only supported for internal/bime requests)\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
  assignable_from: z.number().int().optional().describe("Filters brands to only those assignable from the specified brand ID. A brand-separated brand is only assignable to itself, while account-separated brands are assignable to all other account-separated brands."),
  include_deleted: z.boolean().optional().describe("When true, includes soft-deleted brands in the response."),
})

export const ListBrandsOutput = z.object({
  count: z.number().int().optional().describe("the total record count"),
  next_page: z.string().url().nullable().optional().describe("the URL of the next page"),
  previous_page: z.string().url().nullable().optional().describe("the URL of the previous page"),
  brands: z.array(z.object({
    active: z.boolean().optional().describe("If the brand is set as active"),
    brand_url: z.string().optional().describe("The url of the brand"),
    created_at: z.string().datetime().optional().describe("The time the brand was created"),
    default: z.boolean().optional().describe("Is the brand the default brand for this account"),
    has_help_center: z.boolean().optional().describe("If the brand has a Help Center"),
    help_center_state: z.enum(["enabled", "disabled", "restricted"]).optional().describe("The state of the Help Center"),
    host_mapping: z.string().optional().describe("The hostmapping to this brand, if any. Only admins view this property."),
    id: z.number().int().optional().describe("The ID automatically assigned when the brand is created"),
    is_deleted: z.boolean().optional().describe("If the brand object is deleted or not"),
    logo: z.object({
      content_type: z.string().optional().describe("The content type of the image. Example value: \"image/png\""),
      content_url: z.string().optional().describe("A full URL where the attachment image file can be downloaded. The file may be hosted externally so take care not to inadvertently send Zendesk authentication credentials. See [Working with url properties](/documentation/api-basics/best-practices/working-with-url-properties/)"),
      deleted: z.boolean().optional().describe("If true, the attachment has been deleted"),
      file_name: z.string().optional().describe("The name of the image file"),
      height: z.number().int().optional().describe("The height of the image file in pixels. If height is unknown, returns null"),
      id: z.number().int().optional().describe("Automatically assigned when created"),
      inline: z.boolean().optional().describe("If true, the attachment is excluded from the attachment list and the attachment's URL\ncan be referenced within the comment of a ticket. Default is false\n"),
      malware_access_override: z.boolean().optional().describe("If true, you can download an attachment flagged as malware. If false, you can't download such an attachment."),
      malware_scan_result: z.string().optional().describe("The result of the malware scan. There is a delay between the time the attachment is uploaded and when the malware scan is completed. Usually the scan is done within a few seconds, but high load conditions can delay the scan results. Possible values: \"malware_found\", \"malware_not_found\", \"failed_to_scan\", \"not_scanned\""),
      mapped_content_url: z.string().optional().describe("The URL the attachment image file has been mapped to"),
      size: z.number().int().optional().describe("The size of the image file in bytes"),
      url: z.string().optional().describe("A URL to access the attachment details"),
      width: z.number().int().optional().describe("The width of the image file in pixels. If width is unknown, returns null"),
      thumbnails: z.array(z.object({
        content_type: z.string().optional().describe("The content type of the image. Example value: \"image/png\""),
        content_url: z.string().optional().describe("A full URL where the attachment image file can be downloaded. The file may be hosted externally so take care not to inadvertently send Zendesk authentication credentials. See [Working with url properties](/documentation/api-basics/best-practices/working-with-url-properties/)"),
        deleted: z.boolean().optional().describe("If true, the attachment has been deleted"),
        file_name: z.string().optional().describe("The name of the image file"),
        height: z.number().int().optional().describe("The height of the image file in pixels. If height is unknown, returns null"),
        id: z.number().int().optional().describe("Automatically assigned when created"),
        inline: z.boolean().optional().describe("If true, the attachment is excluded from the attachment list and the attachment's URL\ncan be referenced within the comment of a ticket. Default is false\n"),
        malware_access_override: z.boolean().optional().describe("If true, you can download an attachment flagged as malware. If false, you can't download such an attachment."),
        malware_scan_result: z.string().optional().describe("The result of the malware scan. There is a delay between the time the attachment is uploaded and when the malware scan is completed. Usually the scan is done within a few seconds, but high load conditions can delay the scan results. Possible values: \"malware_found\", \"malware_not_found\", \"failed_to_scan\", \"not_scanned\""),
        mapped_content_url: z.string().optional().describe("The URL the attachment image file has been mapped to"),
        size: z.number().int().optional().describe("The size of the image file in bytes"),
        url: z.string().optional().describe("A URL to access the attachment details"),
        width: z.number().int().optional().describe("The width of the image file in pixels. If width is unknown, returns null"),
      })).optional().describe("An array of attachment objects. Note that photo thumbnails do not have thumbnails"),
    }).optional().describe("A file represented as an [Attachment](/api-reference/ticketing/tickets/ticket-attachments/) object"),
    name: z.string().describe("The name of the brand"),
    signature_template: z.string().optional().describe("The signature template for a brand"),
    subdomain: z.string().describe("The subdomain of the brand"),
    ticket_form_ids: z.array(z.number().int()).optional().describe("The ids of ticket forms that are available for use by a brand"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the brand"),
    url: z.string().optional().describe("The API url of this brand"),
    user_separation: z.enum(["account", "brand"]).optional().describe("The user separation scope for the brand. When set to \"brand\", users created on this brand are isolated to it. When set to \"account\", users are shared across all account-scoped brands."),
  })).optional().describe("Array of brands"),
})

export const listBrands = pikkuSessionlessFunc({
  description: "Returns a list of all brands for your account sorted by name.\n\n#### Allowed for\n\n* Admins\n* Agents with the `assign_tickets_to_any_brand` permission can list all brands for the account\n* Agents without the `assign_tickets_to_any_brand` permission can only list brands they are members of\n\n#### Pagination\n\n* Cursor pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).",
  input: ListBrandsInput,
  output: ListBrandsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/brands", data) as any
  },
})
