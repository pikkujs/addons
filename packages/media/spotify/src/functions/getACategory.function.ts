import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetACategoryInput = z.object({
  category_id: z.string().describe("The [Spotify category ID](/documentation/web-api/#spotify-uris-and-ids) for the category.\n"),
  country: z.string().optional().describe("A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter to ensure that the category exists for a particular country.\n"),
  locale: z.string().optional().describe("The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n"),
})

export const GetACategoryOutput = z.object({
  href: z.string().describe("A link to the Web API endpoint returning full details of the category.\n"),
  icons: z.array(z.object({
    height: z.number().int().nullable().describe("The image height in pixels.\n"),
    url: z.string().describe("The source URL of the image.\n"),
    width: z.number().int().nullable().describe("The image width in pixels.\n"),
  })).describe("The category icon, in various sizes.\n"),
  id: z.string().describe("The [Spotify category ID](/documentation/web-api/#spotify-uris-and-ids) of the category.\n"),
  name: z.string().describe("The name of the category.\n"),
})

export const getACategory = pikkuSessionlessFunc({
  description: "Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).",
  input: GetACategoryInput,
  output: GetACategoryOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/browse/categories/{category_id}", data) as any
  },
})
