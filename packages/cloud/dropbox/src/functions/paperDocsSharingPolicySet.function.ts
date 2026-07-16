import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaperDocsSharingPolicySetInput = z.object({
  doc_id: z.string().optional().describe("The Paper doc ID."),
  sharing_policy: z.object({
  team_sharing_policy: z.object({
    ".tag": z.enum(["people_with_link_can_edit", "people_with_link_can_view_and_comment", "invite_only"]).optional(),
  }).optional().describe("The sharing policy type of the Paper doc.\npeople_with_link_can_edit: Users who have a link to this doc can edit it.\npeople_with_link_can_view_and_comment: Users who have a link to this doc can view and comment on it.\ninvite_only: Users must be explicitly invited to this doc.\n"),
  public_sharing_policy: z.object({
    ".tag": z.enum(["people_with_link_can_edit", "people_with_link_can_view_and_comment", "invite_only", "disabled"]).optional(),
  }).optional().describe("people_with_link_can_edit: Users who have a link to this doc can edit it.\npeople_with_link_can_view_and_comment: Users who have a link to this doc can view and comment on it.\ninvite_only: Users must be explicitly invited to this doc.\ndisabled: Value used to indicate that doc sharing is enabled only within team.\n"),
}).optional().describe("Sharing policy of Paper doc.\npublic_sharing_policy: This value applies to the non-team members.\nteam_sharing_policy: This value applies to the team members only. The value is null for all personal accounts.\n"),
})

export const PaperDocsSharingPolicySetOutput = z.unknown()

export const paperDocsSharingPolicySet = pikkuSessionlessFunc({
  description: "Sets the default sharing policy for the given Paper doc. The default 'team_sharing_policy' can be changed only by teams, omit this field for personal accounts.\n\nNote: 'public_sharing_policy' cannot be set to the value 'disabled' because this setting can be changed only via the team admin console.",
  input: PaperDocsSharingPolicySetInput,
  output: PaperDocsSharingPolicySetOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/sharing_policy/set", data) as any
  },
})
