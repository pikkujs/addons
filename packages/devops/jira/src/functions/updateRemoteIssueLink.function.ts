// Issue remote links — This resource represents remote issue links, a way of linking Jira to information in other systems. Use it to get, create, update, and delete remote issue links either by ID or global ID. The global ID provides a way of accessing remote issue links using information about the item's remote system host and remote system identifier.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateRemoteIssueLinkInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  linkId: z.string().describe("The ID of the remote issue link."),
  application: z.object({
  name: z.string().optional().describe("The name of the application. Used in conjunction with the (remote) object icon title to display a tooltip for the link's icon. The tooltip takes the format \"\\[application name\\] icon title\". Blank items are excluded from the tooltip title. If both items are blank, the icon tooltop displays as \"Web Link\". Grouping and sorting of links may place links without an application name last."),
  type: z.string().optional().describe("The name-spaced type of the application, used by registered rendering apps."),
}).optional().describe("Details of the remote application the linked item is in. For example, trello."),
  globalId: z.string().optional().describe("An identifier for the remote item in the remote system. For example, the global ID for a remote item in Confluence would consist of the app ID and page ID, like this: `appId=456&pageId=123`.\n\nSetting this field enables the remote issue link details to be updated or deleted using remote system and item details as the record identifier, rather than using the record's Jira ID.\n\nThe maximum length is 255 characters."),
  object: z.object({
  icon: z.object({
    link: z.string().optional().describe("The URL of the tooltip, used only for a status icon. If not set, the status icon in Jira is not clickable."),
    title: z.string().optional().describe("The title of the icon. This is used as follows:\n\n *  For a status icon it is used as a tooltip on the icon. If not set, the status icon doesn't display a tooltip in Jira.\n *  For the remote object icon it is used in conjunction with the application name to display a tooltip for the link's icon. The tooltip takes the format \"\\[application name\\] icon title\". Blank itemsare excluded from the tooltip title. If both items are blank, the icon tooltop displays as \"Web Link\"."),
    url16x16: z.string().optional().describe("The URL of an icon that displays at 16x16 pixel in Jira."),
  }).optional().describe("Details of the icon for the item. If no icon is defined, the default link icon is used in Jira."),
  status: z.object({
    icon: z.object({
      link: z.string().optional().describe("The URL of the tooltip, used only for a status icon. If not set, the status icon in Jira is not clickable."),
      title: z.string().optional().describe("The title of the icon. This is used as follows:\n\n *  For a status icon it is used as a tooltip on the icon. If not set, the status icon doesn't display a tooltip in Jira.\n *  For the remote object icon it is used in conjunction with the application name to display a tooltip for the link's icon. The tooltip takes the format \"\\[application name\\] icon title\". Blank itemsare excluded from the tooltip title. If both items are blank, the icon tooltop displays as \"Web Link\"."),
      url16x16: z.string().optional().describe("The URL of an icon that displays at 16x16 pixel in Jira."),
    }).optional().describe("Details of the icon representing the status. If not provided, no status icon displays in Jira."),
    resolved: z.boolean().optional().describe("Whether the item is resolved. If set to \"true\", the link to the issue is displayed in a strikethrough font, otherwise the link displays in normal font."),
  }).optional().describe("The status of the item."),
  summary: z.string().optional().describe("The summary details of the item."),
  title: z.string().describe("The title of the item."),
  url: z.string().describe("The URL of the item."),
}).describe("Details of the item linked to."),
  relationship: z.string().optional().describe("Description of the relationship between the issue and the linked item. If not set, the relationship description \"links to\" is used in Jira."),
})

export const UpdateRemoteIssueLinkOutput = z.unknown()

export const updateRemoteIssueLink = pikkuSessionlessFunc({
  description: "Updates a remote issue link for an issue.\n\nNote: Fields without values in the request are set to null.\n\nThis operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: UpdateRemoteIssueLinkInput,
  output: UpdateRemoteIssueLinkOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}", data) as any
  },
})
