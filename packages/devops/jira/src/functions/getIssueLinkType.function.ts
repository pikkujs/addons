// Issue link types — This resource represents [issue link](#api-group-Issue-links) types. Use it to get, create, update, and delete link issue types as well as get lists of all link issue types. To use it, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetIssueLinkTypeInput = z.object({
  issueLinkTypeId: z.string().describe("The ID of the issue link type."),
})

export const GetIssueLinkTypeOutput = z.object({
  id: z.string().optional().describe("The ID of the issue link type and is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `name` isn't provided. Otherwise, read only.\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is read only."),
  inward: z.string().optional().describe("The description of the issue link type inward link and is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only."),
  name: z.string().optional().describe("The name of the issue link type and is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `id` isn't provided. Otherwise, read only.\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only."),
  outward: z.string().optional().describe("The description of the issue link type outward link and is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only."),
  self: z.string().url().optional().describe("The URL of the issue link type. Read only."),
}).describe("This object is used as follows:\n\n *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it defines and reports on the type of link between the issues. Find a list of issue link types with [Get issue link types](#api-rest-api-3-issueLinkType-get).\n *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it defines and reports on issue link types.")

export const getIssueLinkType = pikkuSessionlessFunc({
  description: "Returns an issue link type.\n\nTo use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.",
  input: GetIssueLinkTypeInput,
  output: GetIssueLinkTypeOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issueLinkType/{issueLinkTypeId}", data) as any
  },
})
