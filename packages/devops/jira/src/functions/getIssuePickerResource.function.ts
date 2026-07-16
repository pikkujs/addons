// Issue search — This resource represents various ways to search for issues. Use it to search for issues with a JQL query and find issues to populate an issue picker.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetIssuePickerResourceInput = z.object({
  query: z.string().optional().describe("A string to match against text fields in the issue such as title, description, or comments."),
  currentJQL: z.string().optional().describe("A JQL query defining a list of issues to search for the query term. Note that `username` and `userkey` cannot be used as search terms for this parameter, due to privacy reasons. Use `accountId` instead."),
  currentIssueKey: z.string().optional().describe("The key of an issue to exclude from search results. For example, the issue the user is viewing when they perform this query."),
  currentProjectId: z.string().optional().describe("The ID of a project that suggested issues must belong to."),
  showSubTasks: z.boolean().optional().describe("Indicate whether to include subtasks in the suggestions list."),
  showSubTaskParent: z.boolean().optional().describe("When `currentIssueKey` is a subtask, whether to include the parent issue in the suggestions if it matches the query."),
})

export const GetIssuePickerResourceOutput = z.object({
  sections: z.array(z.object({
    id: z.string().optional().describe("The ID of the type of issues suggested for use in auto-completion."),
    issues: z.array(z.object({
      id: z.number().int().optional().describe("The ID of the issue."),
      img: z.string().optional().describe("The URL of the issue type's avatar."),
      key: z.string().optional().describe("The key of the issue."),
      keyHtml: z.string().optional().describe("The key of the issue in HTML format."),
      summary: z.string().optional().describe("The phrase containing the query string in HTML format, with the string highlighted with HTML bold tags."),
      summaryText: z.string().optional().describe("The phrase containing the query string, as plain text."),
    })).optional().describe("A list of issues suggested for use in auto-completion."),
    label: z.string().optional().describe("The label of the type of issues suggested for use in auto-completion."),
    msg: z.string().optional().describe("If no issue suggestions are found, returns a message indicating no suggestions were found,"),
    sub: z.string().optional().describe("If issue suggestions are found, returns a message indicating the number of issues suggestions found and returned."),
  })).optional().describe("A list of issues for an issue type suggested for use in auto-completion."),
}).describe("A list of issues suggested for use in auto-completion.")

export const getIssuePickerResource = pikkuSessionlessFunc({
  description: "Returns lists of issues matching a query string. Use this resource to provide auto-completion suggestions when the user is looking for an issue using a word or string.\n\nThis operation returns two lists:\n\n *  `History Search` which includes issues from the user's history of created, edited, or viewed issues that contain the string in the `query` parameter.\n *  `Current Search` which includes issues that match the JQL expression in `currentJQL` and contain the string in the `query` parameter.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetIssuePickerResourceInput,
  output: GetIssuePickerResourceOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issue/picker", data) as any
  },
})
