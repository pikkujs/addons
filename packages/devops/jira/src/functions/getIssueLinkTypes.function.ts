// Issue link types — This resource represents [issue link](#api-group-Issue-links) types. Use it to get, create, update, and delete link issue types as well as get lists of all link issue types. To use it, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetIssueLinkTypesOutput = z.object({
  issueLinkTypes: z.array(z.object({
    id: z.string().optional().describe("The ID of the issue link type and is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `name` isn't provided. Otherwise, read only.\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is read only."),
    inward: z.string().optional().describe("The description of the issue link type inward link and is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only."),
    name: z.string().optional().describe("The name of the issue link type and is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `id` isn't provided. Otherwise, read only.\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only."),
    outward: z.string().optional().describe("The description of the issue link type outward link and is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only."),
    self: z.string().url().optional().describe("The URL of the issue link type. Read only."),
  })).optional().describe("The issue link type bean."),
}).describe("A list of issue link type beans.")

export const getIssueLinkTypes = pikkuSessionlessFunc({
  description: "Returns a list of all issue link types.\n\nTo use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.",
  output: GetIssueLinkTypesOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/issueLinkType") as any
  },
})
