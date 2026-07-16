// Issue comments — This resource represents issue comments. Use it to: * get, create, update, and delete a comment from an issue. * get all comments from issue. * get a list of comments by comment ID.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetCommentsInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(5000).describe("The maximum number of items to return per page."),
  orderBy: z.enum(["created", "-created", "+created"]).optional().describe("[Order](#ordering) the results by a field. Accepts *created* to sort comments by their created date."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML."),
})

export const GetCommentsOutput = z.object({
  comments: z.array(z.object({
    author: z.object({
      accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
      accountType: z.string().optional().describe("The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user)"),
      active: z.boolean().optional().describe("Whether the user is active."),
      avatarUrls: z.object({
        "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
        "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
        "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
        "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
      }).optional().describe("The avatars of the user."),
      displayName: z.string().optional().describe("The display name of the user. Depending on the user’s privacy settings, this may return an alternative value."),
      emailAddress: z.string().optional().describe("The email address of the user. Depending on the user’s privacy settings, this may be returned as null."),
      key: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
      name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
      self: z.string().optional().describe("The URL of the user."),
      timeZone: z.string().optional().describe("The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null."),
    }).optional().describe("The ID of the user who created the comment."),
    body: z.unknown().optional().describe("The comment text in [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/)."),
    created: z.string().datetime().optional().describe("The date and time at which the comment was created."),
    id: z.string().optional().describe("The ID of the comment."),
    jsdAuthorCanSeeRequest: z.boolean().optional().describe("Whether the comment was added from an email sent by a person who is not part of the issue. See [Allow external emails to be added as comments on issues](https://support.atlassian.com/jira-service-management-cloud/docs/allow-external-emails-to-be-added-as-comments-on-issues/)for information on setting up this feature."),
    jsdPublic: z.boolean().optional().describe("Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its visibility in Jira Service Desk set to false, use the Jira Service Desk REST API [Create request comment](https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post) operation."),
    properties: z.array(z.object({
      key: z.string().optional().describe("The key of the property. Required on create and update."),
      value: z.unknown().optional().describe("The value of the property. Required on create and update."),
    })).optional().describe("A list of comment properties. Optional on create and update."),
    renderedBody: z.string().optional().describe("The rendered version of the comment."),
    self: z.string().optional().describe("The URL of the comment."),
    updateAuthor: z.object({
      accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
      accountType: z.string().optional().describe("The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user)"),
      active: z.boolean().optional().describe("Whether the user is active."),
      avatarUrls: z.object({
        "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
        "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
        "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
        "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
      }).optional().describe("The avatars of the user."),
      displayName: z.string().optional().describe("The display name of the user. Depending on the user’s privacy settings, this may return an alternative value."),
      emailAddress: z.string().optional().describe("The email address of the user. Depending on the user’s privacy settings, this may be returned as null."),
      key: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
      name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
      self: z.string().optional().describe("The URL of the user."),
      timeZone: z.string().optional().describe("The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null."),
    }).optional().describe("The ID of the user who updated the comment last."),
    updated: z.string().datetime().optional().describe("The date and time at which the comment was updated last."),
    visibility: z.object({
      identifier: z.string().nullable().optional().describe("The ID of the group or the name of the role that visibility of this item is restricted to."),
      type: z.enum(["group", "role"]).optional().describe("Whether visibility of this item is restricted to a group or role."),
      value: z.string().optional().describe("The name of the group or role that visibility of this item is restricted to. Please note that the name of a group is mutable, to reliably identify a group use `identifier`."),
    }).optional().describe("The group or role to which this comment is visible. Optional on create and update."),
  })).optional().describe("The list of comments."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
}).describe("A page of comments.")

export const getComments = pikkuSessionlessFunc({
  description: "Returns all comments for an issue.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** Comments are included in the response where the user has:\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is restricted to.",
  input: GetCommentsInput,
  output: GetCommentsOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issue/{issueIdOrKey}/comment", data) as any
  },
})
