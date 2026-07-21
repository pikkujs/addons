// Project components — This resource represents project components. Use it to get, create, update, and delete project components. Also get components for project and get a count of issues by component.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteComponentInput = z.object({
  id: z.string().describe("The ID of the component."),
  moveIssuesTo: z.string().optional().describe("The ID of the component to replace the deleted component. If this value is null no replacement is made."),
})

export const deleteComponent = pikkuSessionlessFunc({
  description: "Deletes a component.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the component or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteComponentInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/component/{id}", data)
  },
})
