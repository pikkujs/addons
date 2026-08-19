// Jira expressions — This resource is a collection of operations for [Jira expressions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const EvaluateJiraExpressionInput = z.object({
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts `meta.complexity` that returns information about the expression complexity. For example, the number of expensive operations used by the expression and how close the expression is to reaching the [complexity limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing and debugging your expressions."),
  context: z.object({
  board: z.number().int().optional().describe("The ID of the board that is available under the `board` variable when evaluating the expression."),
  custom: z.array(z.union([z.object({
    accountId: z.string().describe("The account ID of the user."),
    type: z.string().describe("Type of custom context variable."),
  }), z.object({
    id: z.number().int().optional().describe("The issue ID."),
    key: z.string().optional().describe("The issue key."),
    type: z.string().describe("Type of custom context variable."),
  }), z.object({
    type: z.string().describe("Type of custom context variable."),
    value: z.record(z.string(), z.unknown()).optional().describe("A JSON object containing custom content."),
  })])).optional().describe("Custom context variables and their types. These variable types are available for use in a custom context:\n\n *  `user`: A [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an Atlassian account ID.\n *  `issue`: An [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID or key. All the fields of the issue object are available in the Jira expression.\n *  `json`: A JSON object containing custom content.\n *  `list`: A JSON list of `user`, `issue`, or `json` variable types."),
  customerRequest: z.number().int().optional().describe("The ID of the customer request that is available under the `customerRequest` variable when evaluating the expression. This is the same as the ID of the underlying Jira issue, but the customer request context variable will have a different type."),
  issue: z.object({
    id: z.number().int().optional().describe("The ID of the referenced item."),
    key: z.string().optional().describe("The key of the referenced item."),
  }).optional().describe("The issue that is available under the `issue` variable when evaluating the expression."),
  issues: z.object({
    jql: z.object({
      maxResults: z.number().int().optional().describe("The maximum number of issues to return from the JQL query. Inspect `meta.issues.jql.maxResults` in the response to ensure the maximum value has not been exceeded."),
      query: z.string().optional().describe("The JQL query."),
      startAt: z.number().int().optional().describe("The index of the first issue to return from the JQL query."),
      validation: z.enum(["strict", "warn", "none"]).optional().default("strict").describe("Determines how to validate the JQL query and treat the validation results."),
    }).optional().describe("The JQL query that specifies the set of issues available in the Jira expression."),
  }).optional().describe("The collection of issues that is available under the `issues` variable when evaluating the expression."),
  project: z.object({
    id: z.number().int().optional().describe("The ID of the referenced item."),
    key: z.string().optional().describe("The key of the referenced item."),
  }).optional().describe("The project that is available under the `project` variable when evaluating the expression."),
  serviceDesk: z.number().int().optional().describe("The ID of the service desk that is available under the `serviceDesk` variable when evaluating the expression."),
  sprint: z.number().int().optional().describe("The ID of the sprint that is available under the `sprint` variable when evaluating the expression."),
}).optional().describe("The context in which the Jira expression is evaluated."),
  expression: z.string().describe("The Jira expression to evaluate."),
})

export const EvaluateJiraExpressionOutput = z.object({
  meta: z.object({
    complexity: z.object({
      beans: z.object({
        limit: z.number().int().describe("The maximum allowed complexity. The evaluation will fail if this value is exceeded."),
        value: z.number().int().describe("The complexity value of the current expression."),
      }).describe("The number of Jira REST API beans returned in the response."),
      expensiveOperations: z.object({
        limit: z.number().int().describe("The maximum allowed complexity. The evaluation will fail if this value is exceeded."),
        value: z.number().int().describe("The complexity value of the current expression."),
      }).describe("The number of expensive operations executed while evaluating the expression. Expensive operations are those that load additional data, such as entity properties, comments, or custom fields."),
      primitiveValues: z.object({
        limit: z.number().int().describe("The maximum allowed complexity. The evaluation will fail if this value is exceeded."),
        value: z.number().int().describe("The complexity value of the current expression."),
      }).describe("The number of primitive values returned in the response."),
      steps: z.object({
        limit: z.number().int().describe("The maximum allowed complexity. The evaluation will fail if this value is exceeded."),
        value: z.number().int().describe("The complexity value of the current expression."),
      }).describe("The number of steps it took to evaluate the expression, where a step is a high-level operation performed by the expression. A step is an operation such as arithmetic, accessing a property, accessing a context variable, or calling a function."),
    }).optional().describe("Contains information about the expression complexity. For example, the number of steps it took to evaluate the expression."),
    issues: z.object({
      jql: z.object({
        count: z.number().int().describe("The number of issues that were loaded in this evaluation."),
        maxResults: z.number().int().describe("The maximum number of issues that could be loaded in this evaluation."),
        startAt: z.number().int().describe("The index of the first issue."),
        totalCount: z.number().int().describe("The total number of issues the JQL returned."),
        validationWarnings: z.array(z.string()).optional().describe("Any warnings related to the JQL query. Present only if the validation mode was set to `warn`."),
      }).optional().describe("The description of the page of issues loaded by the provided JQL query."),
    }).optional().describe("Contains information about the `issues` variable in the context. For example, is the issues were loaded with JQL, information about the page will be included here."),
  }).optional().describe("Contains various characteristics of the performed expression evaluation."),
  value: z.unknown().describe("The value of the evaluated expression. It may be a primitive JSON value or a Jira REST API object. (Some expressions do not produce any meaningful results—for example, an expression that returns a lambda function—if that's the case a simple string representation is returned. These string representations should not be relied upon and may change without notice.)"),
}).describe("The result of evaluating a Jira expression.")

export const evaluateJiraExpression = pikkuSessionlessFunc({
  description: "Evaluates a Jira expression and returns its value.\n\nThis resource can be used to test Jira expressions that you plan to use elsewhere, or to fetch data in a flexible way. Consult the [Jira expressions documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/) for more details.\n\n#### Context variables ####\n\nThe following context variables are available to Jira expressions evaluated by this resource. Their presence depends on various factors; usually you need to manually request them in the context object sent in the payload, but some of them are added automatically under certain conditions.\n\n *  `user` ([User](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)): The current user. Always available and equal to `null` if the request is anonymous.\n *  `app` ([App](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#app)): The [Connect app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps) that made the request. Available only for authenticated requests made by Connect Apps (read more here: [Authentication for Connect apps](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/)).\n *  `issue` ([Issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): The current issue. Available only when the issue is provided in the request context object.\n *  `issues` ([List](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#list) of [Issues](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): A collection of issues matching a JQL query. Available only when JQL is provided in the request context object.\n *  `project` ([Project](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#project)): The current project. Available only when the project is provided in the request context object.\n *  `sprint` ([Sprint](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#sprint)): The current sprint. Available only when the sprint is provided in the request context object.\n *  `board` ([Board](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#board)): The current board. Available only when the board is provided in the request context object.\n *  `serviceDesk` ([ServiceDesk](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#servicedesk)): The current service desk. Available only when the service desk is provided in the request context object.\n *  `customerRequest` ([CustomerRequest](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#customerrequest)): The current customer request. Available only when the customer request is provided in the request context object.\n\nAlso, custom context variables can be passed in the request with their types. Those variables can be accessed by key in the Jira expression. These variable types are available for use in a custom context:\n\n *  `user`: A [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an Atlassian account ID.\n *  `issue`: An [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID or key. All the fields of the issue object are available in the Jira expression.\n *  `json`: A JSON object containing custom content.\n *  `list`: A JSON list of `user`, `issue`, or `json` variable types.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required**: None. However, an expression may return different results for different users depending on their permissions. For example, different users may see different comments on the same issue.  \nPermission to access Jira Software is required to access Jira Software context variables (`board` and `sprint`) or fields (for example, `issue.sprint`).",
  input: EvaluateJiraExpressionInput,
  output: EvaluateJiraExpressionOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/expression/eval", data) as any
  },
})
