import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const SLACK_OAUTH2_CONFIG = {
  tokenSecretId: 'SLACK_TOKENS',
  authorizationUrl: "https://slack.com/oauth/authorize",
  tokenUrl: "https://slack.com/api/oauth.access",
  scopes: ["admin","admin.apps:read","admin.apps:write","admin.conversations:read","admin.conversations:write","admin.invites:read","admin.invites:write","admin.teams:read","admin.teams:write","admin.usergroups:read","admin.usergroups:write","admin.users:read","admin.users:write","authorizations:read","bot","calls:read","calls:write","channels:history","channels:manage","channels:read","channels:write","chat:write","chat:write:bot","chat:write:user","conversations:history","conversations:read","conversations:write","dnd:read","dnd:write","emoji:read","files:read","files:write:user","groups:history","groups:read","groups:write","identity.basic","im:history","im:read","im:write","links:write","mpim:history","mpim:read","mpim:write","none","pins:read","pins:write","reactions:read","reactions:write","reminders:read","reminders:write","remote_files:read","remote_files:share","remote_files:write","rtm:stream","search:read","stars:read","stars:write","team:read","tokens.basic","usergroups:read","usergroups:write","users.profile:read","users.profile:write","users:read","users:read.email","users:write","workflow.steps:execute"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /admin.apps.approve": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /admin.apps.approved.list": {
    "path": [],
    "query": [
      "token",
      "limit",
      "cursor",
      "team_id",
      "enterprise_id"
    ],
    "headers": []
  },
  "GET /admin.apps.requests.list": {
    "path": [],
    "query": [
      "token",
      "limit",
      "cursor",
      "team_id"
    ],
    "headers": []
  },
  "POST /admin.apps.restrict": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /admin.apps.restricted.list": {
    "path": [],
    "query": [
      "token",
      "limit",
      "cursor",
      "team_id",
      "enterprise_id"
    ],
    "headers": []
  },
  "POST /admin.conversations.archive": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.convertToPrivate": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.create": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.delete": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.disconnectShared": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /admin.conversations.ekm.listOriginalConnectedChannelInfo": {
    "path": [],
    "query": [
      "token",
      "channel_ids",
      "team_ids",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "GET /admin.conversations.getConversationPrefs": {
    "path": [],
    "query": [
      "channel_id"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /admin.conversations.getTeams": {
    "path": [],
    "query": [
      "channel_id",
      "cursor",
      "limit"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.invite": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.rename": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.restrictAccess.addGroup": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /admin.conversations.restrictAccess.listGroups": {
    "path": [],
    "query": [
      "token",
      "channel_id",
      "team_id"
    ],
    "headers": []
  },
  "POST /admin.conversations.restrictAccess.removeGroup": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /admin.conversations.search": {
    "path": [],
    "query": [
      "team_ids",
      "query",
      "limit",
      "cursor",
      "search_channel_types",
      "sort",
      "sort_dir"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.setConversationPrefs": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.setTeams": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.conversations.unarchive": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.emoji.add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /admin.emoji.addAlias": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /admin.emoji.list": {
    "path": [],
    "query": [
      "token",
      "cursor",
      "limit"
    ],
    "headers": []
  },
  "POST /admin.emoji.remove": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /admin.emoji.rename": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /admin.inviteRequests.approve": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /admin.inviteRequests.approved.list": {
    "path": [],
    "query": [
      "team_id",
      "cursor",
      "limit"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /admin.inviteRequests.denied.list": {
    "path": [],
    "query": [
      "team_id",
      "cursor",
      "limit"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /admin.inviteRequests.deny": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /admin.inviteRequests.list": {
    "path": [],
    "query": [
      "team_id",
      "cursor",
      "limit"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /admin.teams.admins.list": {
    "path": [],
    "query": [
      "token",
      "limit",
      "cursor",
      "team_id"
    ],
    "headers": []
  },
  "POST /admin.teams.create": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /admin.teams.list": {
    "path": [],
    "query": [
      "limit",
      "cursor"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /admin.teams.owners.list": {
    "path": [],
    "query": [
      "token",
      "team_id",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "GET /admin.teams.settings.info": {
    "path": [],
    "query": [
      "team_id"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /admin.teams.settings.setDefaultChannels": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /admin.teams.settings.setDescription": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.teams.settings.setDiscoverability": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.teams.settings.setIcon": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /admin.teams.settings.setName": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.usergroups.addChannels": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.usergroups.addTeams": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /admin.usergroups.listChannels": {
    "path": [],
    "query": [
      "usergroup_id",
      "team_id",
      "include_num_members"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /admin.usergroups.removeChannels": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.assign": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.invite": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /admin.users.list": {
    "path": [],
    "query": [
      "team_id",
      "cursor",
      "limit"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.remove": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.session.invalidate": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.session.reset": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.setAdmin": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.setExpiration": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.setOwner": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /admin.users.setRegular": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /api.test": {
    "path": [],
    "query": [
      "error",
      "foo"
    ],
    "headers": []
  },
  "GET /apps.event.authorizations.list": {
    "path": [],
    "query": [
      "event_context",
      "cursor",
      "limit"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /apps.permissions.info": {
    "path": [],
    "query": [
      "token"
    ],
    "headers": []
  },
  "GET /apps.permissions.request": {
    "path": [],
    "query": [
      "token",
      "scopes",
      "trigger_id"
    ],
    "headers": []
  },
  "GET /apps.permissions.resources.list": {
    "path": [],
    "query": [
      "token",
      "cursor",
      "limit"
    ],
    "headers": []
  },
  "GET /apps.permissions.scopes.list": {
    "path": [],
    "query": [
      "token"
    ],
    "headers": []
  },
  "GET /apps.permissions.users.list": {
    "path": [],
    "query": [
      "token",
      "cursor",
      "limit"
    ],
    "headers": []
  },
  "GET /apps.permissions.users.request": {
    "path": [],
    "query": [
      "token",
      "scopes",
      "trigger_id",
      "user"
    ],
    "headers": []
  },
  "GET /apps.uninstall": {
    "path": [],
    "query": [
      "token",
      "client_id",
      "client_secret"
    ],
    "headers": []
  },
  "GET /auth.revoke": {
    "path": [],
    "query": [
      "token",
      "test"
    ],
    "headers": []
  },
  "GET /auth.test": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /bots.info": {
    "path": [],
    "query": [
      "token",
      "bot"
    ],
    "headers": []
  },
  "POST /calls.add": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /calls.end": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /calls.info": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /calls.participants.add": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /calls.participants.remove": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /calls.update": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /chat.delete": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /chat.deleteScheduledMessage": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /chat.getPermalink": {
    "path": [],
    "query": [
      "token",
      "channel",
      "message_ts"
    ],
    "headers": []
  },
  "POST /chat.meMessage": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /chat.postEphemeral": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /chat.postMessage": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /chat.scheduleMessage": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /chat.scheduledMessages.list": {
    "path": [],
    "query": [
      "channel",
      "latest",
      "oldest",
      "limit",
      "cursor"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /chat.unfurl": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /chat.update": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.archive": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.close": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.create": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /conversations.history": {
    "path": [],
    "query": [
      "token",
      "channel",
      "latest",
      "oldest",
      "inclusive",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "GET /conversations.info": {
    "path": [],
    "query": [
      "token",
      "channel",
      "include_locale",
      "include_num_members"
    ],
    "headers": []
  },
  "POST /conversations.invite": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.join": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.kick": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.leave": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /conversations.list": {
    "path": [],
    "query": [
      "token",
      "exclude_archived",
      "types",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "POST /conversations.mark": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /conversations.members": {
    "path": [],
    "query": [
      "token",
      "channel",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "POST /conversations.open": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.rename": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /conversations.replies": {
    "path": [],
    "query": [
      "token",
      "channel",
      "ts",
      "latest",
      "oldest",
      "inclusive",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "POST /conversations.setPurpose": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.setTopic": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /conversations.unarchive": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /dialog.open": {
    "path": [],
    "query": [
      "dialog",
      "trigger_id"
    ],
    "headers": [
      "token"
    ]
  },
  "POST /dnd.endDnd": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /dnd.endSnooze": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /dnd.info": {
    "path": [],
    "query": [
      "token",
      "user"
    ],
    "headers": []
  },
  "POST /dnd.setSnooze": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /dnd.teamInfo": {
    "path": [],
    "query": [
      "token",
      "users"
    ],
    "headers": []
  },
  "GET /emoji.list": {
    "path": [],
    "query": [
      "token"
    ],
    "headers": []
  },
  "POST /files.comments.delete": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /files.delete": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /files.info": {
    "path": [],
    "query": [
      "token",
      "file",
      "count",
      "page",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "GET /files.list": {
    "path": [],
    "query": [
      "token",
      "user",
      "channel",
      "ts_from",
      "ts_to",
      "types",
      "count",
      "page",
      "show_files_hidden_by_limit"
    ],
    "headers": []
  },
  "POST /files.remote.add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /files.remote.info": {
    "path": [],
    "query": [
      "token",
      "file",
      "external_id"
    ],
    "headers": []
  },
  "GET /files.remote.list": {
    "path": [],
    "query": [
      "token",
      "channel",
      "ts_from",
      "ts_to",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "POST /files.remote.remove": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /files.remote.share": {
    "path": [],
    "query": [
      "token",
      "file",
      "external_id",
      "channels"
    ],
    "headers": []
  },
  "POST /files.remote.update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files.revokePublicURL": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /files.sharedPublicURL": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /files.upload": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /migration.exchange": {
    "path": [],
    "query": [
      "token",
      "users",
      "team_id",
      "to_old"
    ],
    "headers": []
  },
  "GET /oauth.access": {
    "path": [],
    "query": [
      "client_id",
      "client_secret",
      "code",
      "redirect_uri",
      "single_channel"
    ],
    "headers": []
  },
  "GET /oauth.token": {
    "path": [],
    "query": [
      "client_id",
      "client_secret",
      "code",
      "redirect_uri",
      "single_channel"
    ],
    "headers": []
  },
  "GET /oauth.v2.access": {
    "path": [],
    "query": [
      "client_id",
      "client_secret",
      "code",
      "redirect_uri"
    ],
    "headers": []
  },
  "POST /pins.add": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /pins.list": {
    "path": [],
    "query": [
      "token",
      "channel"
    ],
    "headers": []
  },
  "POST /pins.remove": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /reactions.add": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /reactions.get": {
    "path": [],
    "query": [
      "token",
      "channel",
      "file",
      "file_comment",
      "full",
      "timestamp"
    ],
    "headers": []
  },
  "GET /reactions.list": {
    "path": [],
    "query": [
      "token",
      "user",
      "full",
      "count",
      "page",
      "cursor",
      "limit"
    ],
    "headers": []
  },
  "POST /reactions.remove": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /reminders.add": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /reminders.complete": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /reminders.delete": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /reminders.info": {
    "path": [],
    "query": [
      "token",
      "reminder"
    ],
    "headers": []
  },
  "GET /reminders.list": {
    "path": [],
    "query": [
      "token"
    ],
    "headers": []
  },
  "GET /rtm.connect": {
    "path": [],
    "query": [
      "token",
      "batch_presence_aware",
      "presence_sub"
    ],
    "headers": []
  },
  "GET /search.messages": {
    "path": [],
    "query": [
      "token",
      "count",
      "highlight",
      "page",
      "query",
      "sort",
      "sort_dir"
    ],
    "headers": []
  },
  "POST /stars.add": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /stars.list": {
    "path": [],
    "query": [
      "token",
      "count",
      "page",
      "cursor",
      "limit"
    ],
    "headers": []
  },
  "POST /stars.remove": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /team.accessLogs": {
    "path": [],
    "query": [
      "token",
      "before",
      "count",
      "page"
    ],
    "headers": []
  },
  "GET /team.billableInfo": {
    "path": [],
    "query": [
      "token",
      "user"
    ],
    "headers": []
  },
  "GET /team.info": {
    "path": [],
    "query": [
      "token",
      "team"
    ],
    "headers": []
  },
  "GET /team.integrationLogs": {
    "path": [],
    "query": [
      "token",
      "app_id",
      "change_type",
      "count",
      "page",
      "service_id",
      "user"
    ],
    "headers": []
  },
  "GET /team.profile.get": {
    "path": [],
    "query": [
      "token",
      "visibility"
    ],
    "headers": []
  },
  "POST /usergroups.create": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /usergroups.disable": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /usergroups.enable": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /usergroups.list": {
    "path": [],
    "query": [
      "include_users",
      "token",
      "include_count",
      "include_disabled"
    ],
    "headers": []
  },
  "POST /usergroups.update": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /usergroups.users.list": {
    "path": [],
    "query": [
      "token",
      "include_disabled",
      "usergroup"
    ],
    "headers": []
  },
  "POST /usergroups.users.update": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /users.conversations": {
    "path": [],
    "query": [
      "token",
      "user",
      "types",
      "exclude_archived",
      "limit",
      "cursor"
    ],
    "headers": []
  },
  "POST /users.deletePhoto": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /users.getPresence": {
    "path": [],
    "query": [
      "token",
      "user"
    ],
    "headers": []
  },
  "GET /users.identity": {
    "path": [],
    "query": [
      "token"
    ],
    "headers": []
  },
  "GET /users.info": {
    "path": [],
    "query": [
      "token",
      "include_locale",
      "user"
    ],
    "headers": []
  },
  "GET /users.list": {
    "path": [],
    "query": [
      "token",
      "limit",
      "cursor",
      "include_locale"
    ],
    "headers": []
  },
  "GET /users.lookupByEmail": {
    "path": [],
    "query": [
      "token",
      "email"
    ],
    "headers": []
  },
  "GET /users.profile.get": {
    "path": [],
    "query": [
      "token",
      "include_labels",
      "user"
    ],
    "headers": []
  },
  "POST /users.profile.set": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /users.setActive": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "POST /users.setPhoto": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /users.setPresence": {
    "path": [],
    "query": [],
    "headers": [
      "token"
    ]
  },
  "GET /views.open": {
    "path": [],
    "query": [
      "trigger_id",
      "view"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /views.publish": {
    "path": [],
    "query": [
      "user_id",
      "view",
      "hash"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /views.push": {
    "path": [],
    "query": [
      "trigger_id",
      "view"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /views.update": {
    "path": [],
    "query": [
      "view_id",
      "external_id",
      "view",
      "hash"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /workflows.stepCompleted": {
    "path": [],
    "query": [
      "workflow_step_execute_id",
      "outputs"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /workflows.stepFailed": {
    "path": [],
    "query": [
      "workflow_step_execute_id",
      "error"
    ],
    "headers": [
      "token"
    ]
  },
  "GET /workflows.updateStep": {
    "path": [],
    "query": [
      "workflow_step_edit_id",
      "inputs",
      "outputs",
      "step_name",
      "step_image_url"
    ],
    "headers": [
      "token"
    ]
  }
}

export class SlackService {
  private baseUrl: string
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService, variables: TypedVariablesService) {
    this.baseUrl = variables.get('SLACK_BASE_URL') as string
    this.oauth = new OAuth2Client(
      SLACK_OAUTH2_CONFIG,
      'SLACK_APP_CREDENTIALS',
      secrets
    )
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

    const response = await this.oauth.request(url.toString(), {
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
        default: throw new Error(`Slack API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
