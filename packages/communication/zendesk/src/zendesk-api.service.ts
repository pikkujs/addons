import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/addon/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /api/v2/{target_type}/{target_id}/relationship_fields/{field_id}/{source_type}": {
    "path": [
      "target_type",
      "target_id",
      "field_id",
      "source_type"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/account/email_settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/account/email_settings": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad request - missing or invalid settings"
    }
  },
  "GET /api/v2/account/settings": {
    "path": [],
    "query": [
      "authenticity_token"
    ],
    "headers": []
  },
  "PUT /api/v2/account/settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/accounts": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/accounts/available": {
    "path": [],
    "query": [
      "subdomain"
    ],
    "headers": []
  },
  "GET /api/v2/activities": {
    "path": [],
    "query": [
      "since",
      "page",
      "sort",
      "per_page",
      "include"
    ],
    "headers": []
  },
  "GET /api/v2/activities/{activity_id}": {
    "path": [
      "activity_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/activities/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/any_channel/channelback/report_error": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/any_channel/push": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/any_channel/validate_token": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/approval_requests": {
    "path": [],
    "query": [
      "filter[status]",
      "filter[assignee_user_id]",
      "filter[assignee_group_id]",
      "before_cursor",
      "after_cursor"
    ],
    "headers": []
  },
  "POST /api/v2/approval_requests": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Unprocessable Entity"
    }
  },
  "GET /api/v2/attachments/{attachment_id}": {
    "path": [
      "attachment_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/attachments/{attachment_id}": {
    "path": [
      "attachment_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/attachments/{attachment_id}": {
    "path": [
      "attachment_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/audit_logs": {
    "path": [],
    "query": [
      "filter[source_type]",
      "filter[source_id]",
      "filter[actor_id]",
      "filter[ip_address]",
      "filter[created_at]",
      "filter[action]",
      "sort_by",
      "sort_order",
      "sort",
      "page",
      "per_page"
    ],
    "headers": []
  },
  "GET /api/v2/audit_logs/{audit_log_id}": {
    "path": [
      "audit_log_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/audit_logs/export": {
    "path": [],
    "query": [
      "filter[source_type]",
      "filter[source_id]",
      "filter[actor_id]",
      "filter[ip_address]",
      "filter[created_at]",
      "filter[action]"
    ],
    "headers": []
  },
  "GET /api/v2/autocomplete/tags": {
    "path": [],
    "query": [
      "name"
    ],
    "headers": []
  },
  "POST /api/v2/autocomplete/tags": {
    "path": [],
    "query": [
      "name",
      "per_page"
    ],
    "headers": []
  },
  "GET /api/v2/automations": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort",
      "active",
      "include"
    ],
    "headers": []
  },
  "POST /api/v2/automations": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/automations/{automation_id}": {
    "path": [
      "automation_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/automations/{automation_id}": {
    "path": [
      "automation_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/automations/{automation_id}": {
    "path": [
      "automation_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/automations/active": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/automations/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/automations/search": {
    "path": [],
    "query": [
      "query",
      "active",
      "sort_by",
      "sort_order",
      "include"
    ],
    "headers": []
  },
  "PUT /api/v2/automations/update_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/bookmarks": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/bookmarks": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/bookmarks/{bookmark_id}": {
    "path": [
      "bookmark_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/brand_agents": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/brand_agents/{brand_agent_id}": {
    "path": [
      "brand_agent_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/brand_agents/{brand_agent_id}": {
    "path": [
      "brand_agent_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/brands": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort",
      "assignable_from",
      "include_deleted"
    ],
    "headers": []
  },
  "POST /api/v2/brands": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/brands/{brand_id}": {
    "path": [
      "brand_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/brands/{brand_id}": {
    "path": [
      "brand_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/brands/{brand_id}": {
    "path": [
      "brand_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/brands/{brand_id}/agents": {
    "path": [
      "brand_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/brands/{brand_id}/check_host_mapping": {
    "path": [
      "brand_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/brands/{brand_id}/logo": {
    "path": [
      "brand_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/brands/{brand_id}/logo": {
    "path": [
      "brand_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/brands/check_host_mapping": {
    "path": [],
    "query": [
      "host_mapping",
      "subdomain"
    ],
    "headers": []
  },
  "GET /api/v2/channels/twitter/monitored_twitter_handles": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/channels/twitter/monitored_twitter_handles/{monitored_twitter_handle_id}": {
    "path": [
      "monitored_twitter_handle_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/channels/twitter/tickets": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/channels/twitter/tickets/{comment_id}/statuses": {
    "path": [
      "comment_id"
    ],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "POST /api/v2/channels/voice/agents/{agent_id}/tickets/{ticket_id}/display": {
    "path": [
      "agent_id",
      "ticket_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "When the `agent_id` or `ticket_id` is invalid"
    }
  },
  "POST /api/v2/channels/voice/agents/{agent_id}/users/{user_id}/display": {
    "path": [
      "agent_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "When the `agent_id` or `user_id` is invalid"
    }
  },
  "POST /api/v2/channels/voice/tickets": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "404": "When the `ticket_id` is invalid",
      "422": "When the `agent_id` is invalid"
    }
  },
  "PUT /api/v2/chat_file_redactions/{ticket_id}": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/chat_redactions/{ticket_id}": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/comment_redactions/{ticket_comment_id}": {
    "path": [
      "ticket_comment_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects": {
    "path": [],
    "query": [
      "include_ui_path"
    ],
    "headers": []
  },
  "POST /api/v2/custom_objects": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "include_permissions_metadata",
      "include_ui_path"
    ],
    "headers": []
  },
  "PATCH /api/v2/custom_objects/{custom_object_key}": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/custom_objects/{custom_object_key}": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/access_rules": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/custom_objects/{custom_object_key}/access_rules": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/access_rules/{id}": {
    "path": [
      "custom_object_key",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/custom_objects/{custom_object_key}/access_rules/{id}": {
    "path": [
      "custom_object_key",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/custom_objects/{custom_object_key}/access_rules/{id}": {
    "path": [
      "custom_object_key",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/access_rules/definitions": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/fields": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "include_standard_fields"
    ],
    "headers": []
  },
  "POST /api/v2/custom_objects/{custom_object_key}/fields": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/fields/{custom_object_field_key_or_id}": {
    "path": [
      "custom_object_key",
      "custom_object_field_key_or_id"
    ],
    "query": [
      "include_standard_fields"
    ],
    "headers": []
  },
  "PATCH /api/v2/custom_objects/{custom_object_key}/fields/{custom_object_field_key_or_id}": {
    "path": [
      "custom_object_key",
      "custom_object_field_key_or_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/custom_objects/{custom_object_key}/fields/{custom_object_field_key_or_id}": {
    "path": [
      "custom_object_key",
      "custom_object_field_key_or_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/custom_objects/{custom_object_key}/fields/reorder": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/custom_objects/{custom_object_key}/jobs": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/limits/field_limit": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/permission_policies": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/permission_policies/{id}": {
    "path": [
      "custom_object_key",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/custom_objects/{custom_object_key}/permission_policies/{id}": {
    "path": [
      "custom_object_key",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/records": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "filter[ids]",
      "filter[external_ids]",
      "sort",
      "page[before]",
      "page[after]",
      "page[size]"
    ],
    "headers": []
  },
  "POST /api/v2/custom_objects/{custom_object_key}/records": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/custom_objects/{custom_object_key}/records": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "external_id",
      "name"
    ],
    "headers": []
  },
  "DELETE /api/v2/custom_objects/{custom_object_key}/records": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "external_id",
      "name"
    ],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/records/{custom_object_record_id}": {
    "path": [
      "custom_object_key",
      "custom_object_record_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/custom_objects/{custom_object_key}/records/{custom_object_record_id}": {
    "path": [
      "custom_object_key",
      "custom_object_record_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/custom_objects/{custom_object_key}/records/{custom_object_record_id}": {
    "path": [
      "custom_object_key",
      "custom_object_record_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/records/{record_id}/attachments": {
    "path": [
      "custom_object_key",
      "record_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request - Attachments not allowed for custom object"
    }
  },
  "POST /api/v2/custom_objects/{custom_object_key}/records/{record_id}/attachments": {
    "path": [
      "custom_object_key",
      "record_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request - Attachments not allowed for custom object or invalid request"
    }
  },
  "PUT /api/v2/custom_objects/{custom_object_key}/records/{record_id}/attachments/{id}": {
    "path": [
      "custom_object_key",
      "record_id",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request - Attachments not allowed for custom object"
    }
  },
  "DELETE /api/v2/custom_objects/{custom_object_key}/records/{record_id}/attachments/{id}": {
    "path": [
      "custom_object_key",
      "record_id",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request - Attachments not allowed for custom object"
    }
  },
  "GET /api/v2/custom_objects/{custom_object_key}/records/{record_id}/attachments/{id}/download": {
    "path": [
      "custom_object_key",
      "record_id",
      "id"
    ],
    "query": [
      "inline"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request - Attachments not allowed for custom object"
    }
  },
  "GET /api/v2/custom_objects/{custom_object_key}/records/autocomplete": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "name",
      "page[before]",
      "page[after]",
      "page[size]",
      "field_id",
      "source",
      "filter[dynamic_values]",
      "requester_id",
      "assignee_id",
      "organization_id"
    ],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/records/count": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/records/search": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "query",
      "sort",
      "page[before]",
      "page[after]",
      "page[size]"
    ],
    "headers": []
  },
  "POST /api/v2/custom_objects/{custom_object_key}/records/search": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "query",
      "sort",
      "page[before]",
      "page[after]",
      "page[size]"
    ],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/triggers": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "active",
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "POST /api/v2/custom_objects/{custom_object_key}/triggers": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/triggers/{trigger_id}": {
    "path": [
      "custom_object_key",
      "trigger_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/custom_objects/{custom_object_key}/triggers/{trigger_id}": {
    "path": [
      "custom_object_key",
      "trigger_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/custom_objects/{custom_object_key}/triggers/{trigger_id}": {
    "path": [
      "custom_object_key",
      "trigger_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/triggers/active": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/triggers/definitions": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/custom_objects/{custom_object_key}/triggers/destroy_many": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/custom_objects/{custom_object_key}/triggers/search": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "query",
      "filter",
      "active",
      "sort",
      "sort_by",
      "sort_order",
      "include"
    ],
    "headers": []
  },
  "PUT /api/v2/custom_objects/{custom_object_key}/triggers/update_many": {
    "path": [
      "custom_object_key"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/limits/object_limit": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_objects/limits/record_limit": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_roles": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/custom_roles": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_roles/{custom_role_id}": {
    "path": [
      "custom_role_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/custom_roles/{custom_role_id}": {
    "path": [
      "custom_role_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/custom_roles/{custom_role_id}": {
    "path": [
      "custom_role_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/custom_status/default": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_statuses": {
    "path": [],
    "query": [
      "status_categories",
      "active",
      "default"
    ],
    "headers": []
  },
  "POST /api/v2/custom_statuses": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/custom_statuses/{custom_status_id}": {
    "path": [
      "custom_status_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/custom_statuses/{custom_status_id}": {
    "path": [
      "custom_status_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/custom_statuses/{custom_status_id}": {
    "path": [
      "custom_status_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/custom_statuses/{custom_status_id}/ticket_form_statuses": {
    "path": [
      "custom_status_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/deleted_tickets": {
    "path": [],
    "query": [
      "sort_by",
      "sort_order",
      "support_type_scope",
      "page",
      "per_page"
    ],
    "headers": []
  },
  "DELETE /api/v2/deleted_tickets/{ticket_id}": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/deleted_tickets/{ticket_id}/restore": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/deleted_tickets/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "PUT /api/v2/deleted_tickets/restore_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/deleted_users": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/deleted_users/{deleted_user_id}": {
    "path": [
      "deleted_user_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/deleted_users/{deleted_user_id}": {
    "path": [
      "deleted_user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/deleted_users/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/deletion_schedules": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/deletion_schedules": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/deletion_schedules/{deletion_schedule_id}": {
    "path": [
      "deletion_schedule_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/deletion_schedules/{deletion_schedule_id}": {
    "path": [
      "deletion_schedule_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/deletion_schedules/{deletion_schedule_id}": {
    "path": [
      "deletion_schedule_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/dynamic_content/items": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort"
    ],
    "headers": []
  },
  "POST /api/v2/dynamic_content/items": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/dynamic_content/items/{dynamic_content_item_id}": {
    "path": [
      "dynamic_content_item_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/dynamic_content/items/{dynamic_content_item_id}": {
    "path": [
      "dynamic_content_item_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/dynamic_content/items/{dynamic_content_item_id}": {
    "path": [
      "dynamic_content_item_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/dynamic_content/items/{dynamic_content_item_id}/variants": {
    "path": [
      "dynamic_content_item_id"
    ],
    "query": [
      "page",
      "per_page",
      "sort"
    ],
    "headers": []
  },
  "POST /api/v2/dynamic_content/items/{dynamic_content_item_id}/variants": {
    "path": [
      "dynamic_content_item_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/{dynamic_content_variant_id}": {
    "path": [
      "dynamic_content_item_id",
      "dynamic_content_variant_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/{dynamic_content_variant_id}": {
    "path": [
      "dynamic_content_item_id",
      "dynamic_content_variant_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/{dynamic_content_variant_id}": {
    "path": [
      "dynamic_content_item_id",
      "dynamic_content_variant_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/create_many": {
    "path": [
      "dynamic_content_item_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/update_many": {
    "path": [
      "dynamic_content_item_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/dynamic_content/items/show_many": {
    "path": [],
    "query": [
      "identifiers"
    ],
    "headers": []
  },
  "GET /api/v2/email_notifications": {
    "path": [],
    "query": [
      "filter",
      "per_page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/email_notifications/{notification_id}": {
    "path": [
      "notification_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/email_notifications/show_many": {
    "path": [],
    "query": [
      "ids",
      "comment_ids",
      "ticket_ids"
    ],
    "headers": []
  },
  "GET /api/v2/end_users/{user_id}/identities": {
    "path": [
      "user_id"
    ],
    "query": [
      "type[]"
    ],
    "headers": []
  },
  "POST /api/v2/end_users/{user_id}/identities": {
    "path": [
      "user_id"
    ],
    "query": [
      "type[]",
      "brand_id"
    ],
    "headers": []
  },
  "GET /api/v2/end_users/{user_id}/identities/{user_identity_id}": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/end_users/{user_id}/identities/{user_identity_id}": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/end_users/{user_id}/identities/{user_identity_id}/make_primary": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/end_users/{user_id}/identities/{user_identity_id}/request_verification": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/group_memberships": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort",
      "include"
    ],
    "headers": []
  },
  "POST /api/v2/group_memberships": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/group_memberships/{group_membership_id}": {
    "path": [
      "group_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/group_memberships/{group_membership_id}": {
    "path": [
      "group_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/group_memberships/assignable": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/group_memberships/create_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/group_memberships/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/group_slas/policies": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/group_slas/policies": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/group_slas/policies/{group_sla_policy_id}": {
    "path": [
      "group_sla_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/group_slas/policies/{group_sla_policy_id}": {
    "path": [
      "group_sla_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/group_slas/policies/{group_sla_policy_id}": {
    "path": [
      "group_sla_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/group_slas/policies/definitions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/group_slas/policies/reorder": {
    "path": [],
    "query": [
      "group_sla_policy_ids"
    ],
    "headers": []
  },
  "GET /api/v2/groups": {
    "path": [],
    "query": [
      "exclude_deleted",
      "include",
      "page",
      "per_page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": []
  },
  "POST /api/v2/groups": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/groups/{group_id}": {
    "path": [
      "group_id"
    ],
    "query": [
      "include"
    ],
    "headers": []
  },
  "PUT /api/v2/groups/{group_id}": {
    "path": [
      "group_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/groups/{group_id}": {
    "path": [
      "group_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/groups/{group_id}/memberships": {
    "path": [
      "group_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/groups/{group_id}/memberships/assignable": {
    "path": [
      "group_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/groups/{group_id}/users": {
    "path": [
      "group_id"
    ],
    "query": [
      "role",
      "role[]",
      "permission_set",
      "external_id"
    ],
    "headers": []
  },
  "GET /api/v2/groups/{group_id}/users/count": {
    "path": [
      "group_id"
    ],
    "query": [
      "role",
      "role[]",
      "permission_set"
    ],
    "headers": []
  },
  "GET /api/v2/groups/assignable": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/groups/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/imports/tickets": {
    "path": [],
    "query": [
      "archive_immediately"
    ],
    "headers": []
  },
  "POST /api/v2/imports/tickets/create_many": {
    "path": [],
    "query": [
      "archive_immediately"
    ],
    "headers": []
  },
  "GET /api/v2/incremental/{incremental_resource}/sample": {
    "path": [
      "incremental_resource"
    ],
    "query": [
      "start_time"
    ],
    "headers": []
  },
  "GET /api/v2/incremental/custom_objects/{custom_object_key}/cursor": {
    "path": [
      "custom_object_key"
    ],
    "query": [
      "start_time",
      "cursor",
      "per_page",
      "filter[exclude_deleted]"
    ],
    "headers": [],
    "errors": {
      "400": "Bad request - Invalid parameters",
      "401": "Unauthorized - Authentication required",
      "403": "Forbidden - Insufficient permissions to access custom objects",
      "404": "Not found - Custom object not found or feature not enabled",
      "429": "Too many requests - Rate limit exceeded"
    }
  },
  "GET /api/v2/incremental/organizations": {
    "path": [],
    "query": [
      "start_time",
      "per_page"
    ],
    "headers": []
  },
  "GET /api/v2/incremental/routing/attribute_values": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/incremental/routing/attributes": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/incremental/routing/instance_values": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/incremental/ticket_events": {
    "path": [],
    "query": [
      "start_time",
      "support_type_scope",
      "include"
    ],
    "headers": []
  },
  "GET /api/v2/incremental/ticket_metric_events": {
    "path": [],
    "query": [
      "start_time",
      "include_changes",
      "exclude_deleted"
    ],
    "headers": []
  },
  "GET /api/v2/incremental/tickets": {
    "path": [],
    "query": [
      "start_time",
      "support_type_scope"
    ],
    "headers": []
  },
  "GET /api/v2/incremental/tickets/cursor": {
    "path": [],
    "query": [
      "start_time",
      "cursor",
      "support_type_scope"
    ],
    "headers": []
  },
  "GET /api/v2/incremental/users": {
    "path": [],
    "query": [
      "start_time",
      "per_page"
    ],
    "headers": []
  },
  "GET /api/v2/incremental/users/cursor": {
    "path": [],
    "query": [
      "start_time",
      "cursor",
      "per_page"
    ],
    "headers": []
  },
  "GET /api/v2/it_asset_management/asset_types": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/it_asset_management/asset_types": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/asset_types/{asset_type_id}": {
    "path": [
      "asset_type_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/it_asset_management/asset_types/{asset_type_id}": {
    "path": [
      "asset_type_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/it_asset_management/asset_types/{asset_type_id}": {
    "path": [
      "asset_type_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/asset_types/{asset_type_id}/fields": {
    "path": [
      "asset_type_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/it_asset_management/asset_types/{asset_type_id}/fields": {
    "path": [
      "asset_type_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/asset_types/{asset_type_id}/fields/{asset_type_field_id}": {
    "path": [
      "asset_type_id",
      "asset_type_field_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/it_asset_management/asset_types/{asset_type_id}/fields/{asset_type_field_id}": {
    "path": [
      "asset_type_id",
      "asset_type_field_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/it_asset_management/asset_types/{asset_type_id}/fields/{asset_type_field_id}": {
    "path": [
      "asset_type_id",
      "asset_type_field_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/assets": {
    "path": [],
    "query": [
      "filter[ids]",
      "filter[external_ids]"
    ],
    "headers": []
  },
  "POST /api/v2/it_asset_management/assets": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/assets/{asset_id}": {
    "path": [
      "asset_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/it_asset_management/assets/{asset_id}": {
    "path": [
      "asset_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/it_asset_management/assets/{asset_id}": {
    "path": [
      "asset_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/it_asset_management/assets/jobs": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/assets/search": {
    "path": [],
    "query": [
      "query",
      "sort",
      "page[before]",
      "page[after]",
      "page[size]"
    ],
    "headers": []
  },
  "POST /api/v2/it_asset_management/assets/search": {
    "path": [],
    "query": [
      "query",
      "sort",
      "page[before]",
      "page[after]",
      "page[size]"
    ],
    "headers": []
  },
  "GET /api/v2/it_asset_management/locations": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/it_asset_management/locations": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/locations/{location_id}": {
    "path": [
      "location_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/it_asset_management/locations/{location_id}": {
    "path": [
      "location_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/it_asset_management/locations/{location_id}": {
    "path": [
      "location_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/statuses": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/it_asset_management/statuses/{status_id}": {
    "path": [
      "status_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/job_statuses": {
    "path": [],
    "query": [
      "page"
    ],
    "headers": []
  },
  "GET /api/v2/job_statuses/{job_status_id}": {
    "path": [
      "job_status_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/job_statuses/show_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/locales": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/locales/{locale_id}": {
    "path": [
      "locale_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/locales/agent": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/locales/current": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/locales/detect_best_locale": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/locales/public": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/macros": {
    "path": [],
    "query": [
      "include",
      "access",
      "active",
      "category",
      "group_id",
      "only_viewable",
      "sort_by",
      "sort_order",
      "page",
      "per_page"
    ],
    "headers": []
  },
  "POST /api/v2/macros": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/macros/{macro_id}": {
    "path": [
      "macro_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/macros/{macro_id}": {
    "path": [
      "macro_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/macros/{macro_id}": {
    "path": [
      "macro_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/macros/{macro_id}/apply": {
    "path": [
      "macro_id"
    ],
    "query": [
      "normalize_comment"
    ],
    "headers": []
  },
  "GET /api/v2/macros/{macro_id}/attachments": {
    "path": [
      "macro_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/macros/{macro_id}/attachments": {
    "path": [
      "macro_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/macros/actions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/macros/active": {
    "path": [],
    "query": [
      "include",
      "access",
      "category",
      "group_id",
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "POST /api/v2/macros/attachments": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/macros/attachments/{attachment_id}": {
    "path": [
      "attachment_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/macros/categories": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/macros/definitions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/macros/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/macros/new": {
    "path": [],
    "query": [
      "macro_id",
      "ticket_id"
    ],
    "headers": []
  },
  "GET /api/v2/macros/search": {
    "path": [],
    "query": [
      "include",
      "access",
      "active",
      "category",
      "group_id",
      "only_viewable",
      "sort_by",
      "sort_order",
      "query"
    ],
    "headers": []
  },
  "PUT /api/v2/macros/update_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/oauth/clients": {
    "path": [],
    "query": [
      "page",
      "sort"
    ],
    "headers": []
  },
  "POST /api/v2/oauth/clients": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/oauth/clients/{oauth_client_id}": {
    "path": [
      "oauth_client_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/oauth/clients/{oauth_client_id}": {
    "path": [
      "oauth_client_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/oauth/clients/{oauth_client_id}": {
    "path": [
      "oauth_client_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/oauth/clients/{oauth_client_id}/generate_secret": {
    "path": [
      "oauth_client_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/oauth/global_clients": {
    "path": [],
    "query": [
      "page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/oauth/global_clients/{global_client_id}": {
    "path": [
      "global_client_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/oauth/global_clients/token_summary": {
    "path": [],
    "query": [
      "global_client_id",
      "include_expired"
    ],
    "headers": []
  },
  "GET /api/v2/oauth/tokens": {
    "path": [],
    "query": [
      "client_id",
      "global_client_id",
      "all",
      "page",
      "sort"
    ],
    "headers": []
  },
  "POST /api/v2/oauth/tokens": {
    "path": [],
    "query": [
      "client_id",
      "global_client_id",
      "all"
    ],
    "headers": []
  },
  "GET /api/v2/oauth/tokens/{oauth_token_id}": {
    "path": [
      "oauth_token_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/oauth/tokens/{oauth_token_id}": {
    "path": [
      "oauth_token_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/oauth/tokens/current": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/oauth/tokens/current": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organization_fields": {
    "path": [],
    "query": [
      "page",
      "resolve_dc"
    ],
    "headers": []
  },
  "POST /api/v2/organization_fields": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organization_fields/{organization_field_id}": {
    "path": [
      "organization_field_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/organization_fields/{organization_field_id}": {
    "path": [
      "organization_field_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/organization_fields/{organization_field_id}": {
    "path": [
      "organization_field_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/organization_fields/reorder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organization_memberships": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort",
      "include"
    ],
    "headers": []
  },
  "POST /api/v2/organization_memberships": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organization_memberships/{organization_membership_id}": {
    "path": [
      "organization_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/organization_memberships/{organization_membership_id}": {
    "path": [
      "organization_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/organization_memberships/create_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/organization_memberships/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/organization_merges/{organization_merge_id}": {
    "path": [
      "organization_merge_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organization_subscriptions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/organization_subscriptions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organization_subscriptions/{organization_subscription_id}": {
    "path": [
      "organization_subscription_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/organization_subscriptions/{organization_subscription_id}": {
    "path": [
      "organization_subscription_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": []
  },
  "POST /api/v2/organizations": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}": {
    "path": [
      "organization_id"
    ],
    "query": [
      "include",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": []
  },
  "PUT /api/v2/organizations/{organization_id}": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "429": "Too Many Requests"
    }
  },
  "DELETE /api/v2/organizations/{organization_id}": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/organizations/{organization_id}/merge": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/merges": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/organization_memberships": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/related": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/requests": {
    "path": [
      "organization_id"
    ],
    "query": [
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/subscriptions": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/tags": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/organizations/{organization_id}/tags": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/organizations/{organization_id}/tags": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/organizations/{organization_id}/tags": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/tickets": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/tickets/count": {
    "path": [
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/users": {
    "path": [
      "organization_id"
    ],
    "query": [
      "role",
      "role[]",
      "permission_set",
      "external_id",
      "sort_by",
      "sort_order",
      "page",
      "per_page"
    ],
    "headers": []
  },
  "GET /api/v2/organizations/{organization_id}/users/count": {
    "path": [
      "organization_id"
    ],
    "query": [
      "role",
      "role[]",
      "permission_set"
    ],
    "headers": []
  },
  "GET /api/v2/organizations/autocomplete": {
    "path": [],
    "query": [
      "name",
      "field_id",
      "source",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": [],
    "errors": {
      "400": "Bad request",
      "429": "Too Many Requests"
    }
  },
  "GET /api/v2/organizations/count": {
    "path": [],
    "query": [
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": []
  },
  "POST /api/v2/organizations/create_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/organizations/create_or_update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/organizations/destroy_many": {
    "path": [],
    "query": [
      "ids",
      "external_ids"
    ],
    "headers": []
  },
  "GET /api/v2/organizations/search": {
    "path": [],
    "query": [
      "external_id",
      "name"
    ],
    "headers": []
  },
  "GET /api/v2/organizations/show_many": {
    "path": [],
    "query": [
      "ids",
      "external_ids"
    ],
    "headers": []
  },
  "PUT /api/v2/organizations/update_many": {
    "path": [],
    "query": [
      "ids",
      "external_ids"
    ],
    "headers": []
  },
  "GET /api/v2/problems": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": []
  },
  "POST /api/v2/problems/autocomplete": {
    "path": [],
    "query": [
      "text"
    ],
    "headers": []
  },
  "POST /api/v2/push_notification_devices/destroy_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/queues": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/queues": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/queues/{queue_id}": {
    "path": [
      "queue_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/queues/{queue_id}": {
    "path": [
      "queue_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/queues/{queue_id}": {
    "path": [
      "queue_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/queues/definitions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/queues/order": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/recipient_addresses": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort",
      "include"
    ],
    "headers": []
  },
  "POST /api/v2/recipient_addresses": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/recipient_addresses/{support_address_id}": {
    "path": [
      "support_address_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/recipient_addresses/{support_address_id}": {
    "path": [
      "support_address_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/recipient_addresses/{support_address_id}": {
    "path": [
      "support_address_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/recipient_addresses/{support_address_id}/verify": {
    "path": [
      "support_address_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/relationships/definitions/{target_type}": {
    "path": [
      "target_type"
    ],
    "query": [
      "source_type"
    ],
    "headers": []
  },
  "GET /api/v2/remote_authentications": {
    "path": [],
    "query": [
      "brand_id"
    ],
    "headers": []
  },
  "GET /api/v2/requests": {
    "path": [],
    "query": [
      "sort_by",
      "sort_order",
      "page",
      "per_page"
    ],
    "headers": []
  },
  "POST /api/v2/requests": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/requests/{request_id}": {
    "path": [
      "request_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/requests/{request_id}": {
    "path": [
      "request_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/requests/{request_id}/comments": {
    "path": [
      "request_id"
    ],
    "query": [
      "since",
      "role"
    ],
    "headers": []
  },
  "GET /api/v2/requests/{request_id}/comments/{ticket_comment_id}": {
    "path": [
      "request_id",
      "ticket_comment_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/requests/ccd": {
    "path": [],
    "query": [
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/requests/open": {
    "path": [],
    "query": [
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/requests/search": {
    "path": [],
    "query": [
      "query"
    ],
    "headers": []
  },
  "GET /api/v2/requests/solved": {
    "path": [],
    "query": [
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/resource_collections": {
    "path": [],
    "query": [
      "per_page"
    ],
    "headers": []
  },
  "POST /api/v2/resource_collections": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/resource_collections/{resource_collection_id}": {
    "path": [
      "resource_collection_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/resource_collections/{resource_collection_id}": {
    "path": [
      "resource_collection_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/resource_collections/{resource_collection_id}": {
    "path": [
      "resource_collection_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/routing/agents/{user_id}/instance_values": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/routing/agents/{user_id}/instance_values": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/routing/agents/instance_values": {
    "path": [],
    "query": [
      "filter[agent_ids]",
      "page[before]",
      "page[after]",
      "page[size]"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /api/v2/routing/agents/instance_values/jobs": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "GET /api/v2/routing/attributes": {
    "path": [],
    "query": [
      "include"
    ],
    "headers": []
  },
  "POST /api/v2/routing/attributes": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/routing/attributes/{attribute_id}": {
    "path": [
      "attribute_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/routing/attributes/{attribute_id}": {
    "path": [
      "attribute_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/routing/attributes/{attribute_id}": {
    "path": [
      "attribute_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/routing/attributes/{attribute_id}/values": {
    "path": [
      "attribute_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/routing/attributes/{attribute_id}/values": {
    "path": [
      "attribute_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/routing/attributes/{attribute_id}/values/{attribute_value_id}": {
    "path": [
      "attribute_id",
      "attribute_value_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/routing/attributes/{attribute_id}/values/{attribute_value_id}": {
    "path": [
      "attribute_id",
      "attribute_value_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/routing/attributes/{attribute_id}/values/{attribute_value_id}": {
    "path": [
      "attribute_id",
      "attribute_value_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/routing/attributes/definitions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/routing/requirements/fulfilled": {
    "path": [],
    "query": [
      "ticket_ids"
    ],
    "headers": []
  },
  "GET /api/v2/routing/tickets/{ticket_id}/instance_values": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/routing/tickets/{ticket_id}/instance_values": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/satisfaction_ratings": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/satisfaction_ratings/{satisfaction_rating_id}": {
    "path": [
      "satisfaction_rating_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/satisfaction_ratings/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/satisfaction_reasons": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/satisfaction_reasons/{satisfaction_reason_id}": {
    "path": [
      "satisfaction_reason_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/saved_searches": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/saved_searches": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict",
      "422": "Validation failed"
    }
  },
  "PUT /api/v2/saved_searches/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found - no saved search with the given id",
      "409": "Conflict",
      "422": "Validation failed. The `error` value varies by failure path: `Update Failed` for\nfield validation errors (name, type, query, filters), and `Create Failed` for the\nduplicate-name check. The `details` object is keyed by the offending attribute."
    }
  },
  "DELETE /api/v2/saved_searches/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request - id is required",
      "404": "Not Found - no saved search with the given id",
      "409": "Conflict"
    }
  },
  "GET /api/v2/search": {
    "path": [],
    "query": [
      "query",
      "sort_by",
      "sort_order",
      "include"
    ],
    "headers": []
  },
  "GET /api/v2/search/count": {
    "path": [],
    "query": [
      "query"
    ],
    "headers": []
  },
  "GET /api/v2/search/export": {
    "path": [],
    "query": [
      "query",
      "page[size]",
      "page[after]",
      "filter[type]",
      "include"
    ],
    "headers": []
  },
  "GET /api/v2/security_settings": {
    "path": [],
    "query": [
      "brand_id"
    ],
    "headers": []
  },
  "GET /api/v2/sessions": {
    "path": [],
    "query": [
      "page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/sharing_agreements": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/sharing_agreements": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/sharing_agreements/{sharing_agreement_id}": {
    "path": [
      "sharing_agreement_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/sharing_agreements/{sharing_agreement_id}": {
    "path": [
      "sharing_agreement_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/sharing_agreements/{sharing_agreement_id}": {
    "path": [
      "sharing_agreement_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/skips": {
    "path": [],
    "query": [
      "sort_order"
    ],
    "headers": []
  },
  "POST /api/v2/skips": {
    "path": [],
    "query": [
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/slas/policies": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/slas/policies": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/slas/policies/{sla_policy_id}": {
    "path": [
      "sla_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/slas/policies/{sla_policy_id}": {
    "path": [
      "sla_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/slas/policies/{sla_policy_id}": {
    "path": [
      "sla_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/slas/policies/definitions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/slas/policies/reorder": {
    "path": [],
    "query": [
      "sla_policy_ids"
    ],
    "headers": []
  },
  "GET /api/v2/suspended_tickets": {
    "path": [],
    "query": [
      "sort_by",
      "sort_order",
      "page",
      "per_page"
    ],
    "headers": []
  },
  "GET /api/v2/suspended_tickets/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/suspended_tickets/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/suspended_tickets/{id}/recover": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Recovery failed response"
    }
  },
  "POST /api/v2/suspended_tickets/attachments": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/suspended_tickets/bulk_recover": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "422": "Invalid request - missing or malformed parameters"
    }
  },
  "DELETE /api/v2/suspended_tickets/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "POST /api/v2/suspended_tickets/export": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/suspended_tickets/recover_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/tags": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/tags/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/target_failures": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/target_failures/{target_failure_id}": {
    "path": [
      "target_failure_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/targets": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/targets": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/targets/{target_id}": {
    "path": [
      "target_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/targets/{target_id}": {
    "path": [
      "target_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/targets/{target_id}": {
    "path": [
      "target_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/task_list_templates": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/task_list_templates": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/task_list_templates/{task_list_template_id}": {
    "path": [
      "task_list_template_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/task_list_templates/{task_list_template_id}": {
    "path": [
      "task_list_template_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/task_list_templates/{task_list_template_id}": {
    "path": [
      "task_list_template_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/task_list_templates/{task_list_template_id}/tasks": {
    "path": [
      "task_list_template_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/ticket_audits": {
    "path": [],
    "query": [
      "page[before]",
      "page[after]",
      "page[size]"
    ],
    "headers": []
  },
  "GET /api/v2/ticket_content_pins": {
    "path": [],
    "query": [
      "ticket_id"
    ],
    "headers": []
  },
  "POST /api/v2/ticket_content_pins": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "409": "Conflict",
      "422": "Unprocessable Entity"
    }
  },
  "DELETE /api/v2/ticket_content_pins/{content_pin_id}": {
    "path": [
      "content_pin_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Content pin not found"
    }
  },
  "GET /api/v2/ticket_fields": {
    "path": [],
    "query": [
      "locale",
      "creator",
      "page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": []
  },
  "POST /api/v2/ticket_fields": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/ticket_fields/{ticket_field_id}": {
    "path": [
      "ticket_field_id"
    ],
    "query": [
      "creator"
    ],
    "headers": []
  },
  "PUT /api/v2/ticket_fields/{ticket_field_id}": {
    "path": [
      "ticket_field_id"
    ],
    "query": [
      "creator"
    ],
    "headers": []
  },
  "DELETE /api/v2/ticket_fields/{ticket_field_id}": {
    "path": [
      "ticket_field_id"
    ],
    "query": [
      "creator"
    ],
    "headers": []
  },
  "GET /api/v2/ticket_fields/{ticket_field_id}/options": {
    "path": [
      "ticket_field_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/ticket_fields/{ticket_field_id}/options": {
    "path": [
      "ticket_field_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/ticket_fields/{ticket_field_id}/options/{ticket_field_option_id}": {
    "path": [
      "ticket_field_id",
      "ticket_field_option_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/ticket_fields/{ticket_field_id}/options/{ticket_field_option_id}": {
    "path": [
      "ticket_field_id",
      "ticket_field_option_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/ticket_fields/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/ticket_fields/reorder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/ticket_fields/show_many": {
    "path": [],
    "query": [
      "ids",
      "keys",
      "creator",
      "exclude_sub_selection_options"
    ],
    "headers": []
  },
  "GET /api/v2/ticket_form_statuses": {
    "path": [],
    "query": [
      "ticket_form_id",
      "filter"
    ],
    "headers": []
  },
  "GET /api/v2/ticket_form_statuses/show_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/ticket_forms": {
    "path": [],
    "query": [
      "active",
      "end_user_visible",
      "fallback_to_default",
      "form_type",
      "associated_to_brand",
      "page",
      "per_page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors",
      "locale"
    ],
    "headers": []
  },
  "POST /api/v2/ticket_forms": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/ticket_forms/{ticket_form_id}": {
    "path": [
      "ticket_form_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/ticket_forms/{ticket_form_id}": {
    "path": [
      "ticket_form_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/ticket_forms/{ticket_form_id}": {
    "path": [
      "ticket_form_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/ticket_forms/{ticket_form_id}/clone": {
    "path": [
      "ticket_form_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses": {
    "path": [
      "ticket_form_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses": {
    "path": [
      "ticket_form_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses": {
    "path": [
      "ticket_form_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses": {
    "path": [
      "ticket_form_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses/{ticket_form_status_id}": {
    "path": [
      "ticket_form_id",
      "ticket_form_status_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses/{ticket_form_status_id}": {
    "path": [
      "ticket_form_id",
      "ticket_form_status_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/ticket_forms/reorder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/ticket_forms/show_many": {
    "path": [],
    "query": [
      "ids",
      "include_boundary_indicators",
      "include_item_cursors",
      "active",
      "end_user_visible",
      "fallback_to_default",
      "associated_to_brand"
    ],
    "headers": []
  },
  "GET /api/v2/ticket_metrics": {
    "path": [],
    "query": [
      "page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/ticket_metrics/{ticket_metric_id}": {
    "path": [
      "ticket_metric_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets": {
    "path": [],
    "query": [
      "external_id",
      "sort_by",
      "sort_order",
      "support_type_scope",
      "page",
      "per_page",
      "sort",
      "include",
      "start_time"
    ],
    "headers": []
  },
  "POST /api/v2/tickets": {
    "path": [],
    "query": [
      "include"
    ],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}": {
    "path": [
      "ticket_id"
    ],
    "query": [
      "include",
      "reduced_payload_size",
      "remove_duplicate_fields"
    ],
    "headers": []
  },
  "PUT /api/v2/tickets/{ticket_id}": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/tickets/{ticket_id}": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/audits": {
    "path": [
      "ticket_id"
    ],
    "query": [
      "page",
      "sort",
      "include",
      "include_boundary_indicators",
      "include_item_cursors",
      "filter_events",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/audits/{ticket_audit_id}": {
    "path": [
      "ticket_id",
      "ticket_audit_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/tickets/{ticket_id}/audits/{ticket_audit_id}/make_private": {
    "path": [
      "ticket_id",
      "ticket_audit_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/audits/count": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/collaborators": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/comments": {
    "path": [
      "ticket_id"
    ],
    "query": [
      "include_inline_images",
      "include",
      "per_page",
      "sort_order",
      "page"
    ],
    "headers": []
  },
  "PUT /api/v2/tickets/{ticket_id}/comments/{comment_id}/attachments/{attachment_id}/redact": {
    "path": [
      "ticket_id",
      "comment_id",
      "attachment_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/tickets/{ticket_id}/comments/{ticket_comment_id}/make_private": {
    "path": [
      "ticket_id",
      "ticket_comment_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/tickets/{ticket_id}/comments/{ticket_comment_id}/redact": {
    "path": [
      "ticket_id",
      "ticket_comment_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/comments/count": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/conversation_log": {
    "path": [
      "ticket_id"
    ],
    "query": [
      "page",
      "sort"
    ],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/email_ccs": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/followers": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/incidents": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/macros/{macro_id}/apply": {
    "path": [
      "macro_id",
      "ticket_id"
    ],
    "query": [
      "normalize_comment"
    ],
    "headers": []
  },
  "PUT /api/v2/tickets/{ticket_id}/mark_as_spam": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/tickets/{ticket_id}/merge": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/metrics": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/related": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/tickets/{ticket_id}/satisfaction_rating": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/skips": {
    "path": [
      "ticket_id"
    ],
    "query": [
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/tags": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/tickets/{ticket_id}/tags": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/tickets/{ticket_id}/tags": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/tickets/{ticket_id}/tags": {
    "path": [
      "ticket_id"
    ],
    "query": [
      "tags"
    ],
    "headers": []
  },
  "GET /api/v2/tickets/{ticket_id}/task_lists": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/tickets/{ticket_id}/task_lists": {
    "path": [
      "ticket_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/tickets/create_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/tickets/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "PUT /api/v2/tickets/mark_many_as_spam": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/tickets/messaging/conversations/{conversation_id}/ticket": {
    "path": [
      "conversation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "No active ticket found for the given conversation ID"
    }
  },
  "GET /api/v2/tickets/recent": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/tickets/show_many": {
    "path": [],
    "query": [
      "ids",
      "include"
    ],
    "headers": []
  },
  "PUT /api/v2/tickets/update_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/trigger_categories": {
    "path": [],
    "query": [
      "page",
      "sort",
      "include"
    ],
    "headers": [],
    "errors": {
      "400": "Error",
      "403": "Error"
    }
  },
  "POST /api/v2/trigger_categories": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Error",
      "403": "Error"
    }
  },
  "GET /api/v2/trigger_categories/{trigger_category_id}": {
    "path": [
      "trigger_category_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Error"
    }
  },
  "PATCH /api/v2/trigger_categories/{trigger_category_id}": {
    "path": [
      "trigger_category_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Error",
      "404": "Error"
    }
  },
  "DELETE /api/v2/trigger_categories/{trigger_category_id}": {
    "path": [
      "trigger_category_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Error",
      "404": "Error"
    }
  },
  "POST /api/v2/trigger_categories/jobs": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Error"
    }
  },
  "GET /api/v2/triggers": {
    "path": [],
    "query": [
      "active",
      "sort",
      "sort_by",
      "sort_order",
      "category_id",
      "page",
      "per_page",
      "include"
    ],
    "headers": []
  },
  "POST /api/v2/triggers": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/triggers/{trigger_id}": {
    "path": [
      "trigger_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/triggers/{trigger_id}": {
    "path": [
      "trigger_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/triggers/{trigger_id}": {
    "path": [
      "trigger_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/triggers/{trigger_id}/revisions": {
    "path": [
      "trigger_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/triggers/{trigger_id}/revisions/{trigger_revision_id}": {
    "path": [
      "trigger_id",
      "trigger_revision_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/triggers/active": {
    "path": [],
    "query": [
      "sort",
      "sort_by",
      "sort_order",
      "category_id"
    ],
    "headers": []
  },
  "GET /api/v2/triggers/definitions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/triggers/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "PUT /api/v2/triggers/reorder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/triggers/search": {
    "path": [],
    "query": [
      "query",
      "filter",
      "active",
      "sort",
      "sort_by",
      "sort_order",
      "include"
    ],
    "headers": []
  },
  "PUT /api/v2/triggers/update_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/uploads": {
    "path": [],
    "query": [
      "filename"
    ],
    "headers": []
  },
  "DELETE /api/v2/uploads/{token}": {
    "path": [
      "token"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/user_fields": {
    "path": [],
    "query": [
      "page",
      "resolve_dc"
    ],
    "headers": []
  },
  "POST /api/v2/user_fields": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/user_fields/{user_field_id}": {
    "path": [
      "user_field_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/user_fields/{user_field_id}": {
    "path": [
      "user_field_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/user_fields/{user_field_id}": {
    "path": [
      "user_field_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/user_fields/{user_field_id}/options": {
    "path": [
      "user_field_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/user_fields/{user_field_id}/options": {
    "path": [
      "user_field_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/user_fields/{user_field_id}/options/{user_field_option_id}": {
    "path": [
      "user_field_id",
      "user_field_option_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/user_fields/{user_field_id}/options/{user_field_option_id}": {
    "path": [
      "user_field_id",
      "user_field_option_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/user_fields/reorder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/user_fields/show_many": {
    "path": [],
    "query": [
      "keys"
    ],
    "headers": []
  },
  "GET /api/v2/users": {
    "path": [],
    "query": [
      "role",
      "role[]",
      "permission_set",
      "external_id",
      "include",
      "page",
      "per_page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors",
      "brand_id"
    ],
    "headers": []
  },
  "POST /api/v2/users": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}": {
    "path": [
      "user_id"
    ],
    "query": [
      "include"
    ],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/users/{user_id}": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/brand_agents": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/brand_agents/{brand_agent_id}": {
    "path": [
      "user_id",
      "brand_agent_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/compliance_deletion_statuses": {
    "path": [
      "user_id"
    ],
    "query": [
      "application"
    ],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/entitlements/full": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "User not found",
      "503": "Service unavailable - Too many requests"
    }
  },
  "GET /api/v2/users/{user_id}/group_memberships": {
    "path": [
      "user_id"
    ],
    "query": [
      "page",
      "include",
      "per_page"
    ],
    "headers": []
  },
  "POST /api/v2/users/{user_id}/group_memberships": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/group_memberships/{group_membership_id}": {
    "path": [
      "user_id",
      "group_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/users/{user_id}/group_memberships/{group_membership_id}": {
    "path": [
      "user_id",
      "group_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/group_memberships/{group_membership_id}/make_default": {
    "path": [
      "user_id",
      "group_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/groups": {
    "path": [
      "user_id"
    ],
    "query": [
      "exclude_deleted",
      "page",
      "per_page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/groups/count": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/identities": {
    "path": [
      "user_id"
    ],
    "query": [
      "type",
      "page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": []
  },
  "POST /api/v2/users/{user_id}/identities": {
    "path": [
      "user_id"
    ],
    "query": [
      "brand_id"
    ],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/identities/{user_identity_id}": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/identities/{user_identity_id}": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/users/{user_id}/identities/{user_identity_id}": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/identities/{user_identity_id}/make_primary": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/identities/{user_identity_id}/request_verification": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [
      "brand_id"
    ],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/identities/{user_identity_id}/verify": {
    "path": [
      "user_id",
      "user_identity_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/merge": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/organization_memberships": {
    "path": [
      "user_id"
    ],
    "query": [
      "include"
    ],
    "headers": []
  },
  "POST /api/v2/users/{user_id}/organization_memberships": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/organization_memberships/{organization_membership_id}": {
    "path": [
      "user_id",
      "organization_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/users/{user_id}/organization_memberships/{organization_membership_id}": {
    "path": [
      "user_id",
      "organization_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/organization_memberships/{organization_membership_id}/make_default": {
    "path": [
      "user_id",
      "organization_membership_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/organization_subscriptions": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/organizations": {
    "path": [
      "user_id"
    ],
    "query": [
      "page",
      "per_page",
      "sort",
      "include_boundary_indicators",
      "include_item_cursors"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden - Agent has restricted access",
      "404": "User not found"
    }
  },
  "DELETE /api/v2/users/{user_id}/organizations/{organization_id}": {
    "path": [
      "organization_id",
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/organizations/{organization_id}/make_default": {
    "path": [
      "user_id",
      "organization_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/organizations/count": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/users/{user_id}/password": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/password": {
    "path": [
      "user_id"
    ],
    "query": [
      "brand_id"
    ],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/password/requirements": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/related": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/requests": {
    "path": [
      "user_id"
    ],
    "query": [
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/sessions": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/users/{user_id}/sessions": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/sessions/{session_id}": {
    "path": [
      "session_id",
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/users/{user_id}/sessions/{session_id}": {
    "path": [
      "session_id",
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/skips": {
    "path": [
      "user_id"
    ],
    "query": [
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/tags": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/users/{user_id}/tags": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/{user_id}/tags": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/users/{user_id}/tags": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/tickets/assigned": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/tickets/assigned/count": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/tickets/ccd": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/tickets/ccd/count": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/tickets/followed": {
    "path": [
      "user_id"
    ],
    "query": [
      "sort_by",
      "sort_order",
      "page",
      "per_page",
      "exclude_archived"
    ],
    "headers": []
  },
  "GET /api/v2/users/{user_id}/tickets/requested": {
    "path": [
      "user_id"
    ],
    "query": [
      "sort_by",
      "sort_order",
      "page",
      "per_page",
      "include",
      "exclude_archived",
      "exclude_count"
    ],
    "headers": []
  },
  "GET /api/v2/users/autocomplete": {
    "path": [],
    "query": [
      "name",
      "phone",
      "filter",
      "field_id",
      "source",
      "include",
      "per_page",
      "brand_id"
    ],
    "headers": [],
    "errors": {
      "400": "Bad request - Invalid brand_id"
    }
  },
  "POST /api/v2/users/autocomplete": {
    "path": [],
    "query": [
      "include",
      "filter",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Bad request - Invalid brand_id, filter value, or query error",
      "500": "Internal server error"
    }
  },
  "GET /api/v2/users/count": {
    "path": [],
    "query": [
      "role",
      "role[]",
      "permission_set",
      "brand_id"
    ],
    "headers": []
  },
  "POST /api/v2/users/create_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/users/create_or_update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/users/create_or_update_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/users/destroy_many": {
    "path": [],
    "query": [
      "ids",
      "external_ids",
      "brand_id"
    ],
    "headers": []
  },
  "POST /api/v2/users/logout_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /api/v2/users/me": {
    "path": [],
    "query": [
      "include"
    ],
    "headers": []
  },
  "DELETE /api/v2/users/me/logout": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/me/oauth/clients": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/me/session": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/me/session/renew": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/me/settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/users/me/settings": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad request - No settings provided",
      "401": "Unauthorized - Not an agent"
    }
  },
  "POST /api/v2/users/request_create": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/users/search": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "query",
      "external_id",
      "brand_id",
      "include"
    ],
    "headers": []
  },
  "GET /api/v2/users/show_many": {
    "path": [],
    "query": [
      "ids",
      "external_ids",
      "include_deleted",
      "brand_id",
      "include"
    ],
    "headers": []
  },
  "PUT /api/v2/users/update_many": {
    "path": [],
    "query": [
      "ids",
      "external_ids",
      "brand_id"
    ],
    "headers": []
  },
  "GET /api/v2/views": {
    "path": [],
    "query": [
      "access",
      "active",
      "group_id",
      "sort",
      "sort_by",
      "sort_order",
      "page",
      "per_page"
    ],
    "headers": []
  },
  "POST /api/v2/views": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/views/{view_id}": {
    "path": [
      "view_id"
    ],
    "query": [
      "include"
    ],
    "headers": []
  },
  "PUT /api/v2/views/{view_id}": {
    "path": [
      "view_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/views/{view_id}": {
    "path": [
      "view_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/views/{view_id}/count": {
    "path": [
      "view_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/views/{view_id}/execute": {
    "path": [
      "view_id"
    ],
    "query": [
      "page",
      "sort_by",
      "sort_order",
      "include",
      "exclude",
      "group_by"
    ],
    "headers": []
  },
  "GET /api/v2/views/{view_id}/export": {
    "path": [
      "view_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/views/{view_id}/tickets": {
    "path": [
      "view_id"
    ],
    "query": [
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/views/active": {
    "path": [],
    "query": [
      "access",
      "group_id",
      "sort_by",
      "sort_order"
    ],
    "headers": []
  },
  "GET /api/v2/views/compact": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/views/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/views/count_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "429": "Too Many Requests"
    }
  },
  "GET /api/v2/views/definitions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/views/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "POST /api/v2/views/preview": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "include",
      "exclude"
    ],
    "headers": []
  },
  "POST /api/v2/views/preview/count": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/views/search": {
    "path": [],
    "query": [
      "query",
      "access",
      "active",
      "group_id",
      "sort_by",
      "sort_order",
      "include"
    ],
    "headers": []
  },
  "GET /api/v2/views/show_many": {
    "path": [],
    "query": [
      "ids",
      "active"
    ],
    "headers": []
  },
  "PUT /api/v2/views/update_many": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/workspaces": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/workspaces": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/workspaces/{workspace_id}": {
    "path": [
      "workspace_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /api/v2/workspaces/{workspace_id}": {
    "path": [
      "workspace_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/workspaces/{workspace_id}": {
    "path": [
      "workspace_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/workspaces/destroy_many": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "PUT /api/v2/workspaces/reorder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /oauth/tokens": {
    "path": [],
    "query": [],
    "headers": []
  }
}

export class ZendeskService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('ZENDESK_BASE_URL') as string
  }

  async call<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    const route = ROUTES[`${method} ${path}`]
    let endpoint = path
    let body: Record<string, unknown> | undefined
    const query: Record<string, string> = {}
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (data && route) {
      // Interpolate path params
      for (const param of route.path) {
        if (data[param] !== undefined) {
          endpoint = endpoint.replace(`{${param}}`, String(data[param]))
        }
      }
      // Extract query params
      for (const param of route.query) {
        if (data[param] !== undefined) {
          query[param] = String(data[param])
        }
      }
      // Extract header params
      for (const param of route.headers) {
        if (data[param] !== undefined) {
          headers[param] = String(data[param])
        }
      }
      // Everything else goes into body
      const pathQueryHeaders = new Set([...route.path, ...route.query, ...route.headers])
      const remaining = Object.fromEntries(
        Object.entries(data).filter(([k]) => !pathQueryHeaders.has(k))
      )
      if (Object.keys(remaining).length > 0) {
        body = remaining
      }
    }

    const url = new URL(`${this.baseUrl}${endpoint}`)
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value)
    }

    headers.Authorization = `Bearer ${this.creds.apiKey}`

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      const errorMessage = route?.errors?.[response.status] ?? errorText
      switch (response.status) {
        case 400: throw new BadRequestError(errorMessage)
        case 401: throw new UnauthorizedError(errorMessage)
        case 403: throw new ForbiddenError(errorMessage)
        case 404: throw new NotFoundError(errorMessage)
        case 405: throw new MethodNotAllowedError(errorMessage)
        case 409: throw new ConflictError(errorMessage)
        case 422: throw new UnprocessableContentError(errorMessage)
        case 429: throw new TooManyRequestsError(errorMessage)
        case 500: throw new InternalServerError(errorMessage)
        default: throw new Error(`Zendesk API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
