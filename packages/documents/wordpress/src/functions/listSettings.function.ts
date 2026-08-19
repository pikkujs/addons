import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListSettingsOutput = z.object({
  title: z.string().optional().describe("Site title."),
  description: z.string().optional().describe("Site tagline."),
  url: z.string().url().optional().describe("Site URL."),
  email: z.string().email().optional().describe("This address is used for admin purposes, like new user notification."),
  timezone: z.string().optional().describe("A city in the same timezone as you."),
  date_format: z.string().optional().describe("A date format for all date strings."),
  time_format: z.string().optional().describe("A time format for all time strings."),
  start_of_week: z.number().int().optional().describe("A day number of the week that the week should start on."),
  language: z.string().optional().default("en_US").describe("WordPress locale code."),
  use_smilies: z.boolean().optional().default(true).describe("Convert emoticons like :-) and :-P to graphics on display."),
  default_category: z.number().int().optional().describe("Default post category."),
  default_post_format: z.string().optional().describe("Default post format."),
  posts_per_page: z.number().int().optional().default(10).describe("Blog pages show at most."),
  show_on_front: z.string().optional().describe("What to show on the front page"),
  page_on_front: z.number().int().optional().describe("The ID of the page that should be displayed on the front page"),
  page_for_posts: z.number().int().optional().describe("The ID of the page that should display the latest posts"),
  default_ping_status: z.enum(["open", "closed"]).optional().describe("Allow link notifications from other blogs (pingbacks and trackbacks) on new articles."),
  default_comment_status: z.enum(["open", "closed"]).optional().describe("Allow people to submit comments on new posts."),
  site_logo: z.number().int().optional().describe("Site logo."),
  site_icon: z.number().int().optional().describe("Site icon."),
})

export const listSettings = pikkuSessionlessFunc({
  output: ListSettingsOutput,
  func: async ({ wordpress }) => {
    return wordpress.call("GET", "/settings") as any
  },
})
