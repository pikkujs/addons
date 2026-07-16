import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const GOOGLE_CALENDAR_OAUTH2_CONFIG = {
  tokenSecretId: 'GOOGLE_CALENDAR_TOKENS',
  authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/calendar.events.readonly","https://www.googleapis.com/auth/calendar.readonly","https://www.googleapis.com/auth/calendar.settings.readonly"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /calendars": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "GET /calendars/{calendarId}": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "PUT /calendars/{calendarId}": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "PATCH /calendars/{calendarId}": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "DELETE /calendars/{calendarId}": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "GET /calendars/{calendarId}/acl": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken",
      "showDeleted",
      "syncToken"
    ],
    "headers": []
  },
  "POST /calendars/{calendarId}/acl": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "sendNotifications"
    ],
    "headers": []
  },
  "POST /calendars/{calendarId}/acl/watch": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken",
      "showDeleted",
      "syncToken"
    ],
    "headers": []
  },
  "GET /calendars/{calendarId}/acl/{ruleId}": {
    "path": [
      "calendarId",
      "ruleId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "PUT /calendars/{calendarId}/acl/{ruleId}": {
    "path": [
      "calendarId",
      "ruleId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "sendNotifications"
    ],
    "headers": []
  },
  "PATCH /calendars/{calendarId}/acl/{ruleId}": {
    "path": [
      "calendarId",
      "ruleId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "sendNotifications"
    ],
    "headers": []
  },
  "DELETE /calendars/{calendarId}/acl/{ruleId}": {
    "path": [
      "calendarId",
      "ruleId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "POST /calendars/{calendarId}/clear": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "GET /calendars/{calendarId}/events": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "eventTypes",
      "iCalUID",
      "maxAttendees",
      "maxResults",
      "orderBy",
      "pageToken",
      "privateExtendedProperty",
      "q",
      "sharedExtendedProperty",
      "showDeleted",
      "showHiddenInvitations",
      "singleEvents",
      "syncToken",
      "timeMax",
      "timeMin",
      "timeZone",
      "updatedMin"
    ],
    "headers": []
  },
  "POST /calendars/{calendarId}/events": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "conferenceDataVersion",
      "maxAttendees",
      "sendNotifications",
      "sendUpdates",
      "supportsAttachments"
    ],
    "headers": []
  },
  "POST /calendars/{calendarId}/events/import": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "conferenceDataVersion",
      "supportsAttachments"
    ],
    "headers": []
  },
  "POST /calendars/{calendarId}/events/quickAdd": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "text",
      "sendNotifications",
      "sendUpdates"
    ],
    "headers": []
  },
  "POST /calendars/{calendarId}/events/watch": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "eventTypes",
      "iCalUID",
      "maxAttendees",
      "maxResults",
      "orderBy",
      "pageToken",
      "privateExtendedProperty",
      "q",
      "sharedExtendedProperty",
      "showDeleted",
      "showHiddenInvitations",
      "singleEvents",
      "syncToken",
      "timeMax",
      "timeMin",
      "timeZone",
      "updatedMin"
    ],
    "headers": []
  },
  "GET /calendars/{calendarId}/events/{eventId}": {
    "path": [
      "calendarId",
      "eventId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "maxAttendees",
      "timeZone"
    ],
    "headers": []
  },
  "PUT /calendars/{calendarId}/events/{eventId}": {
    "path": [
      "calendarId",
      "eventId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "conferenceDataVersion",
      "maxAttendees",
      "sendNotifications",
      "sendUpdates",
      "supportsAttachments"
    ],
    "headers": []
  },
  "PATCH /calendars/{calendarId}/events/{eventId}": {
    "path": [
      "calendarId",
      "eventId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "conferenceDataVersion",
      "maxAttendees",
      "sendNotifications",
      "sendUpdates",
      "supportsAttachments"
    ],
    "headers": []
  },
  "DELETE /calendars/{calendarId}/events/{eventId}": {
    "path": [
      "calendarId",
      "eventId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "sendNotifications",
      "sendUpdates"
    ],
    "headers": []
  },
  "GET /calendars/{calendarId}/events/{eventId}/instances": {
    "path": [
      "calendarId",
      "eventId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "maxAttendees",
      "maxResults",
      "originalStart",
      "pageToken",
      "showDeleted",
      "timeMax",
      "timeMin",
      "timeZone"
    ],
    "headers": []
  },
  "POST /calendars/{calendarId}/events/{eventId}/move": {
    "path": [
      "calendarId",
      "eventId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "destination",
      "sendNotifications",
      "sendUpdates"
    ],
    "headers": []
  },
  "POST /channels/stop": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "GET /colors": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "POST /freeBusy": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "GET /users/me/calendarList": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "minAccessRole",
      "pageToken",
      "showDeleted",
      "showHidden",
      "syncToken"
    ],
    "headers": []
  },
  "POST /users/me/calendarList": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "colorRgbFormat"
    ],
    "headers": []
  },
  "POST /users/me/calendarList/watch": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "minAccessRole",
      "pageToken",
      "showDeleted",
      "showHidden",
      "syncToken"
    ],
    "headers": []
  },
  "GET /users/me/calendarList/{calendarId}": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "PUT /users/me/calendarList/{calendarId}": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "colorRgbFormat"
    ],
    "headers": []
  },
  "PATCH /users/me/calendarList/{calendarId}": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "colorRgbFormat"
    ],
    "headers": []
  },
  "DELETE /users/me/calendarList/{calendarId}": {
    "path": [
      "calendarId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  },
  "GET /users/me/settings": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken",
      "syncToken"
    ],
    "headers": []
  },
  "POST /users/me/settings/watch": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken",
      "syncToken"
    ],
    "headers": []
  },
  "GET /users/me/settings/{setting}": {
    "path": [
      "setting"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "headers": []
  }
}

export class GoogleCalendarService {
  private baseUrl: string
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService, variables: TypedVariablesService) {
    this.baseUrl = variables.get('GOOGLE_CALENDAR_BASE_URL') as string
    this.oauth = new OAuth2Client(
      GOOGLE_CALENDAR_OAUTH2_CONFIG,
      'GOOGLE_CALENDAR_APP_CREDENTIALS',
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
        default: throw new Error(`Google Calendar API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
