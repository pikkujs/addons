import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const SPOTIFY_OAUTH2_CONFIG = {
  tokenSecretId: 'SPOTIFY_TOKENS',
  authorizationUrl: "https://accounts.spotify.com/authorize",
  tokenUrl: "https://accounts.spotify.com/api/token",
  scopes: ["app-remote-control","playlist-modify-private","playlist-modify-public","playlist-read-collaborative","playlist-read-private","streaming","ugc-image-upload","user-follow-modify","user-follow-read","user-library-modify","user-library-read","user-modify-playback-state","user-read-currently-playing","user-read-email","user-read-playback-position","user-read-playback-state","user-read-private","user-read-recently-played","user-top-read"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /albums": {
    "path": [],
    "query": [
      "ids",
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /albums/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /albums/{id}/tracks": {
    "path": [
      "id"
    ],
    "query": [
      "market",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /artists": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /artists/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /artists/{id}/albums": {
    "path": [
      "id"
    ],
    "query": [
      "include_groups",
      "market",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /artists/{id}/related-artists": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /artists/{id}/top-tracks": {
    "path": [
      "id"
    ],
    "query": [
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /audio-analysis/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /audio-features": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /audio-features/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /audiobooks": {
    "path": [],
    "query": [
      "ids",
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /audiobooks/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /audiobooks/{id}/chapters": {
    "path": [
      "id"
    ],
    "query": [
      "market",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /browse/categories": {
    "path": [],
    "query": [
      "country",
      "locale",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /browse/categories/{category_id}": {
    "path": [
      "category_id"
    ],
    "query": [
      "country",
      "locale"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /browse/categories/{category_id}/playlists": {
    "path": [
      "category_id"
    ],
    "query": [
      "country",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /browse/featured-playlists": {
    "path": [],
    "query": [
      "country",
      "locale",
      "timestamp",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /browse/new-releases": {
    "path": [],
    "query": [
      "country",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /chapters": {
    "path": [],
    "query": [
      "ids",
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /chapters/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /episodes": {
    "path": [],
    "query": [
      "ids",
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /episodes/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /markets": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/albums": {
    "path": [],
    "query": [
      "limit",
      "offset",
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/albums": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "DELETE /me/albums": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/albums/contains": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/audiobooks": {
    "path": [],
    "query": [
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/audiobooks": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "DELETE /me/audiobooks": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/audiobooks/contains": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/episodes": {
    "path": [],
    "query": [
      "market",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/episodes": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "DELETE /me/episodes": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/episodes/contains": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/following": {
    "path": [],
    "query": [
      "type",
      "after",
      "limit"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/following": {
    "path": [],
    "query": [
      "type",
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "DELETE /me/following": {
    "path": [],
    "query": [
      "type",
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/following/contains": {
    "path": [],
    "query": [
      "type",
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/player": {
    "path": [],
    "query": [
      "market",
      "additional_types"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/player": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/player/currently-playing": {
    "path": [],
    "query": [
      "market",
      "additional_types"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/player/devices": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "POST /me/player/next": {
    "path": [],
    "query": [
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/player/pause": {
    "path": [],
    "query": [
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/player/play": {
    "path": [],
    "query": [
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "POST /me/player/previous": {
    "path": [],
    "query": [
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/player/queue": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "POST /me/player/queue": {
    "path": [],
    "query": [
      "uri",
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/player/recently-played": {
    "path": [],
    "query": [
      "limit",
      "after",
      "before"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/player/repeat": {
    "path": [],
    "query": [
      "state",
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/player/seek": {
    "path": [],
    "query": [
      "position_ms",
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/player/shuffle": {
    "path": [],
    "query": [
      "state",
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/player/volume": {
    "path": [],
    "query": [
      "volume_percent",
      "device_id"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/playlists": {
    "path": [],
    "query": [
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/shows": {
    "path": [],
    "query": [
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/shows": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "DELETE /me/shows": {
    "path": [],
    "query": [
      "ids",
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/shows/contains": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/top/artists": {
    "path": [],
    "query": [
      "time_range",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/top/tracks": {
    "path": [],
    "query": [
      "time_range",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/tracks": {
    "path": [],
    "query": [
      "market",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /me/tracks": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "DELETE /me/tracks": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /me/tracks/contains": {
    "path": [],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /playlists/{playlist_id}": {
    "path": [
      "playlist_id"
    ],
    "query": [
      "market",
      "fields",
      "additional_types"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /playlists/{playlist_id}": {
    "path": [
      "playlist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /playlists/{playlist_id}/followers": {
    "path": [
      "playlist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "DELETE /playlists/{playlist_id}/followers": {
    "path": [
      "playlist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /playlists/{playlist_id}/followers/contains": {
    "path": [
      "playlist_id"
    ],
    "query": [
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /playlists/{playlist_id}/images": {
    "path": [
      "playlist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /playlists/{playlist_id}/images": {
    "path": [
      "playlist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /playlists/{playlist_id}/tracks": {
    "path": [
      "playlist_id"
    ],
    "query": [
      "market",
      "fields",
      "limit",
      "offset",
      "additional_types"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "POST /playlists/{playlist_id}/tracks": {
    "path": [
      "playlist_id"
    ],
    "query": [
      "position",
      "uris"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "PUT /playlists/{playlist_id}/tracks": {
    "path": [
      "playlist_id"
    ],
    "query": [
      "uris"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "DELETE /playlists/{playlist_id}/tracks": {
    "path": [
      "playlist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /recommendations": {
    "path": [],
    "query": [
      "limit",
      "market",
      "seed_artists",
      "seed_genres",
      "seed_tracks",
      "min_acousticness",
      "max_acousticness",
      "target_acousticness",
      "min_danceability",
      "max_danceability",
      "target_danceability",
      "min_duration_ms",
      "max_duration_ms",
      "target_duration_ms",
      "min_energy",
      "max_energy",
      "target_energy",
      "min_instrumentalness",
      "max_instrumentalness",
      "target_instrumentalness",
      "min_key",
      "max_key",
      "target_key",
      "min_liveness",
      "max_liveness",
      "target_liveness",
      "min_loudness",
      "max_loudness",
      "target_loudness",
      "min_mode",
      "max_mode",
      "target_mode",
      "min_popularity",
      "max_popularity",
      "target_popularity",
      "min_speechiness",
      "max_speechiness",
      "target_speechiness",
      "min_tempo",
      "max_tempo",
      "target_tempo",
      "min_time_signature",
      "max_time_signature",
      "target_time_signature",
      "min_valence",
      "max_valence",
      "target_valence"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /recommendations/available-genre-seeds": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /search": {
    "path": [],
    "query": [
      "q",
      "type",
      "market",
      "limit",
      "offset",
      "include_external"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /shows": {
    "path": [],
    "query": [
      "market",
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /shows/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /shows/{id}/episodes": {
    "path": [
      "id"
    ],
    "query": [
      "market",
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /tracks": {
    "path": [],
    "query": [
      "market",
      "ids"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /tracks/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "market"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /users/{user_id}": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "GET /users/{user_id}/playlists": {
    "path": [
      "user_id"
    ],
    "query": [
      "limit",
      "offset"
    ],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  },
  "POST /users/{user_id}/playlists": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n",
      "403": "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
      "429": "The app has exceeded its rate limits.\n"
    }
  }
}

export class SpotifyService {
  private baseUrl: string
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService, variables: TypedVariablesService) {
    this.baseUrl = variables.get('SPOTIFY_BASE_URL') as string
    this.oauth = new OAuth2Client(
      SPOTIFY_OAUTH2_CONFIG,
      'SPOTIFY_APP_CREDENTIALS',
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
        default: throw new Error(`Spotify API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
