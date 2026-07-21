// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const OrgsConvertMemberToOutsideCollaboratorInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
  async: z.boolean().optional().default(false).describe("When set to `true`, the request will be performed asynchronously. Returns a 202 status code when the job is successfully queued."),
})

export const OrgsConvertMemberToOutsideCollaboratorOutput = z.record(z.string(), z.unknown())

export const orgsConvertMemberToOutsideCollaborator = pikkuSessionlessFunc({
  description: "When an organization member is converted to an outside collaborator, they'll only have access to the repositories that their current team membership allows. The user will no longer be a member of the organization. For more information, see \"[Converting an organization member to an outside collaborator](https://docs.github.com/articles/converting-an-organization-member-to-an-outside-collaborator/)\". Converting an organization member to an outside collaborator may be restricted by enterprise administrators. For more information, see \"[Enforcing repository management policies in your enterprise](https://docs.github.com/admin/policies/enforcing-policies-for-your-enterprise/enforcing-repository-management-policies-in-your-enterprise#enforcing-a-policy-for-inviting-outside-collaborators-to-repositories).\"",
  input: OrgsConvertMemberToOutsideCollaboratorInput,
  output: OrgsConvertMemberToOutsideCollaboratorOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/outside_collaborators/{username}", data) as any
  },
})
