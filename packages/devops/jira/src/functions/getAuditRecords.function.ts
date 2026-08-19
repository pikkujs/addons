// Audit records — This resource represents audits that record activities undertaken in Jira. Use it to get a list of audit records.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAuditRecordsInput = z.object({
  offset: z.number().int().optional().default(0).describe("The number of records to skip before returning the first result."),
  limit: z.number().int().optional().default(1000).describe("The maximum number of results to return."),
  filter: z.string().optional().describe("The strings to match with audit field content, space separated."),
  from: z.string().datetime().optional().describe("The date and time on or after which returned audit records must have been created. If `to` is provided `from` must be before `to` or no audit records are returned."),
  to: z.string().datetime().optional().describe("The date and time on or before which returned audit results must have been created. If `from` is provided `to` must be after `from` or no audit records are returned."),
})

export const GetAuditRecordsOutput = z.object({
  limit: z.number().int().optional().describe("The requested or default limit on the number of audit items to be returned."),
  offset: z.number().int().optional().describe("The number of audit items skipped before the first item in this list."),
  records: z.array(z.object({
    associatedItems: z.array(z.object({
      id: z.string().optional().describe("The ID of the associated record."),
      name: z.string().optional().describe("The name of the associated record."),
      parentId: z.string().optional().describe("The ID of the associated parent record."),
      parentName: z.string().optional().describe("The name of the associated parent record."),
      typeName: z.string().optional().describe("The type of the associated record."),
    })).optional().describe("The list of items associated with the changed record."),
    authorKey: z.string().optional().describe("Deprecated, use `authorAccountId` instead. The key of the user who created the audit record."),
    category: z.string().optional().describe("The category of the audit record. For a list of these categories, see the help article [Auditing in Jira applications](https://confluence.atlassian.com/x/noXKM)."),
    changedValues: z.array(z.object({
      changedFrom: z.string().optional().describe("The value of the field before the change."),
      changedTo: z.string().optional().describe("The value of the field after the change."),
      fieldName: z.string().optional().describe("The name of the field changed."),
    })).optional().describe("The list of values changed in the record event."),
    created: z.string().datetime().optional().describe("The date and time on which the audit record was created."),
    description: z.string().optional().describe("The description of the audit record."),
    eventSource: z.string().optional().describe("The event the audit record originated from."),
    id: z.number().int().optional().describe("The ID of the audit record."),
    objectItem: z.object({
      id: z.string().optional().describe("The ID of the associated record."),
      name: z.string().optional().describe("The name of the associated record."),
      parentId: z.string().optional().describe("The ID of the associated parent record."),
      parentName: z.string().optional().describe("The name of the associated parent record."),
      typeName: z.string().optional().describe("The type of the associated record."),
    }).optional().describe("Details of an item associated with the changed record."),
    remoteAddress: z.string().optional().describe("The URL of the computer where the creation of the audit record was initiated."),
    summary: z.string().optional().describe("The summary of the audit record."),
  })).optional().describe("The list of audit items."),
  total: z.number().int().optional().describe("The total number of audit items returned."),
}).describe("Container for a list of audit records.")

export const getAuditRecords = pikkuSessionlessFunc({
  description: "Returns a list of audit records. The list can be filtered to include items:\n\n *  where each item in `filter` has at least one match in any of these fields:\n    \n     *  `summary`\n     *  `category`\n     *  `eventSource`\n     *  `objectItem.name` If the object is a user, account ID is available to filter.\n     *  `objectItem.parentName`\n     *  `objectItem.typeName`\n     *  `changedValues.changedFrom`\n     *  `changedValues.changedTo`\n     *  `remoteAddress`\n    \n    For example, if `filter` contains *man ed*, an audit record containing `summary\": \"User added to group\"` and `\"category\": \"group management\"` is returned.\n *  created on or after a date and time.\n *  created or or before a date and time.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetAuditRecordsInput,
  output: GetAuditRecordsOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/auditing/record", data) as any
  },
})
