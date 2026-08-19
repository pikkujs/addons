// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityGetFeedsOutput = z.object({
  _links: z.object({
    current_user: z.object({
      href: z.string(),
      type: z.string(),
    }).optional().describe("Hypermedia Link with Type"),
    current_user_actor: z.object({
      href: z.string(),
      type: z.string(),
    }).optional().describe("Hypermedia Link with Type"),
    current_user_organization: z.object({
      href: z.string(),
      type: z.string(),
    }).optional().describe("Hypermedia Link with Type"),
    current_user_organizations: z.array(z.object({
      href: z.string(),
      type: z.string(),
    })).optional(),
    current_user_public: z.object({
      href: z.string(),
      type: z.string(),
    }).optional().describe("Hypermedia Link with Type"),
    repository_discussions: z.object({
      href: z.string(),
      type: z.string(),
    }).optional().describe("Hypermedia Link with Type"),
    repository_discussions_category: z.object({
      href: z.string(),
      type: z.string(),
    }).optional().describe("Hypermedia Link with Type"),
    security_advisories: z.object({
      href: z.string(),
      type: z.string(),
    }).optional().describe("Hypermedia Link with Type"),
    timeline: z.object({
      href: z.string(),
      type: z.string(),
    }).describe("Hypermedia Link with Type"),
    user: z.object({
      href: z.string(),
      type: z.string(),
    }).describe("Hypermedia Link with Type"),
  }),
  current_user_actor_url: z.string().optional(),
  current_user_organization_url: z.string().optional(),
  current_user_organization_urls: z.array(z.string().url()).optional(),
  current_user_public_url: z.string().optional(),
  current_user_url: z.string().optional(),
  repository_discussions_category_url: z.string().optional().describe("A feed of discussions for a given repository and category."),
  repository_discussions_url: z.string().optional().describe("A feed of discussions for a given repository."),
  security_advisories_url: z.string().optional(),
  timeline_url: z.string(),
  user_url: z.string(),
}).describe("Feed")

export const activityGetFeeds = pikkuSessionlessFunc({
  description: "GitHub provides several timeline resources in [Atom](http://en.wikipedia.org/wiki/Atom_(standard)) format. The Feeds API lists all the feeds available to the authenticated user:\n\n*   **Timeline**: The GitHub global public timeline\n*   **User**: The public timeline for any user, using [URI template](https://docs.github.com/rest/overview/resources-in-the-rest-api#hypermedia)\n*   **Current user public**: The public timeline for the authenticated user\n*   **Current user**: The private timeline for the authenticated user\n*   **Current user actor**: The private timeline for activity created by the authenticated user\n*   **Current user organizations**: The private timeline for the organizations the authenticated user is a member of.\n*   **Security advisories**: A collection of public announcements that provide information about security-related vulnerabilities in software on GitHub.\n\n**Note**: Private feeds are only returned when [authenticating via Basic Auth](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) since current feed URIs use the older, non revocable auth tokens.",
  output: ActivityGetFeedsOutput,
  func: async ({ github }) => {
    return github.call("GET", "/feeds") as any
  },
})
