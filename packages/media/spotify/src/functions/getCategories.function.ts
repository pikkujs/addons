import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetCategoriesInput = z.object({
  country: z.string().optional().describe("A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want to narrow the list of returned categories to those relevant to a particular country. If omitted, the returned items will be globally relevant.\n"),
  locale: z.string().optional().describe("The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning \"Spanish (Mexico)\". Provide this parameter if you want the category metadata returned in a particular language. <br/>\n_**Note**: if `locale` is not supplied, or if the specified language is not available, all strings will be returned in the Spotify default language (American English). The `locale` parameter, combined with the `country` parameter, may give odd results if not carefully matched. For example `country=SE&locale=de_DE` will return a list of categories relevant to Sweden but as German language strings._\n"),
  limit: z.number().int().min(1).max(50).optional().default(20).describe("The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n"),
  offset: z.number().int().optional().default(0).describe("The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n"),
})

export const GetCategoriesOutput = z.object({
  categories: z.object({
    href: z.string().describe("A link to the Web API endpoint returning the full result of the request\n"),
    limit: z.number().int().describe("The maximum number of items in the response (as set in the query or by default).\n"),
    next: z.string().nullable().describe("URL to the next page of items. ( `null` if none)\n"),
    offset: z.number().int().describe("The offset of the items returned (as set in the query or by default)\n"),
    previous: z.string().nullable().describe("URL to the previous page of items. ( `null` if none)\n"),
    total: z.number().int().describe("The total number of items available to return.\n"),
    items: z.array(z.object({
      href: z.string().describe("A link to the Web API endpoint returning full details of the category.\n"),
      icons: z.array(z.object({
        height: z.number().int().nullable().describe("The image height in pixels.\n"),
        url: z.string().describe("The source URL of the image.\n"),
        width: z.number().int().nullable().describe("The image width in pixels.\n"),
      })).describe("The category icon, in various sizes.\n"),
      id: z.string().describe("The [Spotify category ID](/documentation/web-api/#spotify-uris-and-ids) of the category.\n"),
      name: z.string().describe("The name of the category.\n"),
    })),
  }),
})

export const getCategories = pikkuSessionlessFunc({
  description: "Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).",
  input: GetCategoriesInput,
  output: GetCategoriesOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/browse/categories", data) as any
  },
})
