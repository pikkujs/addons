// Issue navigator settings — This resource represents issue navigator settings. Use it to get and set issue navigator default columns.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const SetIssueNavigatorDefaultColumnsInput = z.object({
  body: z.array(z.string()),
})

export const SetIssueNavigatorDefaultColumnsOutput = z.unknown()

export const setIssueNavigatorDefaultColumns = pikkuSessionlessFunc({
  description: "Sets the default issue navigator columns.\n\nThe `columns` parameter accepts a navigable field value and is expressed as HTML form data. To specify multiple columns, pass multiple `columns` parameters. For example, in curl:\n\n`curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/3/settings/columns`\n\nIf no column details are sent, then all default columns are removed.\n\nA navigable field is one that can be used as a column on the issue navigator. Find details of navigable issue columns using [Get fields](#api-rest-api-3-field-get).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SetIssueNavigatorDefaultColumnsInput,
  output: SetIssueNavigatorDefaultColumnsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/settings/columns", data) as any
  },
})
