import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const UpdateCurrentUserSettingsInput = z.object({
  settings: z.object({
  admin_center: z.object({
    has_admin_center_side_nav_open: z.boolean().optional().describe("Whether the Admin Center side navigation is open"),
  }).optional().describe("Admin Center UI settings for onboarding and preferences"),
  lotus: z.object({
    agent_workspace_theme_preference: z.enum(["0", "1", "2"]).optional().describe("Agent workspace theme preference (0=light, 1=dark, 2=system)"),
    agent_workspace_theme_preference_for_conversation_panel: z.enum(["0", "1", "2"]).optional().describe("Theme preference for conversation panel (0=light, 1=dark, 2=system)"),
    keyboard_shortcuts_enabled: z.boolean().optional().describe("Enable keyboard shortcuts in Lotus"),
    macro_shortcuts_enabled: z.boolean().optional().describe("Enable macro shortcuts in Lotus"),
    show_onboarding_tooltips: z.boolean().optional().describe("Show tooltips for first-time user"),
  }).optional().describe("Lotus UI settings for onboarding, tooltips, and feature preferences"),
  shared_views_order: z.array(z.number().int()).nullable().optional().describe("Order of shared views (array of view IDs)"),
}).describe("User settings to update"),
})

export const UpdateCurrentUserSettingsOutput = z.object({
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

export const updateCurrentUserSettings = pikkuSessionlessFunc({
  description: "Updates the settings for the currently authenticated user. This includes UI preferences for onboarding, tooltips, keyboard shortcuts, theme preferences, and other feature toggles.\n\nSettings are grouped into:\n- **Support**: Support UI preferences (onboarding, tooltips, shortcuts, theme)\n- **admin_center**: Admin Center UI preferences (navigation, onboarding)\n- **shared_views_order**: Optional array of view IDs for custom ordering\n\nOnly the specified settings will be updated. Other settings will remain unchanged.\n\n#### Allowed For\n\n* Agents",
  input: UpdateCurrentUserSettingsInput,
  output: UpdateCurrentUserSettingsOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/users/me/settings", data) as any
  },
})
