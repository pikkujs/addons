import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowCurrentUserSettingsOutput = z.object({
  settings: z.object({
    admin_center: z.object({
      has_admin_center_side_nav_open: z.boolean().optional(),
    }).optional().describe("Admin Center UI settings"),
    lotus: z.object({
      agent_workspace_theme_preference: z.enum(["0", "1", "2"]).optional().describe("Agent workspace theme preference (0=light, 1=dark, 2=system)"),
      agent_workspace_theme_preference_for_conversation_panel: z.enum(["0", "1", "2"]).optional().describe("Theme preference for conversation panel (0=light, 1=dark, 2=system)"),
      keyboard_shortcuts_enabled: z.boolean().optional(),
      macro_shortcuts_enabled: z.boolean().optional(),
      show_onboarding_tooltips: z.boolean().optional(),
      two_factor_authentication: z.boolean().optional().describe("Whether user is eligible for 2FA"),
    }).optional().describe("Lotus UI settings for onboarding, tooltips, and feature preferences"),
    shared_views_order: z.array(z.number().int()).nullable().optional().describe("Order of shared views (array of view IDs)"),
  }).optional().describe("User settings"),
})

export const showCurrentUserSettings = pikkuSessionlessFunc({
  description: "Returns the settings for the currently authenticated user. This includes UI preferences for onboarding, tooltips, keyboard shortcuts, theme preferences, and other feature toggles.\n\n#### Allowed For\n\n* Agents",
  output: ShowCurrentUserSettingsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/users/me/settings") as any
  },
})
