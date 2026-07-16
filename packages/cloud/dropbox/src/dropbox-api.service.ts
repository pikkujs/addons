import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const DROPBOX_OAUTH2_CONFIG = {
  tokenSecretId: 'DROPBOX_TOKENS',
  authorizationUrl: "https://example.com/oauth2/authorize",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["read","write"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /files/properties/update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/move": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/relinquish_file_membership": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_folder_members": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/get_folder_metadata": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /users/get_current_account": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/users/list": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/unshare_file": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/revoke_shared_link": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/check_remove_member_job_status": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/update_file_member": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/upload_session/finish_batch/check": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/delete_batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/create_folder_batch/check": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/mount_folder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/restore": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_requests/update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/remove_for_team": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/properties/template/get": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/get_folder_info": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/copy_batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/properties/search": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/delete": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/properties/add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/check_share_job_status": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/get_thumbnail_batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/remove_folder_member": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/update_folder_member": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/create_shared_link_with_settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/properties/update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/unmount_folder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_received_files": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/sharing_policy/set": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/properties/remove": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/copy_batch/check": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/move_batch/check": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/list_folder/get_latest_cursor": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/sharing_policy/get": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/share_folder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/save_url/check_job_status": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/users/add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/copy_reference/save": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/add_file_member": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_folders/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/alpha/upload": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/list_folder/longpoll": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/remove_for_user": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/get_temporary_link": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_folder_members/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/add_for_user": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/upload_session/finish_batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/upload_session/append_v2": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/create_folder_v2": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/copy_reference/get": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/users/list/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/properties/search/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/list_folder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/upload_session/finish": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/get_shared_links": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/move_batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/list_folder/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/permanently_delete": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /users/get_space_usage": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/properties/add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/add_folder_member": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_shared_links": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/upload": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/update_for_user": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_received_files/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/download_zip": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/change_file_member_access": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/add_for_team": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/modify_shared_link_settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/create_shared_link": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/remove_file_member": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /auth/token/revoke": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/copy": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/get_shared_link_metadata": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/properties/overwrite": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/permanently_delete": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/unshare_folder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_mountable_folders/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/get_for_team": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/relinquish_folder_membership": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/download": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/search": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/get_file_metadata": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_mountable_folders": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/list_for_team": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/properties/remove": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/create_folder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_requests/list": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/archive": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /users/get_account_batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_requests/create": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_file_members": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/update_for_team": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_file_members/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /auth/token/from_oauth1": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/properties/overwrite": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_requests/get": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/list/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/get_thumbnail": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/update_folder_policy": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/set_access_inheritance": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/save_url": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/alpha/get_metadata": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/remove_file_member_2": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/copy_v2": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/upload_session/start": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/list_for_user": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/create_folder_batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /users/get_account": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/move_v2": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/folder_users/list/continue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/get_file_metadata/batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/users/remove": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/folder_users/list": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/upload_session/append": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_folders": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/get_metadata": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/list_file_members/batch": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/transfer_folder": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /file_properties/templates/get_for_user": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/list_revisions": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/get_preview": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/properties/template/list": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/create": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/list": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/get_shared_link_file": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /paper/docs/download": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/delete_batch/check": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /files/delete_v2": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sharing/check_job_status": {
    "path": [],
    "query": [],
    "headers": []
  }
}

export class DropboxService {
  private baseUrl: string
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService, variables: TypedVariablesService) {
    this.baseUrl = variables.get('DROPBOX_BASE_URL') as string
    this.oauth = new OAuth2Client(
      DROPBOX_OAUTH2_CONFIG,
      'DROPBOX_APP_CREDENTIALS',
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
        default: throw new Error(`Dropbox API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
