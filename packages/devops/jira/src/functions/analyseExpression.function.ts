// Jira expressions — This resource is a collection of operations for [Jira expressions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AnalyseExpressionInput = z.object({
  check: z.enum(["syntax", "type", "complexity"]).optional().default("syntax").describe("The check to perform:\n\n *  `syntax` Each expression's syntax is checked to ensure the expression can be parsed. Also, syntactic limits are validated. For example, the expression's length.\n *  `type` EXPERIMENTAL. Each expression is type checked and the final type of the expression inferred. Any type errors that would result in the expression failure at runtime are reported. For example, accessing properties that don't exist or passing the wrong number of arguments to functions. Also performs the syntax check.\n *  `complexity` EXPERIMENTAL. Determines the formulae for how many [expensive operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) each expression may execute."),
  contextVariables: z.record(z.string(), z.string().describe("Context variables and their types. The type checker assumes that <a href=\"https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables\">common context variables</a>, such as <code>issue</code> or <code>project</code>, are available in context and sets their type. Use this property to override the default types or provide details of new variables.")).optional().describe("Context variables and their types. The type checker assumes that [common context variables](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables), such as `issue` or `project`, are available in context and sets their type. Use this property to override the default types or provide details of new variables."),
  expressions: z.array(z.string()).describe("The list of Jira expressions to analyse."),
})

export const AnalyseExpressionOutput = z.object({
  results: z.array(z.object({
    complexity: z.object({
      expensiveOperations: z.string().describe("Information that can be used to determine how many [expensive operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) the evaluation of the expression will perform. This information may be a formula or number. For example:\n\n *  `issues.map(i => i.comments)` performs as many expensive operations as there are issues on the issues list. So this parameter returns `N`, where `N` is the size of issue list.\n *  `new Issue(10010).comments` gets comments for one issue, so its complexity is `2` (`1` to retrieve issue 10010 from the database plus `1` to get its comments)."),
      variables: z.record(z.string(), z.string().describe("Variables used in the formula, mapped to the parts of the expression they refer to.")).optional().describe("Variables used in the formula, mapped to the parts of the expression they refer to."),
    }).optional().describe("Details about the complexity of the analysed Jira expression."),
    errors: z.array(z.object({
      column: z.number().int().optional().describe("The text column in which the error occurred."),
      expression: z.string().optional().describe("The part of the expression in which the error occurred."),
      line: z.number().int().optional().describe("The text line in which the error occurred."),
      message: z.string().describe("Details about the error."),
      type: z.enum(["syntax", "type", "other"]).describe("The error type."),
    })).optional().describe("A list of validation errors. Not included if the expression is valid."),
    expression: z.string().describe("The analysed expression."),
    type: z.string().optional().describe("EXPERIMENTAL. The inferred type of the expression."),
    valid: z.boolean().describe("Whether the expression is valid and the interpreter will evaluate it. Note that the expression may fail at runtime (for example, if it executes too many expensive operations)."),
  })).describe("The results of Jira expressions analysis."),
}).describe("Details about the analysed Jira expression.")

export const analyseExpression = pikkuSessionlessFunc({
  description: "Analyses and validates Jira expressions.\n\nAs an experimental feature, this operation can also attempt to type-check the expressions.\n\nLearn more about Jira expressions in the [documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).\n\n**[Permissions](#permissions) required**: None.",
  input: AnalyseExpressionInput,
  output: AnalyseExpressionOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/expression/analyse", data) as any
  },
})
