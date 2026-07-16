import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /rest/api/3/announcementBanner": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/announcementBanner": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if an invalid parameter is passed.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/app/field/value": {
    "path": [],
    "query": [
      "generateChangelog"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the request is not authenticated as the app that provided all the fields.",
      "404": "Returned if any field is not found."
    }
  },
  "GET /rest/api/3/app/field/{fieldIdOrKey}/context/configuration": {
    "path": [
      "fieldIdOrKey"
    ],
    "query": [
      "id",
      "fieldContextId",
      "issueId",
      "projectKeyOrId",
      "issueTypeId",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user is not a Jira admin or the request is not authenticated as from the app that provided the field.",
      "404": "Returned if the custom field is not found."
    }
  },
  "PUT /rest/api/3/app/field/{fieldIdOrKey}/context/configuration": {
    "path": [
      "fieldIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user is not a Jira admin or the request is not authenticated as from the app that provided the field.",
      "404": "Returned if the custom field is not found."
    }
  },
  "PUT /rest/api/3/app/field/{fieldIdOrKey}/value": {
    "path": [
      "fieldIdOrKey"
    ],
    "query": [
      "generateChangelog"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the request is not authenticated as the app that provided the field.",
      "404": "Returned if the field is not found."
    }
  },
  "GET /rest/api/3/application-properties": {
    "path": [],
    "query": [
      "key",
      "permissionLevel",
      "keyFilter"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the application property is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/application-properties/advanced-settings": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user is not an administrator."
    }
  },
  "PUT /rest/api/3/application-properties/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the data type of the `value` does not match the application property's data type. For example, a string is provided instead of an integer.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to edit the property.",
      "404": "Returned if the property is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/applicationrole": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user is not an administrator."
    }
  },
  "GET /rest/api/3/applicationrole/{key}": {
    "path": [
      "key"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user is not an administrator.",
      "404": "Returned if the role is not found."
    }
  },
  "GET /rest/api/3/attachment/content/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "redirect"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the range supplied in the `Range` header is malformed.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "The user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the attachment is not found.\n *  attachments are disabled in the Jira settings.",
      "416": "Returned if the server is unable to satisfy the range of bytes provided."
    }
  },
  "GET /rest/api/3/attachment/meta": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/attachment/thumbnail/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "redirect",
      "fallbackToDefault",
      "width",
      "height"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "The user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the attachment is not found.\n *  attachments are disabled in the Jira settings.\n *  `fallbackToDefault` is `false` and the request thumbnail cannot be downloaded."
    }
  },
  "GET /rest/api/3/attachment/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the attachment is not found.\n *  attachments are disabled in the Jira settings."
    }
  },
  "DELETE /rest/api/3/attachment/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the attachment is not found.\n *  attachments are disabled in the Jira settings."
    }
  },
  "GET /rest/api/3/attachment/{id}/expand/human": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "The user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the attachment is not found.\n *  attachments are disabled in the Jira settings.",
      "409": "Returned if the attachment is an archive, but not a supported archive format."
    }
  },
  "GET /rest/api/3/attachment/{id}/expand/raw": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "The user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the attachment is not found.\n *  attachments are disabled in the Jira settings.",
      "409": "Returned if the attachment is an archive, but not a supported archive format."
    }
  },
  "GET /rest/api/3/auditing/record": {
    "path": [],
    "query": [
      "offset",
      "limit",
      "filter",
      "from",
      "to"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if:\n\n *  the user does not have the required permissions.\n *  all Jira products are on free plans. Audit logs are available when at least one Jira product is on a paid plan."
    }
  },
  "GET /rest/api/3/avatar/{type}/system": {
    "path": [
      "type"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "500": "Returned if an error occurs while retrieving the list of avatars."
    }
  },
  "POST /rest/api/3/comment/list": {
    "path": [],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request contains more than 1000 IDs or is empty."
    }
  },
  "GET /rest/api/3/comment/{commentId}/properties": {
    "path": [
      "commentId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the comment ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the comment is not found."
    }
  },
  "GET /rest/api/3/comment/{commentId}/properties/{propertyKey}": {
    "path": [
      "commentId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the comment or the property is not found."
    }
  },
  "PUT /rest/api/3/comment/{commentId}/properties/{propertyKey}": {
    "path": [
      "commentId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the comment is not found."
    }
  },
  "DELETE /rest/api/3/comment/{commentId}/properties/{propertyKey}": {
    "path": [
      "commentId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the comment or the property is not found or the user has the necessary project permissions but isn't a member of the role or group visibility of the comment is restricted to."
    }
  },
  "POST /rest/api/3/component": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the user is not found.\n *  `name` is not provided.\n *  `name` is over 255 characters in length.\n *  `projectId` is not provided.\n *  `assigneeType` is an invalid value.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to manage the project containing the component or does not have permission to administer Jira.",
      "404": "Returned if the project is not found or the user does not have permission to browse the project containing the component."
    }
  },
  "GET /rest/api/3/component/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the component is not found or the user does not have permission to browse the project containing the component."
    }
  },
  "PUT /rest/api/3/component/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the user is not found.\n *  `assigneeType` is an invalid value.\n *  `name` is over 255 characters in length.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to manage the project containing the component or does not have permission to administer Jira.",
      "404": "Returned if the component is not found or the user does not have permission to browse the project containing the component."
    }
  },
  "DELETE /rest/api/3/component/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "moveIssuesTo"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to manage the project containing the component or does not have permission to administer Jira.",
      "404": "Returned if:\n\n *  the component is not found.\n *  the replacement component is not found.\n *  the user does not have permission to browse the project containing the component."
    }
  },
  "GET /rest/api/3/component/{id}/relatedIssueCounts": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the component is not found."
    }
  },
  "GET /rest/api/3/configuration": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/configuration/timetracking": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/configuration/timetracking": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the time tracking provider is not found.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/configuration/timetracking/list": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/configuration/timetracking/options": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/configuration/timetracking/options": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request object is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/customFieldOption/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the custom field option is not found.\n *  the user does not have permission to view the custom field."
    }
  },
  "GET /rest/api/3/dashboard": {
    "path": [],
    "query": [
      "filter",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/dashboard": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/dashboard/gadgets": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "400 response",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/dashboard/search": {
    "path": [],
    "query": [
      "dashboardName",
      "accountId",
      "owner",
      "groupname",
      "groupId",
      "projectId",
      "orderBy",
      "startAt",
      "maxResults",
      "status",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `orderBy` is invalid.\n *  `expand` includes an invalid value.\n *  `accountId` and `owner` are provided.\n *  `groupname` and `groupId` are provided.",
      "401": "401 response"
    }
  },
  "GET /rest/api/3/dashboard/{dashboardId}/gadget": {
    "path": [
      "dashboardId"
    ],
    "query": [
      "moduleKey",
      "uri",
      "gadgetId"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if the dashboard is not found."
    }
  },
  "POST /rest/api/3/dashboard/{dashboardId}/gadget": {
    "path": [
      "dashboardId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the dashboard is not found."
    }
  },
  "PUT /rest/api/3/dashboard/{dashboardId}/gadget/{gadgetId}": {
    "path": [
      "dashboardId",
      "gadgetId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if the gadget or the dashboard is not found."
    }
  },
  "DELETE /rest/api/3/dashboard/{dashboardId}/gadget/{gadgetId}": {
    "path": [
      "dashboardId",
      "gadgetId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the gadget or the dashboard is not found."
    }
  },
  "GET /rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties": {
    "path": [
      "dashboardId",
      "itemId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the dashboard or dashboard item is not found, or the dashboard is not owned by or shared with the user."
    }
  },
  "GET /rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}": {
    "path": [
      "dashboardId",
      "itemId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the dashboard, the dashboard item, or dashboard item property is not found, or the dashboard is not owned by or shared with the user."
    }
  },
  "PUT /rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}": {
    "path": [
      "dashboardId",
      "itemId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  Request is invalid\n *  Or if all of these conditions are met in the request:\n    \n     *  The dashboard item has a spec URI and no complete module key\n     *  The value of propertyKey is equal to \"config\"\n     *  The request body contains a JSON object whose keys and values are not strings.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user is not the owner of the dashboard.",
      "404": "Returned if the dashboard item is not found or the dashboard is not shared with the user."
    }
  },
  "DELETE /rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}": {
    "path": [
      "dashboardId",
      "itemId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the dashboard or dashboard item ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user is not the owner of the dashboard.",
      "404": "Returned if the dashboard item is not found or the dashboard is not shared with the user."
    }
  },
  "GET /rest/api/3/dashboard/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "400 response",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the dashboard is not found or the dashboard is not owned by or shared with the user."
    }
  },
  "PUT /rest/api/3/dashboard/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the dashboard is not found or the dashboard is not owned by the user."
    }
  },
  "DELETE /rest/api/3/dashboard/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "400 response",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/dashboard/{id}/copy": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the dashboard is not found or the dashboard is not owned by or shared with the user."
    }
  },
  "GET /rest/api/3/events": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to complete this request."
    }
  },
  "POST /rest/api/3/expression/analyse": {
    "path": [],
    "query": [
      "check"
    ],
    "headers": [],
    "errors": {
      "400": "400 response",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "404 response"
    }
  },
  "POST /rest/api/3/expression/eval": {
    "path": [],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the request is invalid, that is:\n    \n     *  invalid data is provided, such as a request including issue ID and key.\n     *  the expression is invalid and can not be parsed.\n *  evaluation fails at runtime. This may happen for various reasons. For example, accessing a property on a null object (such as the expression `issue.id` where `issue` is `null`). In this case an error message is provided.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if any object provided in the request context is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/field": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/field": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the user does not have permission to create custom fields.\n *  any of the request object properties have invalid or missing values."
    }
  },
  "GET /rest/api/3/field/search": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "type",
      "id",
      "query",
      "orderBy",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/field/search/trashed": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "query",
      "expand",
      "orderBy"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/field/{fieldId}": {
    "path": [
      "fieldId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field is not found."
    }
  },
  "GET /rest/api/3/field/{fieldId}/context": {
    "path": [
      "fieldId"
    ],
    "query": [
      "isAnyIssueType",
      "isGlobalContext",
      "contextId",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field was not found."
    }
  },
  "POST /rest/api/3/field/{fieldId}/context": {
    "path": [
      "fieldId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the field, project, or issue type is not found.",
      "409": "Returned if the issue type is a sub-task, but sub-tasks are disabled in Jira settings."
    }
  },
  "GET /rest/api/3/field/{fieldId}/context/defaultValue": {
    "path": [
      "fieldId"
    ],
    "query": [
      "contextId",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field is not found."
    }
  },
  "PUT /rest/api/3/field/{fieldId}/context/defaultValue": {
    "path": [
      "fieldId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field, a context, an option, or a cascading option is not found."
    }
  },
  "GET /rest/api/3/field/{fieldId}/context/issuetypemapping": {
    "path": [
      "fieldId"
    ],
    "query": [
      "contextId",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "POST /rest/api/3/field/{fieldId}/context/mapping": {
    "path": [
      "fieldId"
    ],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field, project, or issue type is not found."
    }
  },
  "GET /rest/api/3/field/{fieldId}/context/projectmapping": {
    "path": [
      "fieldId"
    ],
    "query": [
      "contextId",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field is not found."
    }
  },
  "PUT /rest/api/3/field/{fieldId}/context/{contextId}": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field or the context is not found."
    }
  },
  "DELETE /rest/api/3/field/{fieldId}/context/{contextId}": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field or the context is not found."
    }
  },
  "PUT /rest/api/3/field/{fieldId}/context/{contextId}/issuetype": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field, context, or one or more issue types are not found.",
      "409": "Returned if the issue type is a sub-task, but sub-tasks are disabled in Jira settings."
    }
  },
  "POST /rest/api/3/field/{fieldId}/context/{contextId}/issuetype/remove": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field, context, or one or more issue types are not found."
    }
  },
  "GET /rest/api/3/field/{fieldId}/context/{contextId}/option": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [
      "optionId",
      "onlyOptions",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the custom field is not found or the context doesn't match the custom field."
    }
  },
  "POST /rest/api/3/field/{fieldId}/context/{contextId}/option": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the custom field is not found or the context doesn't match the custom field."
    }
  },
  "PUT /rest/api/3/field/{fieldId}/context/{contextId}/option": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field, context, or one or more options is not found."
    }
  },
  "PUT /rest/api/3/field/{fieldId}/context/{contextId}/option/move": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field, the context, or one or more of the options is not found.."
    }
  },
  "DELETE /rest/api/3/field/{fieldId}/context/{contextId}/option/{optionId}": {
    "path": [
      "fieldId",
      "contextId",
      "optionId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field, the context, or the option is not found."
    }
  },
  "PUT /rest/api/3/field/{fieldId}/context/{contextId}/project": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field, context, or project is not found."
    }
  },
  "POST /rest/api/3/field/{fieldId}/context/{contextId}/project/remove": {
    "path": [
      "fieldId",
      "contextId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the custom field, context, or one or more projects are not found."
    }
  },
  "GET /rest/api/3/field/{fieldId}/screens": {
    "path": [
      "fieldId"
    ],
    "query": [
      "startAt",
      "maxResults",
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/field/{fieldKey}/option": {
    "path": [
      "fieldKey"
    ],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the field is not found or does not support options.",
      "403": "Returned if the request is not authenticated as a Jira administrator or the app that provided the field."
    }
  },
  "POST /rest/api/3/field/{fieldKey}/option": {
    "path": [
      "fieldKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the option is invalid.",
      "403": "Returned if the request is not authenticated as a Jira administrator or the app that provided the field.",
      "404": "Returned if the field is not found or does not support options."
    }
  },
  "GET /rest/api/3/field/{fieldKey}/option/suggestions/edit": {
    "path": [
      "fieldKey"
    ],
    "query": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the field is not found or does not support options."
    }
  },
  "GET /rest/api/3/field/{fieldKey}/option/suggestions/search": {
    "path": [
      "fieldKey"
    ],
    "query": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the field is not found or does not support options."
    }
  },
  "GET /rest/api/3/field/{fieldKey}/option/{optionId}": {
    "path": [
      "fieldKey",
      "optionId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the field is not found or does not support options.",
      "403": "Returned if the request is not authenticated as a Jira administrator or the app that provided the field.",
      "404": "Returned if the option is not found."
    }
  },
  "PUT /rest/api/3/field/{fieldKey}/option/{optionId}": {
    "path": [
      "fieldKey",
      "optionId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the option is invalid, or the *ID* in the request object does not match the *optionId* parameter.",
      "403": "Returned if the request is not authenticated as a Jira administrator or the app that provided the field.",
      "404": "Returned if field is not found."
    }
  },
  "DELETE /rest/api/3/field/{fieldKey}/option/{optionId}": {
    "path": [
      "fieldKey",
      "optionId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Returned if the request is not authenticated as a Jira administrator or the app that provided the field.",
      "404": "Returned if the field or option is not found.",
      "409": "Returned if the option is selected for the field in any issue."
    }
  },
  "DELETE /rest/api/3/field/{fieldKey}/option/{optionId}/issue": {
    "path": [
      "fieldKey",
      "optionId"
    ],
    "query": [
      "replaceWith",
      "jql",
      "overrideScreenSecurity",
      "overrideEditableFlag"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field is not found or does not support options, or the options to be replaced are not found."
    }
  },
  "DELETE /rest/api/3/field/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if any of these are true:\n\n *  The custom field is locked.\n *  The custom field is used in a issue security scheme or a permission scheme.\n *  The custom field ID format is incorrect.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the custom field is not found.",
      "409": "Returned if a task to delete the custom field is running."
    }
  },
  "POST /rest/api/3/field/{id}/restore": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the custom field is not found."
    }
  },
  "POST /rest/api/3/field/{id}/trash": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the custom field is not found."
    }
  },
  "GET /rest/api/3/fieldconfiguration": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "isDefault",
      "query"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/fieldconfiguration": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/fieldconfiguration/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field configuration is not found."
    }
  },
  "DELETE /rest/api/3/fieldconfiguration/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field configuration is not found."
    }
  },
  "GET /rest/api/3/fieldconfiguration/{id}/fields": {
    "path": [
      "id"
    ],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field configuration is not found."
    }
  },
  "PUT /rest/api/3/fieldconfiguration/{id}/fields": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field configuration is not found."
    }
  },
  "GET /rest/api/3/fieldconfigurationscheme": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permissions."
    }
  },
  "POST /rest/api/3/fieldconfigurationscheme": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permissions."
    }
  },
  "GET /rest/api/3/fieldconfigurationscheme/mapping": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "fieldConfigurationSchemeId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if no field configuration schemes are found."
    }
  },
  "GET /rest/api/3/fieldconfigurationscheme/project": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/fieldconfigurationscheme/project": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the project is not a classic project.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permissions.",
      "404": "Returned if the project is missing."
    }
  },
  "PUT /rest/api/3/fieldconfigurationscheme/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permissions.",
      "404": "Returned if the field configuration scheme is not found."
    }
  },
  "DELETE /rest/api/3/fieldconfigurationscheme/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field configuration scheme is not found."
    }
  },
  "PUT /rest/api/3/fieldconfigurationscheme/{id}/mapping": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field configuration scheme, the field configuration, or the issue type is not found."
    }
  },
  "POST /rest/api/3/fieldconfigurationscheme/{id}/mapping/delete": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field configuration scheme or the issue types are not found."
    }
  },
  "POST /rest/api/3/filter": {
    "path": [],
    "query": [
      "expand",
      "overrideSharePermissions"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request object is invalid. For example, the `name` is not unique or the project ID is not specified for a project role share permission.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/filter/defaultShareScope": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "PUT /rest/api/3/filter/defaultShareScope": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if an invalid scope is set.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/filter/favourite": {
    "path": [],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/filter/my": {
    "path": [],
    "query": [
      "expand",
      "includeFavourites"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/filter/search": {
    "path": [],
    "query": [
      "filterName",
      "accountId",
      "owner",
      "groupname",
      "groupId",
      "projectId",
      "id",
      "orderBy",
      "startAt",
      "maxResults",
      "expand",
      "overrideSharePermissions"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `owner` and `accountId` are provided.\n *  `expand` includes an invalid value.\n *  `orderBy` is invalid.\n *  `id` identifies more than 200 filter IDs.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/filter/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "expand",
      "overrideSharePermissions"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the filter is not found or the user does not have permission to view it.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "PUT /rest/api/3/filter/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "expand",
      "overrideSharePermissions"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request object is invalid. For example, the `name` is not unique or the project ID is not specified for a project role share permission.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "DELETE /rest/api/3/filter/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the filter is not found.",
      "401": "Returned if the user does not have permission to delete the filter."
    }
  },
  "GET /rest/api/3/filter/{id}/columns": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the user does not have permission to view the filter.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if a column configuration is not set for the filter."
    }
  },
  "PUT /rest/api/3/filter/{id}/columns": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  a non-navigable field is set as a column.\n *  the user does not have permission to view the filter.",
      "403": "Returned if the requesting user is not an owner of the filter."
    }
  },
  "DELETE /rest/api/3/filter/{id}/columns": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the filter is not found.\n *  the user does not have permission to view the filter.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "PUT /rest/api/3/filter/{id}/favourite": {
    "path": [
      "id"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the filter is not found.\n *  the user does not have permission to favorite the filter."
    }
  },
  "DELETE /rest/api/3/filter/{id}/favourite": {
    "path": [
      "id"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the filter is not found.\n *  the user does not have permission to view the filter."
    }
  },
  "PUT /rest/api/3/filter/{id}/owner": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned when:\n\n *  The new owner of the filter owns a filter with the same name.\n *  An attempt is made to change owner of the default filter.",
      "403": "Returned if the requesting user is not an owner of the filter or does not have *Administer Jira* global permission.",
      "404": "Returned if the filter or the new owner of the filter is not found."
    }
  },
  "GET /rest/api/3/filter/{id}/permission": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the filter is not found.\n *  the user does not have permission to view the filter."
    }
  },
  "POST /rest/api/3/filter/{id}/permission": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the request object is invalid. For example, it contains an invalid type, the ID does not match the type, or the project or group is not found.\n *  the user does not own the filter.\n *  the user does not have the required permissions.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the filter is not found.\n *  the user does not have permission to view the filter."
    }
  },
  "GET /rest/api/3/filter/{id}/permission/{permissionId}": {
    "path": [
      "id",
      "permissionId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the filter is not found.\n *  the permission is not found.\n *  the user does not have permission to view the filter."
    }
  },
  "DELETE /rest/api/3/filter/{id}/permission/{permissionId}": {
    "path": [
      "id",
      "permissionId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the filter is not found.\n *  the user does not own the filter."
    }
  },
  "POST /rest/api/3/group": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if group name is not specified or the group name is in use.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "DELETE /rest/api/3/group": {
    "path": [],
    "query": [
      "groupname",
      "groupId",
      "swapGroup",
      "swapGroupId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the group name is not specified.",
      "401": "Returned if the authentication credentials are incorrect or missing from the request.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the group is not found."
    }
  },
  "GET /rest/api/3/group/bulk": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "groupId",
      "groupName",
      "accessType",
      "applicationKey"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "500": "Returned if the group with the given access level can't be retrieved."
    }
  },
  "GET /rest/api/3/group/member": {
    "path": [],
    "query": [
      "groupname",
      "groupId",
      "includeInactiveUsers",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the group name is not specified.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the calling user does not have the Administer Jira global permission.",
      "404": "Returned if the group is not found."
    }
  },
  "POST /rest/api/3/group/user": {
    "path": [],
    "query": [
      "groupname",
      "groupId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `groupname` is not provided.\n *  `accountId` is missing.",
      "401": "Returned if the authentication credentials are incorrect or missing from the request.",
      "403": "Returned if the calling user does not have the necessary permission.",
      "404": "Returned if the group or user are not found."
    }
  },
  "DELETE /rest/api/3/group/user": {
    "path": [],
    "query": [
      "groupname",
      "groupId",
      "username",
      "accountId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `groupName` is missing.\n *  `accountId` is missing.",
      "401": "Returned if the authentication credentials are incorrect or missing from the request.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the group or user are not found."
    }
  },
  "GET /rest/api/3/groups/picker": {
    "path": [],
    "query": [
      "accountId",
      "query",
      "exclude",
      "excludeId",
      "maxResults",
      "caseInsensitive",
      "userName"
    ],
    "headers": []
  },
  "GET /rest/api/3/groupuserpicker": {
    "path": [],
    "query": [
      "query",
      "maxResults",
      "showAvatar",
      "fieldId",
      "projectId",
      "issueTypeId",
      "avatarSize",
      "caseInsensitive",
      "excludeConnectAddons"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the query parameter is not provided.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "429": "Returned if the rate limit is exceeded. User search endpoints share a collective rate limit for the tenant, in addition to Jira's normal rate limiting you may receive a rate limit for user search. Please respect the Retry-After header."
    }
  },
  "GET /rest/api/3/instance/license": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/issue": {
    "path": [],
    "query": [
      "updateHistory"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request:\n\n *  is missing required fields.\n *  contains invalid field values.\n *  contains fields that cannot be set for the issue type.\n *  is by a user who does not have the necessary permission.\n *  is to create a subtype in a project different that of the parent issue.\n *  is for a subtask when the option to create subtasks is disabled.\n *  is invalid for any other reason.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/issue/bulk": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if all requests are invalid. Requests may be unsuccessful when they:\n\n *  are missing required fields.\n *  contain invalid field values.\n *  contain fields that cannot be set for the issue type.\n *  are by a user who does not have the necessary permission.\n *  are to create a subtype in a project different that of the parent issue.\n *  is for a subtask when the option to create subtasks is disabled.\n *  are invalid for any other reason.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/issue/createmeta": {
    "path": [],
    "query": [
      "projectIds",
      "projectKeys",
      "issuetypeIds",
      "issuetypeNames",
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/issue/picker": {
    "path": [],
    "query": [
      "query",
      "currentJQL",
      "currentIssueKey",
      "currentProjectId",
      "showSubTasks",
      "showSubTaskParent"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/issue/properties": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Return if the request is invalid or the user does not have the necessary permission.",
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "POST /rest/api/3/issue/properties/multi": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Return if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Return if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/issue/properties/{propertyKey}": {
    "path": [
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "DELETE /rest/api/3/issue/properties/{propertyKey}": {
    "path": [
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/issue/watching": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "fields",
      "fieldsByKeys",
      "expand",
      "properties",
      "updateHistory"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "PUT /rest/api/3/issue/{issueIdOrKey}": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "notifyUsers",
      "overrideScreenSecurity",
      "overrideEditableFlag"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the request body is missing.\n *  the user does not have the necessary permission to edit one or more fields.\n *  the request includes one or more fields that are not found or are not associated with the issue's edit screen.\n *  the request includes an invalid transition.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user uses `overrideScreenSecurity` or `overrideEditableFlag` but doesn't have the necessary permission.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "deleteSubtasks"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the issue has subtasks and `deleteSubtasks` is not set to *true*.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have permission to delete the issue.",
      "404": "Returned if the issue is not found or the user does not have permission to view the issue."
    }
  },
  "PUT /rest/api/3/issue/{issueIdOrKey}/assignee": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the user is not found.\n *  `name`, `key`, or `accountId` is missing.\n *  more than one of `name`, `key`, and `accountId` are provided.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the issue is not found."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/attachments": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if any of the following is true:\n\n *  the issue is not found.\n *  the user does not have permission to view the issue.",
      "413": "The attachments exceed the maximum attachment size for issues. See [Configuring file attachments](https://confluence.atlassian.com/x/wIXKM) for details."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/changelog": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/changelog/list": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "404": "Returned if the issue is not found or the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/comment": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "startAt",
      "maxResults",
      "orderBy",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `orderBy` is set to a value other than *created*.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/comment": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/comment/{id}": {
    "path": [
      "issueIdOrKey",
      "id"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue or comment is not found or the user does not have permission to view the issue or comment."
    }
  },
  "PUT /rest/api/3/issue/{issueIdOrKey}/comment/{id}": {
    "path": [
      "issueIdOrKey",
      "id"
    ],
    "query": [
      "notifyUsers",
      "overrideEditableFlag",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the user does not have permission to edit the comment or the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue or comment is not found or the user does not have permission to view the issue or comment."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}/comment/{id}": {
    "path": [
      "issueIdOrKey",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the user does not have permission to delete the comment.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue or comment is not found or the user does not have permission to view the issue or comment.",
      "405": "Returned if an anonymous call is made to the operation."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/editmeta": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "overrideScreenSecurity",
      "overrideEditableFlag"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user uses an override parameter but doesn't have permission to do so.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/notify": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the recipient is the same as the calling user.\n *  the recipient is invalid. For example, the recipient is set to the assignee, but the issue is unassigned.\n *  the request is invalid. For example, required fields are missing or have invalid values.",
      "403": "Returned if:\n\n *  outgoing emails are disabled.\n *  no SMTP server is configured.",
      "404": "Returned if the issue is not found."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/properties": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Returned if the issue is not found or the user does not have permissions to view the issue."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}": {
    "path": [
      "issueIdOrKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue or property is not found or the user does not have permission to see the issue."
    }
  },
  "PUT /rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}": {
    "path": [
      "issueIdOrKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to edit the issue.",
      "404": "Returned if the issue is not found or the user does not have permission to view the issue."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}": {
    "path": [
      "issueIdOrKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue or property is not found, or the user does not have permission to edit the issue."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/remotelink": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "globalId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if issue linking is disabled.",
      "404": "Returned if the issue or remote issue link is not found or the user does not have permission to view the issue."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/remotelink": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to link issues.",
      "404": "Returned if the issue is not found or the user does not have permission to view the issue."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}/remotelink": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "globalId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if a global ID isn't provided.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to link issues.",
      "404": "Returned if the issue or remote issue link is not found or the user does not have permission to view the issue."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}": {
    "path": [
      "issueIdOrKey",
      "linkId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the link ID is invalid or the remote issue link does not belong to the issue.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if issue linking is disabled.",
      "404": "Returned if the issue or remote issue link is not found or the user does not have permission to view the issue."
    }
  },
  "PUT /rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}": {
    "path": [
      "issueIdOrKey",
      "linkId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the link ID is invalid.\n *  the remote issue link does not belong to the issue.\n *  the request body is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to link issues.",
      "404": "Returned if the issue or remote issue link is not found or the user does not have permission to view the issue."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}": {
    "path": [
      "issueIdOrKey",
      "linkId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the link ID is invalid or the remote issue link does not belong to the issue.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to link issues.",
      "404": "Returned if the issue or remote issue link is not found or the user does not have permission to view the issue."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/transitions": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "expand",
      "transitionId",
      "skipRemoteOnlyCondition",
      "includeUnavailableTransitions",
      "sortByOpsBarAndStatus"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/transitions": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  no transition is specified.\n *  the user does not have permission to transition the issue.\n *  a field that isn't included on the transition screen is defined in `fields` or `update`.\n *  a field is specified in both `fields` and `update`.\n *  the request is invalid for any other reason.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/votes": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  voting is disabled.\n *  the user does not have permission to view the issue.\n *  the issue is not found."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/votes": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  voting is disabled.\n *  the issue is not found."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}/votes": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  voting is disabled.\n *  the user has not voted on the issue.\n *  the issue is not found."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/watchers": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/watchers": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the permission to manage the watcher list.",
      "404": "Returned if the issue or the user is not found or the user does not have permission to view the issue."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}/watchers": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "username",
      "accountId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `accountId` is not supplied.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the permission to manage the watcher list.",
      "404": "Returned if the issue or the user is not found or the user does not have permission to view the issue."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/worklog": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "startAt",
      "maxResults",
      "startedAfter",
      "startedBefore",
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the issue is not found or the user does not have permission to view the issue.\n *  `startAt` or `maxResults` has non-numeric values.\n *  time tracking is disabled."
    }
  },
  "POST /rest/api/3/issue/{issueIdOrKey}/worklog": {
    "path": [
      "issueIdOrKey"
    ],
    "query": [
      "notifyUsers",
      "adjustEstimate",
      "newEstimate",
      "reduceBy",
      "expand",
      "overrideEditableFlag"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `adjustEstimate` is set to `new` but `newEstimate` is not provided or is invalid.\n *  `adjustEstimate` is set to `manual` but `reduceBy` is not provided or is invalid.\n *  the user does not have permission to add the worklog.\n *  the request JSON is malformed.",
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if the issue is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/worklog/{id}": {
    "path": [
      "issueIdOrKey",
      "id"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if:\n\n *  the issue is not found or the user does not have permission to view it.\n *  the worklog is not found or the user does not have permission to view it.\n *  time tracking is disabled.\n\n."
    }
  },
  "PUT /rest/api/3/issue/{issueIdOrKey}/worklog/{id}": {
    "path": [
      "issueIdOrKey",
      "id"
    ],
    "query": [
      "notifyUsers",
      "adjustEstimate",
      "newEstimate",
      "expand",
      "overrideEditableFlag"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `adjustEstimate` is set to `new` but `newEstimate` is not provided or is invalid.\n *  the user does not have permission to update the worklog.\n *  the request JSON is malformed.",
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if:\n\n *  the issue is not found or user does not have permission to view the issue.\n *  the worklog is not found or the user does not have permission to view it.\n *  time tracking is disabled."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}/worklog/{id}": {
    "path": [
      "issueIdOrKey",
      "id"
    ],
    "query": [
      "notifyUsers",
      "adjustEstimate",
      "newEstimate",
      "increaseBy",
      "overrideEditableFlag"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `adjustEstimate` is set to `new` but `newEstimate` is not provided or is invalid.\n *  `adjustEstimate` is set to `manual` but `reduceBy` is not provided or is invalid.\n *  the user does not have permission to delete the worklog.",
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if:\n\n *  the issue is not found or user does not have permission to view the issue.\n *  the worklog is not found or the user does not have permission to view it.\n *  time tracking is disabled."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties": {
    "path": [
      "issueIdOrKey",
      "worklogId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the worklog ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the issue or worklog is not found.\n *  the user does not have permission to view the issue or worklog."
    }
  },
  "GET /rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}": {
    "path": [
      "issueIdOrKey",
      "worklogId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the worklog ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the issue, worklog, or property is not found.\n *  the user does not have permission to view the issue or worklog."
    }
  },
  "PUT /rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}": {
    "path": [
      "issueIdOrKey",
      "worklogId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the worklog ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to edit the worklog.",
      "404": "Returned if:\n\n *  the issue or worklog is not found.\n *  the user does not have permission to view the issue or worklog."
    }
  },
  "DELETE /rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}": {
    "path": [
      "issueIdOrKey",
      "worklogId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the worklog key or id is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to edit the worklog.",
      "404": "Returned if:\n\n *  the issue, worklog, or property is not found.\n *  the user does not have permission to view the issue or worklog."
    }
  },
  "POST /rest/api/3/issueLink": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the comment is not created. The response contains an error message indicating why the comment wasn't created. The issue link is also not created.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  issue linking is disabled.\n *  the user cannot view one or both of the issues. For example, the user doesn't have *Browse project* project permission for a project containing one of the issues.\n *  the user does not have *link issues* project permission.\n *  either of the link issues are not found.\n *  the issue link type is not found."
    }
  },
  "GET /rest/api/3/issueLink/{linkId}": {
    "path": [
      "linkId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue link ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  issue linking is disabled.\n *  the issue link is not found.\n *  the user doesn't have the required permissions."
    }
  },
  "DELETE /rest/api/3/issueLink/{linkId}": {
    "path": [
      "linkId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue link ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  issue linking is disabled.\n *  the issue link is not found.\n *  the user doesn't have the required permissions."
    }
  },
  "GET /rest/api/3/issueLinkType": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if issue linking is disabled."
    }
  },
  "POST /rest/api/3/issueLinkType": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  issue linking is disabled.\n *  the issue link type name is in use.\n *  the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/issueLinkType/{issueLinkTypeId}": {
    "path": [
      "issueLinkTypeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue link type ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  issue linking is disabled.\n *  the issue link type is not found.\n *  the user does not have the required permissions."
    }
  },
  "PUT /rest/api/3/issueLinkType/{issueLinkTypeId}": {
    "path": [
      "issueLinkTypeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue link type ID or the request body are invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  issue linking is disabled.\n *  the issue link type is not found.\n *  the user does not have the required permissions."
    }
  },
  "DELETE /rest/api/3/issueLinkType/{issueLinkTypeId}": {
    "path": [
      "issueLinkTypeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue link type ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  issue linking is disabled.\n *  the issue link type is not found.\n *  the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/issuesecurityschemes": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have permission to administer issue security schemes."
    }
  },
  "GET /rest/api/3/issuesecurityschemes/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the administrator permission and the scheme is not used in any project where the user has administrative permission."
    }
  },
  "GET /rest/api/3/issuesecurityschemes/{issueSecuritySchemeId}/members": {
    "path": [
      "issueSecuritySchemeId"
    ],
    "query": [
      "startAt",
      "maxResults",
      "issueSecurityLevelId",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if no issue security level members are found."
    }
  },
  "GET /rest/api/3/issuetype": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/issuetype": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid because:\n\n *  no content is sent.\n *  the issue type name exceeds 60 characters.\n *  a subtask issue type is requested on an instance where subtasks are disabled.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "409": "Returned if the issue type name is in use."
    }
  },
  "GET /rest/api/3/issuetype/project": {
    "path": [],
    "query": [
      "projectId",
      "level"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the project is not found.\n *  the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/issuetype/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue type ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the issue type is not found.\n *  the user does not have the required permissions."
    }
  },
  "PUT /rest/api/3/issuetype/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid because:\n\n *  no content is sent.\n *  the issue type name exceeds 60 characters.\n *  the avatar is not associated with this issue type.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the issue type is not found.",
      "409": "Returned if the issue type name is in use."
    }
  },
  "DELETE /rest/api/3/issuetype/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "alternativeIssueTypeId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if any issues cannot be updated with the alternative issue type.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the issue type is in use and an alternative issue type is not specified.\n *  the issue type or alternative issue type is not found.",
      "409": "Returned if the issue type is in use and:\n\n *  also specified as the alternative issue type.\n *  is a *standard* issue type and the alternative issue type is a *subtask*."
    }
  },
  "GET /rest/api/3/issuetype/{id}/alternatives": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the issue type is not found.\n *  the user does not have the required permissions."
    }
  },
  "POST /rest/api/3/issuetype/{id}/avatar2": {
    "path": [
      "id"
    ],
    "query": [
      "x",
      "y",
      "size"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  an image isn't included in the request.\n *  the image type is unsupported.\n *  the crop parameters extend the crop area beyond the edge of the image.\n *  `cropSize` is missing.\n *  the issue type ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the issue type is not found."
    }
  },
  "GET /rest/api/3/issuetype/{issueTypeId}/properties": {
    "path": [
      "issueTypeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue type ID is invalid.",
      "404": "Returned if:\n\n *  the issue type is not found.\n *  the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}": {
    "path": [
      "issueTypeId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue type ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue type or property is not found or the user does not have the required permissions."
    }
  },
  "PUT /rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}": {
    "path": [
      "issueTypeId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the issue type ID is invalid.\n *  a property value is not provided.\n *  the property value JSON content is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to modify the issue type.",
      "404": "Returned if:\n\n *  the issue type is not found.\n *  the user does not have the permission view the issue type."
    }
  },
  "DELETE /rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}": {
    "path": [
      "issueTypeId",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the issue type ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the issue type or property is not found."
    }
  },
  "GET /rest/api/3/issuetypescheme": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "orderBy",
      "expand",
      "queryString"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "POST /rest/api/3/issuetypescheme": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "409": "Returned if the scheme name is used by another scheme."
    }
  },
  "GET /rest/api/3/issuetypescheme/mapping": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "issueTypeSchemeId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/issuetypescheme/project": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "PUT /rest/api/3/issuetypescheme/project": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type scheme or the project is not found."
    }
  },
  "PUT /rest/api/3/issuetypescheme/{issueTypeSchemeId}": {
    "path": [
      "issueTypeSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type scheme is not found."
    }
  },
  "DELETE /rest/api/3/issuetypescheme/{issueTypeSchemeId}": {
    "path": [
      "issueTypeSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is to delete the default issue type scheme.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type scheme is not found."
    }
  },
  "PUT /rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype": {
    "path": [
      "issueTypeSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type or the issue type scheme is not found."
    }
  },
  "PUT /rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype/move": {
    "path": [
      "issueTypeSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type scheme is not found."
    }
  },
  "DELETE /rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype/{issueTypeId}": {
    "path": [
      "issueTypeSchemeId",
      "issueTypeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type scheme is missing or the issue type is not found in the issue type scheme."
    }
  },
  "GET /rest/api/3/issuetypescreenscheme": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "queryString",
      "orderBy",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "POST /rest/api/3/issuetypescreenscheme": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type or screen scheme is not found.",
      "409": "Returned if the issue type is a sub-task, but sub-tasks are disabled in Jira settings."
    }
  },
  "GET /rest/api/3/issuetypescreenscheme/mapping": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "issueTypeScreenSchemeId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/issuetypescreenscheme/project": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "PUT /rest/api/3/issuetypescreenscheme/project": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  project is not found.\n *  issue type screen scheme is not found.\n *  the project is not a classic project.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type screen scheme or the project are missing."
    }
  },
  "PUT /rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}": {
    "path": [
      "issueTypeScreenSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type screen scheme is not found."
    }
  },
  "DELETE /rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}": {
    "path": [
      "issueTypeScreenSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type screen scheme is not found."
    }
  },
  "PUT /rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping": {
    "path": [
      "issueTypeScreenSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type screen scheme, issue type, or screen scheme is not found.",
      "409": "Returned if the issue type is a sub-task, but sub-tasks are disabled in Jira settings."
    }
  },
  "PUT /rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping/default": {
    "path": [
      "issueTypeScreenSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type screen scheme or the screen screen is not found, or the screen scheme isn't used in classic projects."
    }
  },
  "POST /rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping/remove": {
    "path": [
      "issueTypeScreenSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the issue type screen scheme or one or more issue type mappings are not found."
    }
  },
  "GET /rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/project": {
    "path": [
      "issueTypeScreenSchemeId"
    ],
    "query": [
      "startAt",
      "maxResults",
      "query"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/jql/autocompletedata": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "POST /rest/api/3/jql/autocompletedata": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "GET /rest/api/3/jql/autocompletedata/suggestions": {
    "path": [],
    "query": [
      "fieldName",
      "fieldValue",
      "predicateName",
      "predicateValue"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if an invalid combination of parameters is passed.",
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "GET /rest/api/3/jql/function/computation": {
    "path": [],
    "query": [
      "functionKey",
      "startAt",
      "maxResults",
      "orderBy",
      "filter"
    ],
    "headers": []
  },
  "POST /rest/api/3/jql/function/computation": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /rest/api/3/jql/match": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if `jqls` exceeds the maximum number of JQL queries or `issueIds` exceeds the maximum number of issue IDs."
    }
  },
  "POST /rest/api/3/jql/parse": {
    "path": [],
    "query": [
      "validation"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "POST /rest/api/3/jql/pdcleaner": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if at least one of the queries cannot be converted. For example, the JQL has invalid operators or invalid keywords, or the users in the query cannot be found.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/jql/sanitize": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/label": {
    "path": [],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": []
  },
  "GET /rest/api/3/license/approximateLicenseCount": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to complete this request."
    }
  },
  "GET /rest/api/3/license/approximateLicenseCount/product/{applicationKey}": {
    "path": [
      "applicationKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to complete this request."
    }
  },
  "GET /rest/api/3/mypermissions": {
    "path": [],
    "query": [
      "projectKey",
      "projectId",
      "issueKey",
      "issueId",
      "permissions",
      "projectUuid",
      "projectConfigurationUuid",
      "commentId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `permissions` is empty, contains an invalid key, or does not equal BROWSE\\_PROJECTS when commentId is provided.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project or issue is not found or the user does not have permission to view the project or issue."
    }
  },
  "GET /rest/api/3/mypreferences": {
    "path": [],
    "query": [
      "key"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the key is not provided or not found."
    }
  },
  "PUT /rest/api/3/mypreferences": {
    "path": [],
    "query": [
      "key"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the key or value is not provided or invalid."
    }
  },
  "DELETE /rest/api/3/mypreferences": {
    "path": [],
    "query": [
      "key"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the key is not provided or not found."
    }
  },
  "GET /rest/api/3/mypreferences/locale": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/myself": {
    "path": [],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/notificationscheme": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "projectId",
      "onlyDefault",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/notificationscheme": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission."
    }
  },
  "GET /rest/api/3/notificationscheme/project": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "notificationSchemeId",
      "projectId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if search criteria are invalid, strings vs numbers for projectId, notificationSchemeId, startAt and maxResult",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/notificationscheme/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the notification scheme is not found or the user does not have permission to view it."
    }
  },
  "PUT /rest/api/3/notificationscheme/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the notification scheme isn't found."
    }
  },
  "PUT /rest/api/3/notificationscheme/{id}/notification": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the notification scheme isn't found."
    }
  },
  "DELETE /rest/api/3/notificationscheme/{notificationSchemeId}": {
    "path": [
      "notificationSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the notification scheme isn't found."
    }
  },
  "DELETE /rest/api/3/notificationscheme/{notificationSchemeId}/notification/{notificationId}": {
    "path": [
      "notificationSchemeId",
      "notificationId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if either the notification scheme or notification isn't found."
    }
  },
  "GET /rest/api/3/permissions": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/permissions/check": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `projectPermissions` is provided without at least one project permission being provided.\n *  an invalid global permission is provided in the global permissions list.\n *  an invalid project permission is provided in the project permissions list.\n *  more than 1000 valid project IDs or more than 1000 valid issue IDs are provided.\n *  an invalid account ID is provided.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/permissions/project": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if a project permission is not found.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/permissionscheme": {
    "path": [],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/permissionscheme": {
    "path": [],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission or the feature is not available in the Jira plan."
    }
  },
  "GET /rest/api/3/permissionscheme/{schemeId}": {
    "path": [
      "schemeId"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the permission scheme is not found or the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/permissionscheme/{schemeId}": {
    "path": [
      "schemeId"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if:\n\n *  the user does not have the necessary permission to update permission schemes.\n *  the Jira instance is Jira Core Free or Jira Software Free. Permission schemes cannot be updated on free plans.",
      "404": "Returned if the permission scheme is not found."
    }
  },
  "DELETE /rest/api/3/permissionscheme/{schemeId}": {
    "path": [
      "schemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the permission scheme is not found."
    }
  },
  "GET /rest/api/3/permissionscheme/{schemeId}/permission": {
    "path": [
      "schemeId"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the permission schemes is not found or the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/permissionscheme/{schemeId}/permission": {
    "path": [
      "schemeId"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the value for expand is invalid or the same permission grant is present.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/permissionscheme/{schemeId}/permission/{permissionId}": {
    "path": [
      "schemeId",
      "permissionId"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the permission scheme or permission grant is not found or the user does not have the necessary permission."
    }
  },
  "DELETE /rest/api/3/permissionscheme/{schemeId}/permission/{permissionId}": {
    "path": [
      "schemeId",
      "permissionId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if permission grant with the provided ID is not found.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/priority": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission."
    }
  },
  "PUT /rest/api/3/priority/default": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the issue priority isn't found."
    }
  },
  "PUT /rest/api/3/priority/move": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the issue priority isn't found."
    }
  },
  "GET /rest/api/3/priority/search": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "onlyDefault"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/priority/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if the issue priority isn't found."
    }
  },
  "PUT /rest/api/3/priority/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the issue priority isn't found."
    }
  },
  "DELETE /rest/api/3/priority/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "replaceWith"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the issue priority isn't found.",
      "409": "Returned if a task to delete the issue priority is already running."
    }
  },
  "POST /rest/api/3/project": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid and the project could not be created.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to create projects."
    }
  },
  "GET /rest/api/3/project/recent": {
    "path": [],
    "query": [
      "expand",
      "properties"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/project/search": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "orderBy",
      "id",
      "keys",
      "query",
      "typeKey",
      "categoryId",
      "action",
      "expand",
      "status",
      "properties",
      "propertyQuery"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if no projects matching the search criteria are found."
    }
  },
  "GET /rest/api/3/project/type": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "GET /rest/api/3/project/type/accessible": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /rest/api/3/project/type/{projectTypeKey}": {
    "path": [
      "projectTypeKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if the project type is not found."
    }
  },
  "GET /rest/api/3/project/type/{projectTypeKey}/accessible": {
    "path": [
      "projectTypeKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project type is not accessible to the user."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [
      "expand",
      "properties"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or the user does not have permission to view it."
    }
  },
  "PUT /rest/api/3/project/{projectIdOrKey}": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if:\n\n *  the user does not have the necessary permission to update project details.\n *  the permission scheme is being changed and the Jira instance is Jira Core Free or Jira Software Free. Permission schemes cannot be changed on free plans.",
      "404": "Returned if the project is not found."
    }
  },
  "DELETE /rest/api/3/project/{projectIdOrKey}": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [
      "enableUndo"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or the user does not have permission to delete it."
    }
  },
  "POST /rest/api/3/project/{projectIdOrKey}/archive": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permissions.",
      "404": "Returned if the project is not found."
    }
  },
  "PUT /rest/api/3/project/{projectIdOrKey}/avatar": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to administer the project.",
      "404": "Returned if the project or avatar is not found or the user does not have permission to view the project."
    }
  },
  "DELETE /rest/api/3/project/{projectIdOrKey}/avatar/{id}": {
    "path": [
      "projectIdOrKey",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the avatar is a system avatar or the user does not have permission to administer the project.",
      "404": "Returned if the project or avatar is not found or the user does not have permission to view the project."
    }
  },
  "POST /rest/api/3/project/{projectIdOrKey}/avatar2": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [
      "x",
      "y",
      "size"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  an image isn't included in the request.\n *  the image type is unsupported.\n *  the crop parameters extend the crop area beyond the edge of the image.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to administer the project or an anonymous call is made to the operation.",
      "404": "Returned if the project is not found or the user does not have permission to view the project."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/avatars": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or the user does not have permission to view the project."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/component": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [
      "startAt",
      "maxResults",
      "orderBy",
      "query"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/components": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or the user does not have permission to view it."
    }
  },
  "POST /rest/api/3/project/{projectIdOrKey}/delete": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/features": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the project is not found."
    }
  },
  "PUT /rest/api/3/project/{projectIdOrKey}/features/{featureKey}": {
    "path": [
      "projectIdOrKey",
      "featureKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the project or project feature is not found."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/properties": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have permission to view the project.",
      "404": "Returned if the project is not found."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}": {
    "path": [
      "projectIdOrKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have permission to view the project.",
      "404": "Returned if the project or property is not found."
    }
  },
  "PUT /rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}": {
    "path": [
      "projectIdOrKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the project key or id is invalid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have permission to administer the project.",
      "404": "Returned if the project is not found."
    }
  },
  "DELETE /rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}": {
    "path": [
      "projectIdOrKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have permission to administer the project.",
      "404": "Returned if the project or property is not found."
    }
  },
  "POST /rest/api/3/project/{projectIdOrKey}/restore": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/role": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing or if the user lacks administrative permissions for the project.",
      "404": "Returned if the project is not found or or if the user does not have administrative permissions for the project."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/role/{id}": {
    "path": [
      "projectIdOrKey",
      "id"
    ],
    "query": [
      "excludeInactiveUsers"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the project or project role is not found.\n *  the user does not have administrative permission."
    }
  },
  "POST /rest/api/3/project/{projectIdOrKey}/role/{id}": {
    "path": [
      "projectIdOrKey",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing or if the calling user lacks administrative permissions for the project.",
      "404": "Returned if:\n\n *  the project is not found.\n *  the user or group is not found.\n *  the group or user is not active."
    }
  },
  "PUT /rest/api/3/project/{projectIdOrKey}/role/{id}": {
    "path": [
      "projectIdOrKey",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing or if the calling user lacks administrative permissions for the project.",
      "404": "Returned if:\n\n *  the project is not found.\n *  a user or group is not found.\n *  a group or user is not active."
    }
  },
  "DELETE /rest/api/3/project/{projectIdOrKey}/role/{id}": {
    "path": [
      "projectIdOrKey",
      "id"
    ],
    "query": [
      "user",
      "group",
      "groupId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "404": "Returned if:\n\n *  the project or project role is not found.\n *  the calling user does not have administrative permission."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/roledetails": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [
      "currentMember",
      "excludeConnectAddons"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or if the user does not have the necessary permissions for the project."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/statuses": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/version": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [
      "startAt",
      "maxResults",
      "orderBy",
      "query",
      "status",
      "expand"
    ],
    "headers": [],
    "errors": {
      "404": "Returned if the project is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/project/{projectIdOrKey}/versions": {
    "path": [
      "projectIdOrKey"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "404": "Returned if the project is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/project/{projectId}/email": {
    "path": [
      "projectId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to read project.",
      "404": "Returned if the project or project's sender email address is not found."
    }
  },
  "PUT /rest/api/3/project/{projectId}/email": {
    "path": [
      "projectId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid, if the email address is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to read project.",
      "404": "Returned if the project is not found."
    }
  },
  "GET /rest/api/3/project/{projectKeyOrId}/issuesecuritylevelscheme": {
    "path": [
      "projectKeyOrId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the project is visible to the user but the user doesn't have administrative permissions.",
      "404": "Returned if the project is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/project/{projectKeyOrId}/permissionscheme": {
    "path": [
      "projectKeyOrId"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have permission to view the project's configuration.",
      "404": "Returned if the project is not found or the user does not have permission to view the project."
    }
  },
  "PUT /rest/api/3/project/{projectKeyOrId}/permissionscheme": {
    "path": [
      "projectKeyOrId"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if:\n\n *  the user does not have the necessary permission to edit the project's configuration.\n *  the Jira instance is Jira Core Free or Jira Software Free. Permission schemes cannot be assigned to projects on free plans.",
      "404": "Returned if the project or permission scheme is not found."
    }
  },
  "GET /rest/api/3/project/{projectKeyOrId}/securitylevel": {
    "path": [
      "projectKeyOrId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Returned if the project is not found or the user does not have permission to view it."
    }
  },
  "GET /rest/api/3/projectCategory": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/projectCategory": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `name` is not provided or exceeds 255 characters.\n *  `description` exceeds 1000 characters.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "409": "Returned if the project category name is in use."
    }
  },
  "GET /rest/api/3/projectCategory/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project category is not found."
    }
  },
  "PUT /rest/api/3/projectCategory/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `name` has been modified and exceeds 255 characters.\n *  `description` has been modified and exceeds 1000 characters.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the project category is not found."
    }
  },
  "DELETE /rest/api/3/projectCategory/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the project category is not found."
    }
  },
  "GET /rest/api/3/projectvalidate/key": {
    "path": [],
    "query": [
      "key"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "GET /rest/api/3/projectvalidate/validProjectKey": {
    "path": [],
    "query": [
      "key"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "GET /rest/api/3/projectvalidate/validProjectName": {
    "path": [],
    "query": [
      "name"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if a valid project name cannot be generated."
    }
  },
  "POST /rest/api/3/resolution": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission."
    }
  },
  "PUT /rest/api/3/resolution/default": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the issue resolution isn't found."
    }
  },
  "PUT /rest/api/3/resolution/move": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the issue resolution isn't found."
    }
  },
  "GET /rest/api/3/resolution/search": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "onlyDefault"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/resolution/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue resolution value is not found."
    }
  },
  "PUT /rest/api/3/resolution/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the issue resolution isn't found."
    }
  },
  "DELETE /rest/api/3/resolution/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "replaceWith"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request isn't valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "404": "Returned if the issue resolution isn't found.",
      "409": "Returned if a task to delete the issue resolution is already running."
    }
  },
  "GET /rest/api/3/role": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions."
    }
  },
  "POST /rest/api/3/role": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid. The `name` cannot be empty or start or end with whitespace.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions.",
      "409": "Returned if a project role with the provided name already exists."
    }
  },
  "GET /rest/api/3/role/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions.",
      "404": "Returned if the project role is not found."
    }
  },
  "POST /rest/api/3/role/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions.",
      "404": "Returned if the project role is not found."
    }
  },
  "PUT /rest/api/3/role/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid. The `name` cannot be empty or start or end with whitespace.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions.",
      "404": "Returned if the project role is not found."
    }
  },
  "DELETE /rest/api/3/role/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "swap"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid or if the replacement project role is not found.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions.",
      "404": "Returned if the project role being deleted is not found.",
      "409": "Returned if the project role being deleted is in use and a replacement project role is not specified in the request."
    }
  },
  "GET /rest/api/3/role/{id}/actors": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions.",
      "404": "Returned if the project role is not found."
    }
  },
  "POST /rest/api/3/role/{id}/actors": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions.",
      "404": "Returned if the project role is not found."
    }
  },
  "DELETE /rest/api/3/role/{id}/actors": {
    "path": [
      "id"
    ],
    "query": [
      "user",
      "groupId",
      "group"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have administrative permissions.",
      "404": "Returned if the project role is not found."
    }
  },
  "GET /rest/api/3/screens": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "queryString",
      "scope",
      "orderBy"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/screens": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions."
    }
  },
  "POST /rest/api/3/screens/addToDefault/{fieldId}": {
    "path": [
      "fieldId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the field it not found or the field is already present."
    }
  },
  "PUT /rest/api/3/screens/{screenId}": {
    "path": [
      "screenId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen is not found."
    }
  },
  "DELETE /rest/api/3/screens/{screenId}": {
    "path": [
      "screenId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen is not found."
    }
  },
  "GET /rest/api/3/screens/{screenId}/availableFields": {
    "path": [
      "screenId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen is not found."
    }
  },
  "GET /rest/api/3/screens/{screenId}/tabs": {
    "path": [
      "screenId"
    ],
    "query": [
      "projectKey"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the screen ID is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen is not found."
    }
  },
  "POST /rest/api/3/screens/{screenId}/tabs": {
    "path": [
      "screenId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen is not found."
    }
  },
  "PUT /rest/api/3/screens/{screenId}/tabs/{tabId}": {
    "path": [
      "screenId",
      "tabId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen or screen tab is not found."
    }
  },
  "DELETE /rest/api/3/screens/{screenId}/tabs/{tabId}": {
    "path": [
      "screenId",
      "tabId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen or screen tab is not found."
    }
  },
  "GET /rest/api/3/screens/{screenId}/tabs/{tabId}/fields": {
    "path": [
      "screenId",
      "tabId"
    ],
    "query": [
      "projectKey"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen or screen tab is not found."
    }
  },
  "POST /rest/api/3/screens/{screenId}/tabs/{tabId}/fields": {
    "path": [
      "screenId",
      "tabId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen, screen tab, or field is not found."
    }
  },
  "DELETE /rest/api/3/screens/{screenId}/tabs/{tabId}/fields/{id}": {
    "path": [
      "screenId",
      "tabId",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen, screen tab, or field is not found."
    }
  },
  "POST /rest/api/3/screens/{screenId}/tabs/{tabId}/fields/{id}/move": {
    "path": [
      "screenId",
      "tabId",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen, screen tab, or field is not found or the field can't be moved to the requested position."
    }
  },
  "POST /rest/api/3/screens/{screenId}/tabs/{tabId}/move/{pos}": {
    "path": [
      "screenId",
      "tabId",
      "pos"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen or screen tab is not found or the position is invalid."
    }
  },
  "GET /rest/api/3/screenscheme": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "id",
      "expand",
      "queryString",
      "orderBy"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/screenscheme": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if a screen used as one of the screen types in the screen scheme is not found."
    }
  },
  "PUT /rest/api/3/screenscheme/{screenSchemeId}": {
    "path": [
      "screenSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the screen scheme or a screen used as one of the screen types is not found."
    }
  },
  "DELETE /rest/api/3/screenscheme/{screenSchemeId}": {
    "path": [
      "screenSchemeId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the screen scheme is used in an issue type screen scheme.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the screen scheme is not found."
    }
  },
  "GET /rest/api/3/search": {
    "path": [],
    "query": [
      "jql",
      "startAt",
      "maxResults",
      "validateQuery",
      "fields",
      "expand",
      "properties",
      "fieldsByKeys"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the JQL query is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/search": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the JQL query is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/securitylevel/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if the issue security level is not found."
    }
  },
  "GET /rest/api/3/serverInfo": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect."
    }
  },
  "GET /rest/api/3/settings/columns": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/settings/columns": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if invalid parameters are passed.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if a navigable field value is not found."
    }
  },
  "GET /rest/api/3/status": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/status/{idOrName}": {
    "path": [
      "idOrName"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the status is not found.\n *  the status is not associated with a workflow.\n *  the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/statuscategory": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/statuscategory/{idOrKey}": {
    "path": [
      "idOrKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the status category is not found."
    }
  },
  "GET /rest/api/3/statuses": {
    "path": [],
    "query": [
      "expand",
      "id"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing, or the caller doesn't have permissions to perform the operation."
    }
  },
  "POST /rest/api/3/statuses": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing, or the caller doesn't have permissions to perform the operation."
    }
  },
  "PUT /rest/api/3/statuses": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing, or the caller doesn't have permissions to perform the operation."
    }
  },
  "DELETE /rest/api/3/statuses": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing, or the caller doesn't have permissions to perform the operation."
    }
  },
  "GET /rest/api/3/statuses/search": {
    "path": [],
    "query": [
      "expand",
      "projectId",
      "startAt",
      "maxResults",
      "searchString",
      "statusCategory"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing, or the caller doesn't have permissions to perform the operation."
    }
  },
  "GET /rest/api/3/task/{taskId}": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the task is not found."
    }
  },
  "POST /rest/api/3/task/{taskId}/cancel": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if cancellation of the task is not possible.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the task is not found."
    }
  },
  "GET /rest/api/3/uiModifications": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the request is not from a Forge app."
    }
  },
  "POST /rest/api/3/uiModifications": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the request is not from a Forge app.",
      "404": "Returned if a project or an issue type in the context are not found."
    }
  },
  "PUT /rest/api/3/uiModifications/{uiModificationId}": {
    "path": [
      "uiModificationId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the request is not from a Forge app.",
      "404": "Returned if the UI modification, a project or an issue type in the context are not found."
    }
  },
  "DELETE /rest/api/3/uiModifications/{uiModificationId}": {
    "path": [
      "uiModificationId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the request is not from a Forge app.",
      "404": "Returned if the UI modification is not found."
    }
  },
  "GET /rest/api/3/universal_avatar/type/{type}/owner/{entityId}": {
    "path": [
      "type",
      "entityId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the avatar type is invalid, the associated item ID is missing, or the item is not found."
    }
  },
  "POST /rest/api/3/universal_avatar/type/{type}/owner/{entityId}": {
    "path": [
      "type",
      "entityId"
    ],
    "query": [
      "x",
      "y",
      "size"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  an image isn't included in the request.\n *  the image type is unsupported.\n *  the crop parameters extend the crop area beyond the edge of the image.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permissions.",
      "404": "Returned if the avatar type is invalid, the associated item ID is missing, or the item is not found."
    }
  },
  "DELETE /rest/api/3/universal_avatar/type/{type}/owner/{owningObjectId}/avatar/{id}": {
    "path": [
      "type",
      "owningObjectId",
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the user does not have permission to delete the avatar, the avatar is not deletable.",
      "404": "Returned if the avatar type, associated item ID, or avatar ID is invalid."
    }
  },
  "GET /rest/api/3/universal_avatar/view/type/{type}": {
    "path": [
      "type"
    ],
    "query": [
      "size",
      "format"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if an avatar is not found or an avatar matching the requested size is not found."
    }
  },
  "GET /rest/api/3/universal_avatar/view/type/{type}/avatar/{id}": {
    "path": [
      "type",
      "id"
    ],
    "query": [
      "size",
      "format"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if an avatar is not found or an avatar matching the requested size is not found."
    }
  },
  "GET /rest/api/3/universal_avatar/view/type/{type}/owner/{entityId}": {
    "path": [
      "type",
      "entityId"
    ],
    "query": [
      "size",
      "format"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if an avatar is not found or an avatar matching the requested size is not found."
    }
  },
  "GET /rest/api/3/user": {
    "path": [],
    "query": [
      "accountId",
      "username",
      "key",
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the calling user does not have the *Browse users and groups* global permission.",
      "404": "Returned if the user is not found."
    }
  },
  "POST /rest/api/3/user": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid or the number of licensed users is exceeded.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "DELETE /rest/api/3/user": {
    "path": [],
    "query": [
      "accountId",
      "username",
      "key"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the user cannot be removed.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the user is not found."
    }
  },
  "GET /rest/api/3/user/assignable/multiProjectSearch": {
    "path": [],
    "query": [
      "query",
      "username",
      "accountId",
      "projectKeys",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `projectKeys` is missing.\n *  `query` or `accountId` is missing.\n *  `query` and `accountId` are provided.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if one or more of the projects is not found.",
      "429": "Returned if the rate limit is exceeded. User search endpoints share a collective rate limit for the tenant, in addition to Jira's normal rate limiting you may receive a rate limit for user search. Please respect the Retry-After header."
    }
  },
  "GET /rest/api/3/user/assignable/search": {
    "path": [],
    "query": [
      "query",
      "sessionId",
      "username",
      "accountId",
      "project",
      "issueKey",
      "startAt",
      "maxResults",
      "actionDescriptorId",
      "recommend"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `issueKey` or `project` is missing.\n *  `query` or `accountId` is missing.\n *  `query` and `accountId` are provided.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the project, issue, or transition is not found.",
      "429": "Returned if the rate limit is exceeded. User search endpoints share a collective rate limit for the tenant, in addition to Jira's normal rate limiting you may receive a rate limit for user search. Please respect the Retry-After header."
    }
  },
  "GET /rest/api/3/user/bulk": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "username",
      "key",
      "accountId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `accountID` is missing.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/user/bulk/migration": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "username",
      "key"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `key` or `username`",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/user/columns": {
    "path": [],
    "query": [
      "accountId",
      "username"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission or is not accessing their user record.",
      "404": "Returned if the requested user is not found."
    }
  },
  "PUT /rest/api/3/user/columns": {
    "path": [],
    "query": [
      "accountId"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission or is not accessing their user record.",
      "404": "Returned if the requested user is not found.",
      "429": "Returned if the rate limit is exceeded. User search endpoints share a collective rate limit for the tenant, in addition to Jira's normal rate limiting you may receive a rate limit for user search. Please respect the Retry-After header.",
      "500": "Returned if an invalid issue table column ID is sent."
    }
  },
  "DELETE /rest/api/3/user/columns": {
    "path": [],
    "query": [
      "accountId",
      "username"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission or is not accessing their user record."
    }
  },
  "GET /rest/api/3/user/email": {
    "path": [],
    "query": [
      "accountId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the calling app is not approved to use this API.",
      "401": "Returned if the authentication credentials are incorrect or missing from the request (for example if a user is trying to access this API).",
      "404": "Returned if a user with the given `accountId` doesn't exist",
      "503": "Indicates the API is not currently enabled"
    }
  },
  "GET /rest/api/3/user/email/bulk": {
    "path": [],
    "query": [
      "accountId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the calling app is not approved to use this API.",
      "401": "Returned if the authentication credentials are incorrect, or missing from the request (for example if a user is trying to access this API).",
      "503": "Indicates the API is not currently enabled."
    }
  },
  "GET /rest/api/3/user/groups": {
    "path": [],
    "query": [
      "accountId",
      "username",
      "key"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the calling user does not have the *Browse users and groups* global permission.",
      "404": "Returned if the user is not found."
    }
  },
  "GET /rest/api/3/user/permission/search": {
    "path": [],
    "query": [
      "query",
      "username",
      "accountId",
      "permissions",
      "issueKey",
      "projectKey",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `issueKey` or `projectKey` is missing.\n *  `query` or `accountId` is missing.\n *  `query` and `accountId` are provided.\n *  `permissions` is empty or contains an invalid entry.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the issue or project is not found.",
      "429": "Returned if the rate limit is exceeded. User search endpoints share a collective rate limit for the tenant, in addition to Jira's normal rate limiting you may receive a rate limit for user search. Please respect the Retry-After header."
    }
  },
  "GET /rest/api/3/user/picker": {
    "path": [],
    "query": [
      "query",
      "maxResults",
      "showAvatar",
      "exclude",
      "excludeAccountIds",
      "avatarSize",
      "excludeConnectUsers"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `exclude` and `excludeAccountIds` are provided.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "429": "Returned if the rate limit is exceeded. User search endpoints share a collective rate limit for the tenant, in addition to Jira's normal rate limiting you may receive a rate limit for user search. Please respect the Retry-After header."
    }
  },
  "GET /rest/api/3/user/properties": {
    "path": [],
    "query": [
      "accountId",
      "userKey",
      "username"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `accountId` is missing.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission or is not accessing their user record.",
      "404": "Returned if the user is not found."
    }
  },
  "GET /rest/api/3/user/properties/{propertyKey}": {
    "path": [
      "propertyKey"
    ],
    "query": [
      "accountId",
      "userKey",
      "username"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `accountId` is missing.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission or is not accessing their user record.",
      "404": "Returned if the user is not found."
    }
  },
  "PUT /rest/api/3/user/properties/{propertyKey}": {
    "path": [
      "propertyKey"
    ],
    "query": [
      "accountId",
      "userKey",
      "username"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `accountId` is missing.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission or is not accessing their user record.",
      "404": "Returned if the user is not found.",
      "405": "Returned if the property key is not specified."
    }
  },
  "DELETE /rest/api/3/user/properties/{propertyKey}": {
    "path": [
      "propertyKey"
    ],
    "query": [
      "accountId",
      "userKey",
      "username"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if `accountId` is missing.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission or is not accessing their user record.",
      "404": "Returned if the user or the property is not found."
    }
  },
  "GET /rest/api/3/user/search": {
    "path": [],
    "query": [
      "query",
      "username",
      "accountId",
      "startAt",
      "maxResults",
      "property"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `accountId`, `query` or `property` is missing.\n *  `query` and `accountId` are provided.\n *  `property` parameter is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "429": "Returned if the rate limit is exceeded. User search endpoints share a collective rate limit for the tenant, in addition to Jira's normal rate limiting you may receive a rate limit for user search. Please respect the Retry-After header."
    }
  },
  "GET /rest/api/3/user/search/query": {
    "path": [],
    "query": [
      "query",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the query is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "408": "Returned if the search is timed out."
    }
  },
  "GET /rest/api/3/user/search/query/key": {
    "path": [],
    "query": [
      "query",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the query is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "408": "Returned if the search is timed out."
    }
  },
  "GET /rest/api/3/user/viewissue/search": {
    "path": [],
    "query": [
      "query",
      "username",
      "accountId",
      "issueKey",
      "projectKey",
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  `issueKey` or `projectKey` is missing.\n *  `query` or `accountId` is missing.\n *  `query` and `accountId` are provided.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the issue or project is not found.",
      "429": "Returned if the rate limit is exceeded. User search endpoints share a collective rate limit for the tenant, in addition to Jira's normal rate limiting you may receive a rate limit for user search. Please respect the Retry-After header."
    }
  },
  "GET /rest/api/3/users": {
    "path": [],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "409": "Returned if the request takes longer than 10 seconds or is interrupted."
    }
  },
  "GET /rest/api/3/users/search": {
    "path": [],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the user doesn't have the necessary permission.",
      "409": "Returned if the request takes longer than 10 seconds or is interrupted."
    }
  },
  "POST /rest/api/3/version": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the project is not found.\n *  the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/version/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the version is not found or the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/version/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  the request is invalid.\n *  the user does not have the required permissions.",
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if the version is not found."
    }
  },
  "PUT /rest/api/3/version/{id}/mergeto/{moveIssuesTo}": {
    "path": [
      "id",
      "moveIssuesTo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if:\n\n *  the authentication credentials are incorrect or missing.\n *  the user does not have the required permissions.",
      "404": "Returned if the version to be deleted or the version to merge to are not found."
    }
  },
  "POST /rest/api/3/version/{id}/move": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n\n *  no body parameters are provided.\n *  `after` and `position` are provided.\n *  `position` is invalid.",
      "401": "Returned if:\n\n *  the authentication credentials are incorrect or missing\n *  the user does not have the required commissions.",
      "404": "Returned if the version or move after version are not found."
    }
  },
  "GET /rest/api/3/version/{id}/relatedIssueCounts": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect.",
      "404": "Returned if:\n\n *  the version is not found.\n *  the user does not have the required permissions."
    }
  },
  "POST /rest/api/3/version/{id}/removeAndSwap": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the version to delete is not found.\n *  the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/version/{id}/unresolvedIssueCount": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if:\n\n *  the version is not found.\n *  the user does not have the required permissions."
    }
  },
  "GET /rest/api/3/webhook": {
    "path": [],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the caller isn't an app."
    }
  },
  "POST /rest/api/3/webhook": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the caller isn't an app."
    }
  },
  "DELETE /rest/api/3/webhook": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the list of webhook IDs is missing.",
      "403": "Returned if the caller isn't an app."
    }
  },
  "GET /rest/api/3/webhook/failed": {
    "path": [],
    "query": [
      "maxResults",
      "after"
    ],
    "headers": [],
    "errors": {
      "400": "400 response",
      "403": "Returned if the caller is not a Connect app."
    }
  },
  "PUT /rest/api/3/webhook/refresh": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the caller isn't an app."
    }
  },
  "POST /rest/api/3/workflow": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if one or more statuses is not found."
    }
  },
  "GET /rest/api/3/workflow/rule/config": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "types",
      "keys",
      "workflowNames",
      "withTags",
      "draft",
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the caller is not a Connect app.",
      "404": "Returned if any transition rule type is not supported."
    }
  },
  "PUT /rest/api/3/workflow/rule/config": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the caller is not a Connect app."
    }
  },
  "PUT /rest/api/3/workflow/rule/config/delete": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if the caller is not a Connect app."
    }
  },
  "GET /rest/api/3/workflow/search": {
    "path": [],
    "query": [
      "startAt",
      "maxResults",
      "workflowName",
      "expand",
      "queryString",
      "orderBy",
      "isActive"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/workflow/transitions/{transitionId}/properties": {
    "path": [
      "transitionId"
    ],
    "query": [
      "includeReservedKeys",
      "key",
      "workflowName",
      "workflowMode"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have admin permission",
      "404": "Returned if the workflow transition or property is not found."
    }
  },
  "POST /rest/api/3/workflow/transitions/{transitionId}/properties": {
    "path": [
      "transitionId"
    ],
    "query": [
      "key",
      "workflowName",
      "workflowMode"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if a workflow property with the same key is present on the transition.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow transition is not found."
    }
  },
  "PUT /rest/api/3/workflow/transitions/{transitionId}/properties": {
    "path": [
      "transitionId"
    ],
    "query": [
      "key",
      "workflowName",
      "workflowMode"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow transition is not found."
    }
  },
  "DELETE /rest/api/3/workflow/transitions/{transitionId}/properties": {
    "path": [
      "transitionId"
    ],
    "query": [
      "key",
      "workflowName",
      "workflowMode"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow transition is not found."
    }
  },
  "DELETE /rest/api/3/workflow/{entityId}": {
    "path": [
      "entityId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the workflow is not found."
    }
  },
  "GET /rest/api/3/workflowscheme": {
    "path": [],
    "query": [
      "startAt",
      "maxResults"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "POST /rest/api/3/workflowscheme": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/workflowscheme/project": {
    "path": [],
    "query": [
      "projectId"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "PUT /rest/api/3/workflowscheme/project": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is not valid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the required permissions.",
      "404": "Returned if the workflow scheme or the project are not found."
    }
  },
  "GET /rest/api/3/workflowscheme/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "returnDraftIfExists"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme is not found."
    }
  },
  "PUT /rest/api/3/workflowscheme/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme is not found."
    }
  },
  "DELETE /rest/api/3/workflowscheme/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the scheme is active.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme is not found."
    }
  },
  "POST /rest/api/3/workflowscheme/{id}/createdraft": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission."
    }
  },
  "GET /rest/api/3/workflowscheme/{id}/default": {
    "path": [
      "id"
    ],
    "query": [
      "returnDraftIfExists"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme is not found."
    }
  },
  "PUT /rest/api/3/workflowscheme/{id}/default": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the workflow scheme cannot be edited and `updateDraftIfNeeded` is not `true`.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme is not found."
    }
  },
  "DELETE /rest/api/3/workflowscheme/{id}/default": {
    "path": [
      "id"
    ],
    "query": [
      "updateDraftIfNeeded"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the workflow scheme cannot be edited and `updateDraftIfNeeded` is not `true`.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme is not found."
    }
  },
  "GET /rest/api/3/workflowscheme/{id}/draft": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the original active workflow scheme is not found.\n *  the original active workflow scheme does not have a draft."
    }
  },
  "PUT /rest/api/3/workflowscheme/{id}/draft": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if:\n\n *  the original active workflow scheme is not found.\n *  the original active workflow scheme does not have a draft."
    }
  },
  "DELETE /rest/api/3/workflowscheme/{id}/draft": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission..",
      "404": "Returned if:\n\n *  the original active workflow scheme is not found.\n *  the original active workflow scheme does not have a draft."
    }
  },
  "GET /rest/api/3/workflowscheme/{id}/draft/default": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission..",
      "404": "Returned if any of the following is true:\n\n *  The workflow scheme is not found.\n *  The workflow scheme does not have a draft."
    }
  },
  "PUT /rest/api/3/workflowscheme/{id}/draft/default": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if any of the following is true:\n\n *  The workflow scheme is not found.\n *  The workflow scheme does not have a draft."
    }
  },
  "DELETE /rest/api/3/workflowscheme/{id}/draft/default": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if any of the following is true:\n\n *  The workflow scheme is not found.\n *  The workflow scheme does not have a draft."
    }
  },
  "GET /rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}": {
    "path": [
      "id",
      "issueType"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme or issue type is not found."
    }
  },
  "PUT /rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}": {
    "path": [
      "id",
      "issueType"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme or issue type is not found."
    }
  },
  "DELETE /rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}": {
    "path": [
      "id",
      "issueType"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme or issue type is not found."
    }
  },
  "POST /rest/api/3/workflowscheme/{id}/draft/publish": {
    "path": [
      "id"
    ],
    "query": [
      "validateOnly"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if any of these are true:\n\n *  The workflow scheme is not found.\n *  The workflow scheme does not have a draft.\n *  A new status in the draft workflow scheme is not found."
    }
  },
  "GET /rest/api/3/workflowscheme/{id}/draft/workflow": {
    "path": [
      "id"
    ],
    "query": [
      "workflowName"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if either the workflow scheme or workflow (if specified) is not found. session."
    }
  },
  "PUT /rest/api/3/workflowscheme/{id}/draft/workflow": {
    "path": [
      "id"
    ],
    "query": [
      "workflowName"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if any of the following is true:\n\n *  The workflow scheme is not found.\n *  The workflow scheme does not have a draft.\n *  The workflow is not found.\n *  The workflow is not specified."
    }
  },
  "DELETE /rest/api/3/workflowscheme/{id}/draft/workflow": {
    "path": [
      "id"
    ],
    "query": [
      "workflowName"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if any of the following is true:\n\n *  The workflow scheme is not found.\n *  The workflow scheme does not have a draft.\n *  The workflow is not found.\n *  The workflow is not specified."
    }
  },
  "GET /rest/api/3/workflowscheme/{id}/issuetype/{issueType}": {
    "path": [
      "id",
      "issueType"
    ],
    "query": [
      "returnDraftIfExists"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme or issue type is not found."
    }
  },
  "PUT /rest/api/3/workflowscheme/{id}/issuetype/{issueType}": {
    "path": [
      "id",
      "issueType"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the workflow cannot be edited and `updateDraftIfNeeded` is false.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme or issue type is not found."
    }
  },
  "DELETE /rest/api/3/workflowscheme/{id}/issuetype/{issueType}": {
    "path": [
      "id",
      "issueType"
    ],
    "query": [
      "updateDraftIfNeeded"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the workflow cannot be edited and `updateDraftIfNeeded` is false.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if the workflow scheme or issue type is not found."
    }
  },
  "GET /rest/api/3/workflowscheme/{id}/workflow": {
    "path": [
      "id"
    ],
    "query": [
      "workflowName",
      "returnDraftIfExists"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if either the workflow scheme or workflow is not found."
    }
  },
  "PUT /rest/api/3/workflowscheme/{id}/workflow": {
    "path": [
      "id"
    ],
    "query": [
      "workflowName"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request is invalid.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if any of the following is true:\n\n *  The workflow scheme is not found.\n *  The workflow is not found.\n *  The workflow is not specified."
    }
  },
  "DELETE /rest/api/3/workflowscheme/{id}/workflow": {
    "path": [
      "id"
    ],
    "query": [
      "workflowName",
      "updateDraftIfNeeded"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the workflow cannot be edited and `updateDraftIfNeeded` is not true.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "403": "Returned if the user does not have the necessary permission.",
      "404": "Returned if any of the following is true:\n\n *  The workflow scheme is not found.\n *  The workflow is not found.\n *  The workflow is not specified."
    }
  },
  "GET /rest/api/3/worklog/deleted": {
    "path": [],
    "query": [
      "since"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "POST /rest/api/3/worklog/list": {
    "path": [],
    "query": [
      "expand"
    ],
    "headers": [],
    "errors": {
      "400": "Returned if the request contains more than 1000 worklog IDs or is empty.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/api/3/worklog/updated": {
    "path": [],
    "query": [
      "since",
      "expand"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/atlassian-connect/1/addons/{addonKey}/properties": {
    "path": [
      "addonKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "GET /rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}": {
    "path": [
      "addonKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the property key is longer than 127 characters.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the property is not found or doesn't belong to the app."
    }
  },
  "PUT /rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}": {
    "path": [
      "addonKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n  * the property key is longer than 127 characters.\n  * the value is not valid JSON.\n  * the value is longer than 32768 characters.",
      "401": "Returned if the authentication credentials are incorrect or missing."
    }
  },
  "DELETE /rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}": {
    "path": [
      "addonKey",
      "propertyKey"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if the property key is longer than 127 characters.",
      "401": "Returned if the authentication credentials are incorrect or missing.",
      "404": "Returned if the property is not found or doesn't belong to the app."
    }
  },
  "GET /rest/atlassian-connect/1/app/module/dynamic": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Returned if the call is not from a Connect app."
    }
  },
  "POST /rest/atlassian-connect/1/app/module/dynamic": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Returned if:\n* any of the provided modules is invalid. For example, required properties are missing.\n* any of the modules conflict with registered dynamic modules or modules defined in the app descriptor. For example, there are duplicate keys.\n\nDetails of the issues encountered are included in the error message.",
      "401": "Returned if the call is not from a Connect app."
    }
  },
  "DELETE /rest/atlassian-connect/1/app/module/dynamic": {
    "path": [],
    "query": [
      "moduleKey"
    ],
    "headers": [],
    "errors": {
      "401": "Returned if the call is not from a Connect app."
    }
  },
  "PUT /rest/atlassian-connect/1/migration/field": {
    "path": [],
    "query": [],
    "headers": [
      "Atlassian-Transfer-Id"
    ],
    "errors": {
      "400": "Returned if the request is invalid.",
      "403": "Returned if:\n* the transfer ID is not found.\n* the authorisation credentials are incorrect or missing."
    }
  },
  "PUT /rest/atlassian-connect/1/migration/properties/{entityType}": {
    "path": [
      "entityType"
    ],
    "query": [],
    "headers": [
      "Atlassian-Transfer-Id"
    ],
    "errors": {
      "400": "Returned if the request is not valid.",
      "403": "Returned if the authorisation credentials are incorrect or missing."
    }
  },
  "POST /rest/atlassian-connect/1/migration/workflow/rule/search": {
    "path": [],
    "query": [],
    "headers": [
      "Atlassian-Transfer-Id"
    ],
    "errors": {
      "400": "Returned if the request is not valid.",
      "403": "Returned if the authorisation credentials are incorrect or missing."
    }
  }
}

export class JiraService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('JIRA_BASE_URL') as string
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
        default: throw new Error(`Jira API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
