import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/addon/variables/pikku-variables.gen.js'

export const GOOGLE_DRIVE_OAUTH2_CONFIG = {
  tokenSecretId: 'GOOGLE_DRIVE_TOKENS',
  authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/drive.appdata","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive.metadata","https://www.googleapis.com/auth/drive.metadata.readonly","https://www.googleapis.com/auth/drive.photos.readonly","https://www.googleapis.com/auth/drive.readonly","https://www.googleapis.com/auth/drive.scripts"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /about": {
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
  "GET /changes": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageToken",
      "driveId",
      "includeCorpusRemovals",
      "includeItemsFromAllDrives",
      "includeLabels",
      "includePermissionsForView",
      "includeRemoved",
      "includeTeamDriveItems",
      "pageSize",
      "restrictToMyDrive",
      "spaces",
      "supportsAllDrives",
      "supportsTeamDrives",
      "teamDriveId"
    ],
    "headers": []
  },
  "GET /changes/startPageToken": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "driveId",
      "supportsAllDrives",
      "supportsTeamDrives",
      "teamDriveId"
    ],
    "headers": []
  },
  "POST /changes/watch": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageToken",
      "driveId",
      "includeCorpusRemovals",
      "includeItemsFromAllDrives",
      "includeLabels",
      "includePermissionsForView",
      "includeRemoved",
      "includeTeamDriveItems",
      "pageSize",
      "restrictToMyDrive",
      "spaces",
      "supportsAllDrives",
      "supportsTeamDrives",
      "teamDriveId"
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
  "GET /drives": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageSize",
      "pageToken",
      "q",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "POST /drives": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "requestId"
    ],
    "headers": []
  },
  "GET /drives/{driveId}": {
    "path": [
      "driveId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "PATCH /drives/{driveId}": {
    "path": [
      "driveId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "DELETE /drives/{driveId}": {
    "path": [
      "driveId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "allowItemDeletion",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "POST /drives/{driveId}/hide": {
    "path": [
      "driveId"
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
  "POST /drives/{driveId}/unhide": {
    "path": [
      "driveId"
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
  "GET /files": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "corpora",
      "corpus",
      "driveId",
      "includeItemsFromAllDrives",
      "includeLabels",
      "includePermissionsForView",
      "includeTeamDriveItems",
      "orderBy",
      "pageSize",
      "pageToken",
      "q",
      "spaces",
      "supportsAllDrives",
      "supportsTeamDrives",
      "teamDriveId"
    ],
    "headers": []
  },
  "POST /files": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "enforceSingleParent",
      "ignoreDefaultVisibility",
      "includeLabels",
      "includePermissionsForView",
      "keepRevisionForever",
      "ocrLanguage",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useContentAsIndexableText"
    ],
    "headers": []
  },
  "GET /files/generateIds": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "count",
      "space",
      "type"
    ],
    "headers": []
  },
  "DELETE /files/trash": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "driveId",
      "enforceSingleParent"
    ],
    "headers": []
  },
  "GET /files/{fileId}": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "acknowledgeAbuse",
      "includeLabels",
      "includePermissionsForView",
      "supportsAllDrives",
      "supportsTeamDrives"
    ],
    "headers": []
  },
  "PATCH /files/{fileId}": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "addParents",
      "enforceSingleParent",
      "includeLabels",
      "includePermissionsForView",
      "keepRevisionForever",
      "ocrLanguage",
      "removeParents",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useContentAsIndexableText"
    ],
    "headers": []
  },
  "DELETE /files/{fileId}": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "enforceSingleParent",
      "supportsAllDrives",
      "supportsTeamDrives"
    ],
    "headers": []
  },
  "GET /files/{fileId}/comments": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includeDeleted",
      "pageSize",
      "pageToken",
      "startModifiedTime"
    ],
    "headers": []
  },
  "POST /files/{fileId}/comments": {
    "path": [
      "fileId"
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
  "GET /files/{fileId}/comments/{commentId}": {
    "path": [
      "fileId",
      "commentId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includeDeleted"
    ],
    "headers": []
  },
  "PATCH /files/{fileId}/comments/{commentId}": {
    "path": [
      "fileId",
      "commentId"
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
  "DELETE /files/{fileId}/comments/{commentId}": {
    "path": [
      "fileId",
      "commentId"
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
  "GET /files/{fileId}/comments/{commentId}/replies": {
    "path": [
      "fileId",
      "commentId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includeDeleted",
      "pageSize",
      "pageToken"
    ],
    "headers": []
  },
  "POST /files/{fileId}/comments/{commentId}/replies": {
    "path": [
      "fileId",
      "commentId"
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
  "GET /files/{fileId}/comments/{commentId}/replies/{replyId}": {
    "path": [
      "fileId",
      "commentId",
      "replyId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includeDeleted"
    ],
    "headers": []
  },
  "PATCH /files/{fileId}/comments/{commentId}/replies/{replyId}": {
    "path": [
      "fileId",
      "commentId",
      "replyId"
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
  "DELETE /files/{fileId}/comments/{commentId}/replies/{replyId}": {
    "path": [
      "fileId",
      "commentId",
      "replyId"
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
  "POST /files/{fileId}/copy": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "enforceSingleParent",
      "ignoreDefaultVisibility",
      "includeLabels",
      "includePermissionsForView",
      "keepRevisionForever",
      "ocrLanguage",
      "supportsAllDrives",
      "supportsTeamDrives"
    ],
    "headers": []
  },
  "GET /files/{fileId}/export": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "mimeType"
    ],
    "headers": []
  },
  "GET /files/{fileId}/listLabels": {
    "path": [
      "fileId"
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
      "pageToken"
    ],
    "headers": []
  },
  "POST /files/{fileId}/modifyLabels": {
    "path": [
      "fileId"
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
  "GET /files/{fileId}/permissions": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includePermissionsForView",
      "pageSize",
      "pageToken",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "POST /files/{fileId}/permissions": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "emailMessage",
      "enforceSingleParent",
      "moveToNewOwnersRoot",
      "sendNotificationEmail",
      "supportsAllDrives",
      "supportsTeamDrives",
      "transferOwnership",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "GET /files/{fileId}/permissions/{permissionId}": {
    "path": [
      "fileId",
      "permissionId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "PATCH /files/{fileId}/permissions/{permissionId}": {
    "path": [
      "fileId",
      "permissionId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "removeExpiration",
      "supportsAllDrives",
      "supportsTeamDrives",
      "transferOwnership",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "DELETE /files/{fileId}/permissions/{permissionId}": {
    "path": [
      "fileId",
      "permissionId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "GET /files/{fileId}/revisions": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageSize",
      "pageToken"
    ],
    "headers": []
  },
  "GET /files/{fileId}/revisions/{revisionId}": {
    "path": [
      "fileId",
      "revisionId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "acknowledgeAbuse"
    ],
    "headers": []
  },
  "PATCH /files/{fileId}/revisions/{revisionId}": {
    "path": [
      "fileId",
      "revisionId"
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
  "DELETE /files/{fileId}/revisions/{revisionId}": {
    "path": [
      "fileId",
      "revisionId"
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
  "POST /files/{fileId}/watch": {
    "path": [
      "fileId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "acknowledgeAbuse",
      "includeLabels",
      "includePermissionsForView",
      "supportsAllDrives",
      "supportsTeamDrives"
    ],
    "headers": []
  },
  "GET /teamdrives": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageSize",
      "pageToken",
      "q",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "POST /teamdrives": {
    "path": [],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "requestId"
    ],
    "headers": []
  },
  "GET /teamdrives/{teamDriveId}": {
    "path": [
      "teamDriveId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "PATCH /teamdrives/{teamDriveId}": {
    "path": [
      "teamDriveId"
    ],
    "query": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "useDomainAdminAccess"
    ],
    "headers": []
  },
  "DELETE /teamdrives/{teamDriveId}": {
    "path": [
      "teamDriveId"
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

export class GoogleDriveService {
  private baseUrl: string

  constructor(private creds: { accessToken: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('GOOGLE_DRIVE_BASE_URL') as string
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

    headers.Authorization = `Bearer ${this.creds.accessToken}`

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
        default: throw new Error(`Google Drive API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
