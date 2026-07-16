// Issue properties — This resource represents [issue](#api-group-Issues) properties, which provides for storing custom data against an issue. Use it to get, set, and delete issue properties as well as obtain details of all properties on an issue. Operations to bulk update and delete issue properties are also provided. Issue properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const BulkSetIssuePropertiesByIssueInput = z.object({
  issues: z.array(z.object({
  issueID: z.number().int().optional().describe("The ID of the issue."),
  properties: z.record(z.string(), z.object({
    array: z.boolean().optional(),
    bigDecimal: z.boolean().optional(),
    bigInteger: z.boolean().optional(),
    bigIntegerValue: z.number().int().optional(),
    binary: z.boolean().optional(),
    binaryValue: z.array(z.string()).optional(),
    boolean: z.boolean().optional(),
    booleanValue: z.boolean().optional(),
    containerNode: z.boolean().optional(),
    decimalValue: z.number().optional(),
    double: z.boolean().optional(),
    doubleValue: z.number().optional(),
    elements: z.record(z.string(), z.unknown()).optional(),
    fieldNames: z.record(z.string(), z.unknown()).optional(),
    fields: z.record(z.string(), z.unknown()).optional(),
    floatingPointNumber: z.boolean().optional(),
    int: z.boolean().optional(),
    intValue: z.number().int().optional(),
    integralNumber: z.boolean().optional(),
    long: z.boolean().optional(),
    longValue: z.number().int().optional(),
    missingNode: z.boolean().optional(),
    null: z.boolean().optional(),
    number: z.boolean().optional(),
    numberType: z.enum(["INT", "LONG", "BIG_INTEGER", "FLOAT", "DOUBLE", "BIG_DECIMAL"]).optional(),
    numberValue: z.number().optional(),
    object: z.boolean().optional(),
    pojo: z.boolean().optional(),
    textValue: z.string().optional(),
    textual: z.boolean().optional(),
    valueAsBoolean: z.boolean().optional(),
    valueAsDouble: z.number().optional(),
    valueAsInt: z.number().int().optional(),
    valueAsLong: z.number().int().optional(),
    valueAsText: z.string().optional(),
    valueNode: z.boolean().optional(),
  })).optional().describe("Entity properties to set on the issue. The maximum length of an issue property value is 32768 characters."),
})).optional().describe("A list of issue IDs and their respective properties."),
})

export const bulkSetIssuePropertiesByIssue = pikkuSessionlessFunc({
  description: "Sets or updates entity property values on issues. Up to 10 entity properties can be specified for each issue and up to 100 issues included in the request.\n\nThe value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON.\n\nThis operation is:\n\n *  [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.\n *  non-transactional. Updating some entities may fail. Such information will available in the task result.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* and *Edit issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: BulkSetIssuePropertiesByIssueInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issue/properties/multi", data)
  },
})
