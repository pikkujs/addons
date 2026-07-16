import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /posts": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "after",
      "modified_after",
      "author",
      "author_exclude",
      "before",
      "modified_before",
      "exclude",
      "include",
      "search_semantics",
      "offset",
      "order",
      "orderby",
      "search_columns",
      "slug",
      "status",
      "tax_relation",
      "categories",
      "categories_exclude",
      "tags",
      "tags_exclude",
      "sticky",
      "ignore_sticky",
      "format"
    ],
    "headers": []
  },
  "POST /posts": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /posts/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context",
      "excerpt_length",
      "password"
    ],
    "headers": []
  },
  "POST /posts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /posts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /posts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /posts/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /posts/{parent}/revisions": {
    "path": [
      "parent"
    ],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby"
    ],
    "headers": []
  },
  "GET /posts/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "DELETE /posts/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /posts/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [
      "parent",
      "context"
    ],
    "headers": []
  },
  "POST /posts/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /posts/{parent}/autosaves/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /pages": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "after",
      "modified_after",
      "author",
      "author_exclude",
      "before",
      "modified_before",
      "exclude",
      "include",
      "menu_order",
      "search_semantics",
      "offset",
      "order",
      "orderby",
      "parent",
      "parent_exclude",
      "search_columns",
      "slug",
      "status"
    ],
    "headers": []
  },
  "POST /pages": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /pages/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context",
      "excerpt_length",
      "password"
    ],
    "headers": []
  },
  "POST /pages/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /pages/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /pages/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /pages/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /pages/{parent}/revisions": {
    "path": [
      "parent"
    ],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby"
    ],
    "headers": []
  },
  "GET /pages/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "DELETE /pages/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /pages/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [
      "parent",
      "context"
    ],
    "headers": []
  },
  "POST /pages/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /pages/{parent}/autosaves/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /media": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "after",
      "modified_after",
      "author",
      "author_exclude",
      "before",
      "modified_before",
      "exclude",
      "include",
      "search_semantics",
      "offset",
      "order",
      "orderby",
      "parent",
      "parent_exclude",
      "search_columns",
      "slug",
      "status",
      "media_type",
      "mime_type"
    ],
    "headers": []
  },
  "POST /media": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /media/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /media/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /media/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /media/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /media/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "POST /media/{id}/post-process": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "POST /media/{id}/edit": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /menu-items": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "after",
      "modified_after",
      "before",
      "modified_before",
      "exclude",
      "include",
      "search_semantics",
      "offset",
      "order",
      "orderby",
      "search_columns",
      "slug",
      "status",
      "tax_relation",
      "menus",
      "menus_exclude",
      "menu_order"
    ],
    "headers": []
  },
  "POST /menu-items": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /menu-items/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /menu-items/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /menu-items/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /menu-items/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /menu-items/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /menu-items/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [
      "parent",
      "context"
    ],
    "headers": []
  },
  "POST /menu-items/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /menu-items/{parent}/autosaves/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /blocks": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "after",
      "modified_after",
      "before",
      "modified_before",
      "exclude",
      "include",
      "search_semantics",
      "offset",
      "order",
      "orderby",
      "search_columns",
      "slug",
      "status",
      "tax_relation",
      "wp_pattern_category",
      "wp_pattern_category_exclude"
    ],
    "headers": []
  },
  "POST /blocks": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /blocks/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context",
      "excerpt_length",
      "password"
    ],
    "headers": []
  },
  "POST /blocks/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /blocks/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /blocks/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /blocks/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /blocks/{parent}/revisions": {
    "path": [
      "parent"
    ],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby"
    ],
    "headers": []
  },
  "GET /blocks/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "DELETE /blocks/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /blocks/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [
      "parent",
      "context"
    ],
    "headers": []
  },
  "POST /blocks/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /blocks/{parent}/autosaves/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /templates/{parent}/revisions": {
    "path": [
      "parent"
    ],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby"
    ],
    "headers": []
  },
  "GET /templates/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "DELETE /templates/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /templates/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /templates/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /templates/{parent}/autosaves/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /templates": {
    "path": [],
    "query": [
      "context",
      "wp_id",
      "area",
      "post_type"
    ],
    "headers": []
  },
  "POST /templates": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /templates/lookup": {
    "path": [],
    "query": [
      "slug",
      "is_custom",
      "template_prefix"
    ],
    "headers": []
  },
  "GET /templates/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /templates/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /templates/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /templates/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /templates/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /template-parts/{parent}/revisions": {
    "path": [
      "parent"
    ],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby"
    ],
    "headers": []
  },
  "GET /template-parts/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "DELETE /template-parts/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /template-parts/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /template-parts/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /template-parts/{parent}/autosaves/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /template-parts": {
    "path": [],
    "query": [
      "context",
      "wp_id",
      "area",
      "post_type"
    ],
    "headers": []
  },
  "POST /template-parts": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /template-parts/lookup": {
    "path": [],
    "query": [
      "slug",
      "is_custom",
      "template_prefix"
    ],
    "headers": []
  },
  "GET /template-parts/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /template-parts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /template-parts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /template-parts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /template-parts/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /global-styles/{parent}/revisions": {
    "path": [
      "parent"
    ],
    "query": [
      "context",
      "page",
      "per_page",
      "offset"
    ],
    "headers": []
  },
  "GET /global-styles/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /global-styles/themes/{stylesheet}/variations": {
    "path": [
      "stylesheet"
    ],
    "query": [],
    "headers": []
  },
  "GET /global-styles/themes/{stylesheet}": {
    "path": [
      "stylesheet"
    ],
    "query": [],
    "headers": []
  },
  "GET /global-styles/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "POST /global-styles/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /global-styles/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /global-styles/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /navigation": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "after",
      "modified_after",
      "before",
      "modified_before",
      "exclude",
      "include",
      "search_semantics",
      "offset",
      "order",
      "orderby",
      "search_columns",
      "slug",
      "status"
    ],
    "headers": []
  },
  "POST /navigation": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /navigation/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context",
      "password"
    ],
    "headers": []
  },
  "POST /navigation/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /navigation/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /navigation/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /navigation/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /navigation/{parent}/revisions": {
    "path": [
      "parent"
    ],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby"
    ],
    "headers": []
  },
  "GET /navigation/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "DELETE /navigation/{parent}/revisions/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /navigation/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [
      "parent",
      "context"
    ],
    "headers": []
  },
  "POST /navigation/{id}/autosaves": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /navigation/{parent}/autosaves/{id}": {
    "path": [
      "parent",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /font-families": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "exclude",
      "include",
      "search_semantics",
      "offset",
      "order",
      "orderby",
      "slug"
    ],
    "headers": []
  },
  "POST /font-families": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /font-families/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /font-families/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /font-families/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /font-families/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /font-families/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /font-families/{font_family_id}/font-faces": {
    "path": [
      "font_family_id"
    ],
    "query": [
      "context",
      "page",
      "per_page",
      "exclude",
      "include",
      "search_semantics",
      "offset",
      "order",
      "orderby"
    ],
    "headers": []
  },
  "POST /font-families/{font_family_id}/font-faces": {
    "path": [
      "font_family_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /font-families/{font_family_id}/font-faces/{id}": {
    "path": [
      "font_family_id",
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "DELETE /font-families/{font_family_id}/font-faces/{id}": {
    "path": [
      "font_family_id",
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /types": {
    "path": [],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /types/{type}": {
    "path": [
      "type"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /statuses": {
    "path": [],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /statuses/{status}": {
    "path": [
      "status"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /taxonomies": {
    "path": [],
    "query": [
      "context",
      "type"
    ],
    "headers": []
  },
  "GET /taxonomies/{taxonomy}": {
    "path": [
      "taxonomy"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /categories": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "order",
      "orderby",
      "hide_empty",
      "parent",
      "post",
      "slug"
    ],
    "headers": []
  },
  "POST /categories": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /categories/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /categories/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /categories/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /categories/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /categories/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /tags": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby",
      "hide_empty",
      "post",
      "slug"
    ],
    "headers": []
  },
  "POST /tags": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /tags/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /tags/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /tags/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /tags/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /tags/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /menus": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby",
      "hide_empty",
      "post",
      "slug"
    ],
    "headers": []
  },
  "POST /menus": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /menus/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /menus/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /menus/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /menus/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /menus/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /wp_pattern_category": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby",
      "hide_empty",
      "post",
      "slug"
    ],
    "headers": []
  },
  "POST /wp_pattern_category": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /wp_pattern_category/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /wp_pattern_category/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /wp_pattern_category/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /wp_pattern_category/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /wp_pattern_category/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /users": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby",
      "slug",
      "roles",
      "capabilities",
      "who",
      "has_published_posts",
      "search_columns"
    ],
    "headers": []
  },
  "POST /users": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /users/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /users/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /users/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /users/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force",
      "reassign"
    ],
    "headers": []
  },
  "GET /users/me": {
    "path": [],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /users/me": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /users/me": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PATCH /users/me": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /users/me": {
    "path": [],
    "query": [
      "force",
      "reassign"
    ],
    "headers": []
  },
  "GET /users/{user_id}/application-passwords": {
    "path": [
      "user_id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /users/{user_id}/application-passwords": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user_id}/application-passwords": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{user_id}/application-passwords/introspect": {
    "path": [
      "user_id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /users/{user_id}/application-passwords/{uuid}": {
    "path": [
      "user_id",
      "uuid"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /users/{user_id}/application-passwords/{uuid}": {
    "path": [
      "user_id",
      "uuid"
    ],
    "query": [],
    "headers": []
  },
  "PUT /users/{user_id}/application-passwords/{uuid}": {
    "path": [
      "user_id",
      "uuid"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /users/{user_id}/application-passwords/{uuid}": {
    "path": [
      "user_id",
      "uuid"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{user_id}/application-passwords/{uuid}": {
    "path": [
      "user_id",
      "uuid"
    ],
    "query": [],
    "headers": []
  },
  "GET /comments": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "after",
      "author",
      "author_exclude",
      "author_email",
      "before",
      "exclude",
      "include",
      "offset",
      "order",
      "orderby",
      "parent",
      "parent_exclude",
      "post",
      "status",
      "type",
      "password"
    ],
    "headers": []
  },
  "POST /comments": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /comments/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context",
      "password"
    ],
    "headers": []
  },
  "POST /comments/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /comments/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /comments/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /comments/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force",
      "password"
    ],
    "headers": []
  },
  "GET /search": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "type",
      "subtype",
      "exclude",
      "include"
    ],
    "headers": []
  },
  "GET /block-renderer/{name}": {
    "path": [
      "name"
    ],
    "query": [
      "context",
      "attributes",
      "post_id"
    ],
    "headers": []
  },
  "POST /block-renderer/{name}": {
    "path": [
      "name"
    ],
    "query": [],
    "headers": []
  },
  "GET /block-types": {
    "path": [],
    "query": [
      "context",
      "namespace"
    ],
    "headers": []
  },
  "GET /block-types/{namespace}": {
    "path": [
      "namespace"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /block-types/{namespace}/{name}": {
    "path": [
      "name",
      "namespace"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PATCH /settings": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /themes": {
    "path": [],
    "query": [
      "status"
    ],
    "headers": []
  },
  "GET /themes/{stylesheet}": {
    "path": [
      "stylesheet"
    ],
    "query": [],
    "headers": []
  },
  "GET /plugins": {
    "path": [],
    "query": [
      "context",
      "search",
      "status"
    ],
    "headers": []
  },
  "POST /plugins": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /plugins/{plugin}": {
    "path": [
      "plugin"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /plugins/{plugin}": {
    "path": [
      "plugin"
    ],
    "query": [],
    "headers": []
  },
  "PUT /plugins/{plugin}": {
    "path": [
      "plugin"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /plugins/{plugin}": {
    "path": [
      "plugin"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /plugins/{plugin}": {
    "path": [
      "plugin"
    ],
    "query": [],
    "headers": []
  },
  "GET /sidebars": {
    "path": [],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /sidebars/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /sidebars/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /sidebars/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sidebars/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /widget-types": {
    "path": [],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /widget-types/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /widget-types/{id}/encode": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "POST /widget-types/{id}/render": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /widgets": {
    "path": [],
    "query": [
      "context",
      "sidebar"
    ],
    "headers": []
  },
  "POST /widgets": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /widgets/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "POST /widgets/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /widgets/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /widgets/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /widgets/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "GET /block-directory/search": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "term"
    ],
    "headers": []
  },
  "GET /pattern-directory/patterns": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page",
      "search",
      "category",
      "keyword",
      "slug",
      "offset",
      "order",
      "orderby"
    ],
    "headers": []
  },
  "GET /block-patterns/patterns": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /block-patterns/categories": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /menu-locations": {
    "path": [],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /menu-locations/{location}": {
    "path": [
      "location"
    ],
    "query": [
      "context"
    ],
    "headers": []
  },
  "GET /font-collections": {
    "path": [],
    "query": [
      "context",
      "page",
      "per_page"
    ],
    "headers": []
  },
  "GET /font-collections/{slug}": {
    "path": [
      "slug"
    ],
    "query": [
      "context"
    ],
    "headers": []
  }
}

export class WordpressService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('WORDPRESS_BASE_URL') as string
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
        default: throw new Error(`WordPress API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
