// App migration — This resource supports [app migrations](https://developer.atlassian.com/platform/app-migration/). Use it to: - [to request migrated workflow rules details](https://developer.atlassian.com/platform/app-migration/tutorials/migration-app-workflow-rules/). - [perform bulk updates of entity properties](https://developer.atlassian.com/platform/app-migration/tutorials/entity-properties-bulk-api/). - [perform bulk updates of issue custom field values](https://developer.atlassian.com/platform/app-migration/tutorials/migrating-app-custom-fields/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const MigrationResourceUpdateEntityPropertiesValuePutInput = z.object({
  entityType: z.enum(["IssueProperty", "CommentProperty", "DashboardItemProperty", "IssueTypeProperty", "ProjectProperty", "UserProperty", "WorklogProperty", "BoardProperty", "SprintProperty"]).describe("The type indicating the object that contains the entity properties."),
  "Atlassian-Transfer-Id": z.string().uuid().describe("The app migration transfer ID."),
  body: z.array(z.object({
  entityId: z.number().describe("The entity property ID."),
  key: z.string().describe("The entity property key."),
  value: z.string().describe("The new value of the entity property."),
})).min(1).max(50),
})

export const migrationResourceUpdateEntityPropertiesValuePut = pikkuSessionlessFunc({
  description: "Updates the values of multiple entity properties for an object, up to 50 updates per request. This operation is for use by Connect apps during app migration.",
  input: MigrationResourceUpdateEntityPropertiesValuePutInput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/atlassian-connect/1/migration/properties/{entityType}", data)
  },
})
