import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const MICROSOFT_OUTLOOK_OAUTH2_CONFIG = {
  tokenSecretId: 'MICROSOFT_OUTLOOK_TOKENS',
  authorizationUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  scopes: [],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /users/{user-id}/inferenceClassification": {
    "path": [
      "user-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/inferenceClassification": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/inferenceClassification/overrides": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/inferenceClassification/overrides": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/inferenceClassification/overrides/{inferenceClassificationOverride-id}": {
    "path": [
      "user-id",
      "inferenceClassificationOverride-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/inferenceClassification/overrides/{inferenceClassificationOverride-id}": {
    "path": [
      "user-id",
      "inferenceClassificationOverride-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/inferenceClassification/overrides/{inferenceClassificationOverride-id}": {
    "path": [
      "user-id",
      "inferenceClassificationOverride-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/inferenceClassification/overrides/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders": {
    "path": [
      "user-id"
    ],
    "query": [
      "includeHiddenFolders",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "includeHiddenFolders",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/mailFolders/{mailFolder-id}": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "includeHiddenFolders",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [
      "includeHiddenFolders",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messageRules": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messageRules": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messageRules/{messageRule-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "messageRule-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messageRules/{messageRule-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "messageRule-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messageRules/{messageRule-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "messageRule-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messageRules/$count": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/attachments": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/attachments": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/attachments/$count": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/extensions": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/extensions": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/extensions/$count": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.copy": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.createForward": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.createReply": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.createReplyAll": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.forward": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.move": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.reply": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.replyAll": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/microsoft.graph.send": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/$count": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [
      "changeType",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/microsoft.graph.copy": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/microsoft.graph.move": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "mailFolder-id",
      "mailFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/$count": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/childFolders/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messageRules": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messageRules": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messageRules/{messageRule-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "messageRule-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/mailFolders/{mailFolder-id}/messageRules/{messageRule-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "messageRule-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/messageRules/{messageRule-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "messageRule-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messageRules/$count": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/attachments": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/attachments": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/attachments/$count": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions/$count": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.copy": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.createForward": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.createReply": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.createReplyAll": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.forward": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.move": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.reply": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.replyAll": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.send": {
    "path": [
      "user-id",
      "mailFolder-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/$count": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/{mailFolder-id}/messages/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [
      "changeType",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/microsoft.graph.copy": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/microsoft.graph.move": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/mailFolders/{mailFolder-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "mailFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/mailFolders/microsoft.graph.delta()": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/messages": {
    "path": [
      "user-id"
    ],
    "query": [
      "includeHiddenMessages",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/messages": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/messages/{message-id}": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [
      "includeHiddenMessages",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/messages/{message-id}": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/messages/{message-id}": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /users/{user-id}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/messages/{message-id}/$value": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/messages/{message-id}/attachments": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/attachments": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/messages/{message-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "message-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /users/{user-id}/messages/{message-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "message-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/messages/{message-id}/attachments/$count": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/messages/{message-id}/extensions": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/extensions": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "message-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "message-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/messages/{message-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "message-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/messages/{message-id}/extensions/$count": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.copy": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.createForward": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.createReply": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.createReplyAll": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.forward": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.move": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.reply": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.replyAll": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/messages/{message-id}/microsoft.graph.send": {
    "path": [
      "user-id",
      "message-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/messages/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/messages/microsoft.graph.delta()": {
    "path": [
      "user-id"
    ],
    "query": [
      "changeType",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar": {
    "path": [
      "group-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/calendarPermissions": {
    "path": [
      "group-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/calendarPermissions": {
    "path": [
      "group-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "group-id",
      "calendarPermission-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /groups/{group-id}/calendar/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "group-id",
      "calendarPermission-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /groups/{group-id}/calendar/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "group-id",
      "calendarPermission-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /groups/{group-id}/calendar/calendarPermissions/$count": {
    "path": [
      "group-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/calendarView": {
    "path": [
      "group-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/calendarView/microsoft.graph.delta()": {
    "path": [
      "group-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events": {
    "path": [
      "group-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events": {
    "path": [
      "group-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/{event-id}": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /groups/{group-id}/calendar/events/{event-id}": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /groups/{group-id}/calendar/events/{event-id}": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/attachments": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/attachments": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "group-id",
      "event-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /groups/{group-id}/calendar/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "group-id",
      "event-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/attachments/$count": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/calendar": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/extensions": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/extensions": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "group-id",
      "event-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /groups/{group-id}/calendar/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "group-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /groups/{group-id}/calendar/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "group-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/extensions/$count": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/instances": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/{event-id}/instances/microsoft.graph.delta()": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/microsoft.graph.accept": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/microsoft.graph.cancel": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/microsoft.graph.decline": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/microsoft.graph.dismissReminder": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/microsoft.graph.forward": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/microsoft.graph.permanentDelete": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/microsoft.graph.snoozeReminder": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/events/{event-id}/microsoft.graph.tentativelyAccept": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/$count": {
    "path": [
      "group-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/events/microsoft.graph.delta()": {
    "path": [
      "group-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendar/microsoft.graph.allowedCalendarSharingRoles(User='{User}')": {
    "path": [
      "group-id",
      "User"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/microsoft.graph.getSchedule": {
    "path": [
      "group-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/calendar/microsoft.graph.permanentDelete": {
    "path": [
      "group-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/calendarView": {
    "path": [
      "group-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/calendarView/microsoft.graph.delta()": {
    "path": [
      "group-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/events": {
    "path": [
      "group-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/events": {
    "path": [
      "group-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/events/{event-id}": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /groups/{group-id}/events/{event-id}": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /groups/{group-id}/events/{event-id}": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /groups/{group-id}/events/{event-id}/attachments": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/attachments": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "group-id",
      "event-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /groups/{group-id}/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "group-id",
      "event-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /groups/{group-id}/events/{event-id}/attachments/$count": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/events/{event-id}/calendar": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/events/{event-id}/extensions": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/extensions": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "group-id",
      "event-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /groups/{group-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "group-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /groups/{group-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "group-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /groups/{group-id}/events/{event-id}/extensions/$count": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/events/{event-id}/instances": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/events/{event-id}/instances/microsoft.graph.delta()": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/microsoft.graph.accept": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/microsoft.graph.cancel": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/microsoft.graph.decline": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/microsoft.graph.dismissReminder": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/microsoft.graph.forward": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/microsoft.graph.permanentDelete": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/microsoft.graph.snoozeReminder": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /groups/{group-id}/events/{event-id}/microsoft.graph.tentativelyAccept": {
    "path": [
      "group-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /groups/{group-id}/events/$count": {
    "path": [
      "group-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /groups/{group-id}/events/microsoft.graph.delta()": {
    "path": [
      "group-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /places": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PATCH /places/{place-id}": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/checkIns/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building": {
    "path": [
      "place-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.building/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.building/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.building/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.building/checkIns/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map": {
    "path": [
      "place-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.building/map": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.building/map": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.building/map/footprints": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.building/map/footprints": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/footprints/{footprintMap-id}": {
    "path": [
      "place-id",
      "footprintMap-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.building/map/footprints/{footprintMap-id}": {
    "path": [
      "place-id",
      "footprintMap-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.building/map/footprints/{footprintMap-id}": {
    "path": [
      "place-id",
      "footprintMap-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.building/map/footprints/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.building/map/levels": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures/{fixtureMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "fixtureMap-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures/{fixtureMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "fixtureMap-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures/{fixtureMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "fixtureMap-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures/$count": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections/{sectionMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "sectionMap-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections/{sectionMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "sectionMap-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections/{sectionMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "sectionMap-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections/$count": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units/{unitMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "unitMap-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units/{unitMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "unitMap-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units/{unitMap-id}": {
    "path": [
      "place-id",
      "levelMap-id",
      "unitMap-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units/$count": {
    "path": [
      "place-id",
      "levelMap-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.building/map/levels/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.descendants()": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.desk": {
    "path": [
      "place-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.desk/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.desk/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.desk/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.desk/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.desk/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.desk/checkIns/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.floor": {
    "path": [
      "place-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.floor/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.floor/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.floor/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.floor/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.floor/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.floor/checkIns/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.room": {
    "path": [
      "place-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.room/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.room/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.room/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.room/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.room/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.room/checkIns/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList": {
    "path": [
      "place-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.roomList/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.roomList/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.roomList/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.roomList/checkIns/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/rooms": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.roomList/rooms": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}": {
    "path": [
      "place-id",
      "room-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}": {
    "path": [
      "place-id",
      "room-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}": {
    "path": [
      "place-id",
      "room-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}/checkIns": {
    "path": [
      "place-id",
      "room-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}/checkIns": {
    "path": [
      "place-id",
      "room-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "room-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "room-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "room-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.roomList/rooms/{room-id}/checkIns/$count": {
    "path": [
      "place-id",
      "room-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/rooms/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/workspaces": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.roomList/workspaces": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}": {
    "path": [
      "place-id",
      "workspace-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}": {
    "path": [
      "place-id",
      "workspace-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}": {
    "path": [
      "place-id",
      "workspace-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}/checkIns": {
    "path": [
      "place-id",
      "workspace-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}/checkIns": {
    "path": [
      "place-id",
      "workspace-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "workspace-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "workspace-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "workspace-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}/checkIns/$count": {
    "path": [
      "place-id",
      "workspace-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.roomList/workspaces/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.section": {
    "path": [
      "place-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.section/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.section/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.section/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.section/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.section/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.section/checkIns/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.workspace": {
    "path": [
      "place-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.workspace/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /places/{place-id}/microsoft.graph.workspace/checkIns": {
    "path": [
      "place-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /places/{place-id}/microsoft.graph.workspace/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /places/{place-id}/microsoft.graph.workspace/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /places/{place-id}/microsoft.graph.workspace/checkIns/{checkInClaim-calendarEventId}": {
    "path": [
      "place-id",
      "checkInClaim-calendarEventId"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /places/{place-id}/microsoft.graph.workspace/checkIns/$count": {
    "path": [
      "place-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/$count": {
    "path": [],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.building": {
    "path": [],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.building/$count": {
    "path": [],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.desk": {
    "path": [],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.desk/$count": {
    "path": [],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.floor": {
    "path": [],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.floor/$count": {
    "path": [],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.room": {
    "path": [],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.room/$count": {
    "path": [],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.roomList": {
    "path": [],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.roomList/$count": {
    "path": [],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.section": {
    "path": [],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.section/$count": {
    "path": [],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.workspace": {
    "path": [],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /places/microsoft.graph.workspace/$count": {
    "path": [],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar": {
    "path": [
      "user-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendar": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendar/calendarPermissions": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendar/calendarPermissions": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendar/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendarPermission-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendar/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendarPermission-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendar/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendarPermission-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendar/calendarPermissions/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar/calendarView": {
    "path": [
      "user-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar/calendarView/microsoft.graph.delta()": {
    "path": [
      "user-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/{event-id}": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendar/events/{event-id}": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendar/events/{event-id}": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendar/events/{event-id}/attachments": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/attachments": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "event-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /users/{user-id}/calendar/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "event-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendar/events/{event-id}/attachments/$count": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/{event-id}/calendar": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/{event-id}/extensions": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/extensions": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "event-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendar/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendar/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendar/events/{event-id}/extensions/$count": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/{event-id}/instances": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/{event-id}/instances/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/microsoft.graph.accept": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/microsoft.graph.cancel": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/microsoft.graph.decline": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/microsoft.graph.dismissReminder": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/microsoft.graph.forward": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/microsoft.graph.snoozeReminder": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendar/events/{event-id}/microsoft.graph.tentativelyAccept": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar/events/microsoft.graph.delta()": {
    "path": [
      "user-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendar/microsoft.graph.allowedCalendarSharingRoles(User='{User}')": {
    "path": [
      "user-id",
      "User"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendar/microsoft.graph.getSchedule": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendar/microsoft.graph.permanentDelete": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}": {
    "path": [
      "user-id",
      "calendarGroup-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendarGroups/{calendarGroup-id}": {
    "path": [
      "user-id",
      "calendarGroup-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendarGroups/{calendarGroup-id}": {
    "path": [
      "user-id",
      "calendarGroup-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars": {
    "path": [
      "user-id",
      "calendarGroup-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars": {
    "path": [
      "user-id",
      "calendarGroup-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "calendarPermission-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "calendarPermission-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "calendarPermission-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/$count": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarView": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarView/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/attachments": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/attachments": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/attachments/$count": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/calendar": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/extensions": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/extensions": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/extensions/$count": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/instances/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.accept": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.cancel": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.decline": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.dismissReminder": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.forward": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.snoozeReminder": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.tentativelyAccept": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/$count": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/microsoft.graph.allowedCalendarSharingRoles(User='{User}')": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id",
      "User"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/microsoft.graph.getSchedule": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "calendarGroup-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/$count": {
    "path": [
      "user-id",
      "calendarGroup-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarGroups/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendars": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendars/{calendar-id}": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendars/{calendar-id}": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendars/{calendar-id}/calendarPermissions": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/calendarPermissions": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "calendarPermission-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "calendarPermission-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "calendarPermission-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendars/{calendar-id}/calendarPermissions/$count": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/calendarView": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/calendarView/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendars/{calendar-id}/events/{event-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendars/{calendar-id}/events/{event-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/attachments": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/attachments": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /users/{user-id}/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/attachments/$count": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/calendar": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/extensions": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/extensions": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/calendars/{calendar-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/calendars/{calendar-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/extensions/$count": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/instances": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/{event-id}/instances/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.accept": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.cancel": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.decline": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.dismissReminder": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.forward": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.snoozeReminder": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.tentativelyAccept": {
    "path": [
      "user-id",
      "calendar-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/$count": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/events/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendars/{calendar-id}/microsoft.graph.allowedCalendarSharingRoles(User='{User}')": {
    "path": [
      "user-id",
      "calendar-id",
      "User"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count"
    ],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/microsoft.graph.getSchedule": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/calendars/{calendar-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "calendar-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/calendars/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarView": {
    "path": [
      "user-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/calendarView/microsoft.graph.delta()": {
    "path": [
      "user-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/events": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/events": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/events/{event-id}": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/events/{event-id}": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/events/{event-id}": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/events/{event-id}/attachments": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/attachments": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "event-id",
      "attachment-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "DELETE /users/{user-id}/events/{event-id}/attachments/{attachment-id}": {
    "path": [
      "user-id",
      "event-id",
      "attachment-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/events/{event-id}/attachments/$count": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/attachments/microsoft.graph.createUploadSession": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/events/{event-id}/calendar": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/events/{event-id}/extensions": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/extensions": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "event-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/events/{event-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "event-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/events/{event-id}/extensions/$count": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/events/{event-id}/instances": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/events/{event-id}/instances/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/microsoft.graph.accept": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/microsoft.graph.cancel": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/microsoft.graph.decline": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/microsoft.graph.dismissReminder": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/microsoft.graph.forward": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/microsoft.graph.snoozeReminder": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "POST /users/{user-id}/events/{event-id}/microsoft.graph.tentativelyAccept": {
    "path": [
      "user-id",
      "event-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/events/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/events/microsoft.graph.delta()": {
    "path": [
      "user-id"
    ],
    "query": [
      "startDateTime",
      "endDateTime",
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contactFolders/{contactFolder-id}": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contactFolders/{contactFolder-id}": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/childFolders": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/extensions": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/extensions": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/extensions/$count": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/photo": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/photo": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1",
      "contact-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/$count": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contactFolder-id1"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/$count": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/childFolders/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/contacts": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/extensions": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/extensions": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/extensions/$count": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contactFolder-id",
      "contact-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts/$count": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/{contactFolder-id}/contacts/microsoft.graph.delta()": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contactFolders/{contactFolder-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "contactFolder-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/contactFolders/microsoft.graph.delta()": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "GET /users/{user-id}/contacts": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contacts": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contacts/{contact-id}": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contacts/{contact-id}/extensions": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$orderby",
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contacts/{contact-id}/extensions": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contact-id",
      "extension-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contact-id",
      "extension-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contacts/{contact-id}/extensions/{extension-id}": {
    "path": [
      "user-id",
      "contact-id",
      "extension-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contacts/{contact-id}/extensions/$count": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "POST /users/{user-id}/contacts/{contact-id}/microsoft.graph.permanentDelete": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contacts/{contact-id}/photo": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [
      "$select",
      "$expand"
    ],
    "headers": []
  },
  "PATCH /users/{user-id}/contacts/{contact-id}/photo": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user-id}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /users/{user-id}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user-id}/contacts/{contact-id}/photo/$value": {
    "path": [
      "user-id",
      "contact-id"
    ],
    "query": [],
    "headers": [
      "If-Match"
    ]
  },
  "GET /users/{user-id}/contacts/$count": {
    "path": [
      "user-id"
    ],
    "query": [
      "$search",
      "$filter"
    ],
    "headers": []
  },
  "GET /users/{user-id}/contacts/microsoft.graph.delta()": {
    "path": [
      "user-id"
    ],
    "query": [
      "$top",
      "$skip",
      "$search",
      "$filter",
      "$count",
      "$select",
      "$orderby",
      "$expand"
    ],
    "headers": []
  },
  "POST /users/{user-id}/microsoft.graph.sendMail": {
    "path": [
      "user-id"
    ],
    "query": [],
    "headers": []
  }
}

export class MicrosoftOutlookService {
  private baseUrl: string

  constructor(private creds: { accessToken: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('MICROSOFT_OUTLOOK_BASE_URL') as string
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
        default: throw new Error(`Microsoft Outlook API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
