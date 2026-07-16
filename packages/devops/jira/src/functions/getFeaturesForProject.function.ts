// Project features — This resource represents project features. Use it to get the list of features for a project and modify the state of a feature. The project feature endpoint is available only for Jira Software, both for team- and company-managed projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetFeaturesForProjectInput = z.object({
  projectIdOrKey: z.string().describe("The ID or (case-sensitive) key of the project."),
})

export const GetFeaturesForProjectOutput = z.object({
  features: z.array(z.object({
    feature: z.string().optional().describe("The key of the feature."),
    imageUri: z.string().optional().describe("URI for the image representing the feature."),
    localisedDescription: z.string().optional().describe("Localized display description for the feature."),
    localisedName: z.string().optional().describe("Localized display name for the feature."),
    prerequisites: z.array(z.string()).optional().describe("List of keys of the features required to enable the feature."),
    projectId: z.number().int().optional().describe("The ID of the project."),
    state: z.enum(["ENABLED", "DISABLED", "COMING_SOON"]).optional().describe("The state of the feature. When updating the state of a feature, only ENABLED and DISABLED are supported. Responses can contain all values"),
    toggleLocked: z.boolean().optional().describe("Whether the state of the feature can be updated."),
  })).optional().describe("The project features."),
}).describe("The list of features on a project.")

export const getFeaturesForProject = pikkuSessionlessFunc({
  description: "Returns the list of features for a project.",
  input: GetFeaturesForProjectInput,
  output: GetFeaturesForProjectOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}/features", data) as any
  },
})
