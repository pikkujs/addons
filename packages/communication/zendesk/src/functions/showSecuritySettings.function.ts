import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowSecuritySettingsInput = z.object({
  brand_id: z.number().int().optional().describe("When brand separation is enabled, scopes the security settings to the specified brand.\n"),
})

export const ShowSecuritySettingsOutput = z.object({
  security_settings: z.object({
    admins_can_set_user_passwords: z.boolean().optional().describe("If administrators are allowed to set passwords for users. When disabled, administrators can only reset passwords"),
    agent_session_timeout: z.number().int().optional().describe("The period of inactivity in minutes, before a team member is automatically signed out"),
    assumable: z.boolean().optional().describe("If account assumption is enabled"),
    assumable_account_type: z.boolean().optional().describe("Indicates if an account is always assumable, based on account type (e.g. always true for a trial account)"),
    assumption_duration: z.enum(["off", "day", "week", "month", "year", "always"]).optional().describe("Describes how long the account can be assumed"),
    assumption_expiration: z.string().datetime().nullable().optional().describe("The time when assumption option expires"),
    authentication: z.object({
      agent: z.object({
        enforce_sso: z.boolean().optional(),
        google_login: z.boolean().optional(),
        office_365_login: z.boolean().optional(),
        primary_external_auth: z.string().nullable().optional(),
        remote_login: z.boolean().optional(),
        security_policy_id: z.number().int().optional(),
        security_policy_name: z.enum(["low", "medium", "high", "recommended", "custom"]).optional(),
        sso_auto_redirect: z.boolean().optional(),
        two_factor_enforce: z.boolean().optional(),
        zendesk_login: z.boolean().optional(),
        office_365_allowed_tids: z.string().optional(),
        office_365_enforce_tid: z.boolean().optional(),
        password: z.object({
          disallow_local_part_from_email: z.boolean().optional(),
          failed_attempts_allowed: z.number().int().optional(),
          is_available: z.boolean().optional().default(true),
          max_sequence: z.number().int().nullable().optional(),
          password_complexity: z.number().int().optional(),
          password_duration: z.number().int().nullable().optional(),
          password_history_length: z.number().int().nullable().optional(),
          password_in_mixed_case: z.boolean().optional().describe("If must include letters in mixed case"),
          password_length: z.number().int().optional(),
        }).optional(),
        remote_bypass: z.number().int().optional(),
      }).optional(),
      end_user: z.object({
        enforce_sso: z.boolean().optional(),
        google_login: z.boolean().optional(),
        office_365_login: z.boolean().optional(),
        primary_external_auth: z.string().nullable().optional(),
        remote_login: z.boolean().optional(),
        security_policy_id: z.number().int().optional(),
        security_policy_name: z.enum(["low", "medium", "high", "recommended", "custom"]).optional(),
        sso_auto_redirect: z.boolean().optional(),
        two_factor_enforce: z.boolean().optional(),
        zendesk_login: z.boolean().optional(),
        facebook_login: z.boolean().optional(),
      }).optional(),
    }).optional().describe("Describes how users authenticate. See [Authentication](#authentication)"),
    csp_blocking_enabled: z.boolean().optional().describe("If Content Security Policy blocking is enabled"),
    email_agent_when_sensitive_fields_changed: z.boolean().optional().describe("If a notification is sent on password change for admins, agents and end users"),
    end_user_session_timeout: z.number().int().optional().describe("The period of inactivity in minutes, before an end user is automatically signed out"),
    ip: z.object({
      enable_agent_ip_restrictions: z.boolean().optional(),
      ip_ranges: z.string().optional(),
      ip_restriction_enabled: z.boolean().optional(),
    }).optional().describe("Describes IP addresses restrictions. See [IP Restrictions](#ip-restrictions)"),
    maximum_session_duration: z.number().int().optional().describe("The maximum session duration, which is the maximum amount of time in minutes a team member can stay signed in. The session will expire after this duration or the inactivity timeout"),
    maximum_session_duration_enabled: z.boolean().optional().describe("If maximum session duration for team members is enabled"),
    mobile_app_access: z.boolean().optional().describe("If admins and agents can use the Zendesk Support mobile app"),
    mobile_app_session_timeout: z.number().int().optional().describe("The period of inactivity in minutes, before a mobile app user gets signed out"),
    two_factor_last_update: z.string().datetime().optional().describe("The time when the two-factor authentication setting was last updated"),
  }).optional(),
})

export const showSecuritySettings = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins",
  input: ShowSecuritySettingsInput,
  output: ShowSecuritySettingsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/security_settings", data) as any
  },
})
