// Issue notification schemes — This resource represents notification schemes, lists of events and the recipients who will receive notifications for those events. Use it to get details of a notification scheme and a list of notification schemes. ### About notification schemes ### A notification scheme is a list of events and recipients who will receive notifications for those events. The list is contained within the `notificationSchemeEvents` object and contains pairs of `events` and `notifications`: * `event` Identifies the type of event. The events can be [Jira system events](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or [custom events](https://confluence.atlassian.com/x/AIlKLg). * `notifications` Identifies the [recipients](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-recipientsRecipients) of notifications for each event. Recipients can be any of the following types: * `CurrentAssignee` * `Reporter` * `CurrentUser` * `ProjectLead` * `ComponentLead` * `User` (the `parameter` is the user key) * `Group` (the `parameter` is the group name) * `ProjectRole` (the `parameter` is the project role ID) * `EmailAddress` * `AllWatchers` * `UserCustomField` (the `parameter` is the ID of the custom field) * `GroupCustomField`(the `parameter` is the ID of the custom field)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetNotificationSchemeInput = z.object({
  id: z.number().int().describe("The ID of the notification scheme. Use [Get notification schemes paginated](#api-rest-api-3-notificationscheme-get) to get a list of notification scheme IDs."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `all` Returns all expandable information\n *  `field` Returns information about any custom fields assigned to receive an event\n *  `group` Returns information about any groups assigned to receive an event\n *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information\n *  `projectRole` Returns information about any project roles assigned to receive an event\n *  `user` Returns information about any users assigned to receive an event"),
})

export const GetNotificationSchemeOutput = z.object({
  description: z.string().optional().describe("The description of the notification scheme."),
  expand: z.string().optional().describe("Expand options that include additional notification scheme details in the response."),
  id: z.number().int().optional().describe("The ID of the notification scheme."),
  name: z.string().optional().describe("The name of the notification scheme."),
  notificationSchemeEvents: z.array(z.object({
    event: z.object({
      description: z.string().optional().describe("The description of the event."),
      id: z.number().int().optional().describe("The ID of the event. The event can be a [Jira system event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or a [custom event](https://confluence.atlassian.com/x/AIlKLg)."),
      name: z.string().optional().describe("The name of the event."),
      templateEvent: z.object({
        description: z.string().optional().describe("The description of the event."),
        id: z.number().int().optional().describe("The ID of the event. The event can be a [Jira system event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or a [custom event](https://confluence.atlassian.com/x/AIlKLg)."),
        name: z.string().optional().describe("The name of the event."),
        templateEvent: z.any().optional().describe("The template of the event. Only custom events configured by Jira administrators have template."),
      }).optional().describe("The template of the event. Only custom events configured by Jira administrators have template."),
    }).optional().describe("Details about a notification event."),
    notifications: z.array(z.object({
      emailAddress: z.string().optional().describe("The email address."),
      expand: z.string().optional().describe("Expand options that include additional event notification details in the response."),
      field: z.object({
        clauseNames: z.array(z.string()).optional().describe("The names that can be used to reference the field in an advanced search. For more information, see [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ)."),
        custom: z.boolean().optional().describe("Whether the field is a custom field."),
        id: z.string().optional().describe("The ID of the field."),
        key: z.string().optional().describe("The key of the field."),
        name: z.string().optional().describe("The name of the field."),
        navigable: z.boolean().optional().describe("Whether the field can be used as a column on the issue navigator."),
        orderable: z.boolean().optional().describe("Whether the content of the field can be used to order lists."),
        schema: z.object({
          configuration: z.record(z.string(), z.unknown()).optional().describe("If the field is a custom field, the configuration of the field."),
          custom: z.string().optional().describe("If the field is a custom field, the URI of the field."),
          customId: z.number().int().optional().describe("If the field is a custom field, the custom ID of the field."),
          items: z.string().optional().describe("When the data type is an array, the name of the field items within the array."),
          system: z.string().optional().describe("If the field is a system field, the name of the field."),
          type: z.string().describe("The data type of the field."),
        }).optional().describe("The data schema for the field."),
        scope: z.object({
          project: z.object({
            avatarUrls: z.object({
              "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
              "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
              "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
              "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
            }).optional().describe("The URLs of the project's avatars."),
            id: z.string().optional().describe("The ID of the project."),
            key: z.string().optional().describe("The key of the project."),
            name: z.string().optional().describe("The name of the project."),
            projectCategory: z.object({
              description: z.string().optional().describe("The name of the project category."),
              id: z.string().optional().describe("The ID of the project category."),
              name: z.string().optional().describe("The description of the project category."),
              self: z.string().optional().describe("The URL of the project category."),
            }).optional().describe("The category the project belongs to."),
            projectTypeKey: z.enum(["software", "service_desk", "business"]).optional().describe("The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project."),
            self: z.string().optional().describe("The URL of the project details."),
            simplified: z.boolean().optional().describe("Whether or not the project is simplified."),
          }).optional().describe("The project the item has scope in."),
          type: z.enum(["PROJECT", "TEMPLATE"]).optional().describe("The type of scope."),
        }).optional().describe("The scope of the field."),
        searchable: z.boolean().optional().describe("Whether the content of the field can be searched."),
      }).optional().describe("The custom user or group field."),
      group: z.object({
        groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
        name: z.string().optional().describe("The name of group."),
        self: z.string().url().optional().describe("The URL for these group details."),
      }).optional().describe("The specified group."),
      id: z.number().int().optional().describe("The ID of the notification."),
      notificationType: z.enum(["CurrentAssignee", "Reporter", "CurrentUser", "ProjectLead", "ComponentLead", "User", "Group", "ProjectRole", "EmailAddress", "AllWatchers", "UserCustomField", "GroupCustomField"]).optional().describe("Identifies the recipients of the notification."),
      parameter: z.string().optional().describe("As a group's name can change, use of `recipient` is recommended. The identifier associated with the `notificationType` value that defines the receiver of the notification, where the receiver isn't implied by `notificationType` value. So, when `notificationType` is:\n\n *  `User` The `parameter` is the user account ID.\n *  `Group` The `parameter` is the group name.\n *  `ProjectRole` The `parameter` is the project role ID.\n *  `UserCustomField` The `parameter` is the ID of the custom field.\n *  `GroupCustomField` The `parameter` is the ID of the custom field."),
      projectRole: z.object({
        actors: z.array(z.object({
          actorGroup: z.object({
            displayName: z.string().optional().describe("The display name of the group."),
            groupId: z.string().optional().describe("The ID of the group."),
            name: z.string().optional().describe("The name of the group. As a group's name can change, use of `groupId` is recommended to identify the group."),
          }).optional(),
          actorUser: z.object({
            accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Returns *unknown* if the record is deleted and corrupted, for example, as the result of a server import."),
          }).optional(),
          avatarUrl: z.string().url().optional().describe("The avatar of the role actor."),
          displayName: z.string().optional().describe("The display name of the role actor. For users, depending on the user’s privacy setting, this may return an alternative value for the user's name."),
          id: z.number().int().optional().describe("The ID of the role actor."),
          name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
          type: z.enum(["atlassian-group-role-actor", "atlassian-user-role-actor"]).optional().describe("The type of role actor."),
        })).optional().describe("The list of users who act in this role."),
        admin: z.boolean().optional().describe("Whether this role is the admin role for the project."),
        currentUserRole: z.boolean().optional().describe("Whether the calling user is part of this role."),
        default: z.boolean().optional().describe("Whether this role is the default role for the project"),
        description: z.string().optional().describe("The description of the project role."),
        id: z.number().int().optional().describe("The ID of the project role."),
        name: z.string().optional().describe("The name of the project role."),
        roleConfigurable: z.boolean().optional().describe("Whether the roles are configurable for this project."),
        scope: z.object({
          project: z.object({
            avatarUrls: z.object({
              "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
              "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
              "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
              "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
            }).optional().describe("The URLs of the project's avatars."),
            id: z.string().optional().describe("The ID of the project."),
            key: z.string().optional().describe("The key of the project."),
            name: z.string().optional().describe("The name of the project."),
            projectCategory: z.object({
              description: z.string().optional().describe("The name of the project category."),
              id: z.string().optional().describe("The ID of the project category."),
              name: z.string().optional().describe("The description of the project category."),
              self: z.string().optional().describe("The URL of the project category."),
            }).optional().describe("The category the project belongs to."),
            projectTypeKey: z.enum(["software", "service_desk", "business"]).optional().describe("The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project."),
            self: z.string().optional().describe("The URL of the project details."),
            simplified: z.boolean().optional().describe("Whether or not the project is simplified."),
          }).optional().describe("The project the item has scope in."),
          type: z.enum(["PROJECT", "TEMPLATE"]).optional().describe("The type of scope."),
        }).optional().describe("The scope of the role. Indicated for roles associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO)."),
        self: z.string().url().optional().describe("The URL the project role details."),
        translatedName: z.string().optional().describe("The translated name of the project role."),
      }).optional().describe("The specified project role."),
      recipient: z.string().optional().describe("The identifier associated with the `notificationType` value that defines the receiver of the notification, where the receiver isn't implied by the `notificationType` value. So, when `notificationType` is:\n\n *  `User`, `recipient` is the user account ID.\n *  `Group`, `recipient` is the group ID.\n *  `ProjectRole`, `recipient` is the project role ID.\n *  `UserCustomField`, `recipient` is the ID of the custom field.\n *  `GroupCustomField`, `recipient` is the ID of the custom field."),
      user: z.object({
        accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
        accountType: z.string().optional().describe("The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user)"),
        active: z.boolean().optional().describe("Whether the user is active."),
        avatarUrls: z.object({
          "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
          "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
          "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
          "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
        }).optional().describe("The avatars of the user."),
        displayName: z.string().optional().describe("The display name of the user. Depending on the user’s privacy settings, this may return an alternative value."),
        emailAddress: z.string().optional().describe("The email address of the user. Depending on the user’s privacy settings, this may be returned as null."),
        key: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
        name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
        self: z.string().optional().describe("The URL of the user."),
        timeZone: z.string().optional().describe("The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null."),
      }).optional().describe("The specified user."),
    })).optional(),
  })).optional().describe("The notification events and associated recipients."),
  projects: z.array(z.number().int()).optional().describe("The list of project IDs associated with the notification scheme."),
  scope: z.object({
    project: z.object({
      avatarUrls: z.object({
        "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
        "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
        "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
        "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
      }).optional().describe("The URLs of the project's avatars."),
      id: z.string().optional().describe("The ID of the project."),
      key: z.string().optional().describe("The key of the project."),
      name: z.string().optional().describe("The name of the project."),
      projectCategory: z.object({
        description: z.string().optional().describe("The name of the project category."),
        id: z.string().optional().describe("The ID of the project category."),
        name: z.string().optional().describe("The description of the project category."),
        self: z.string().optional().describe("The URL of the project category."),
      }).optional().describe("The category the project belongs to."),
      projectTypeKey: z.enum(["software", "service_desk", "business"]).optional().describe("The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project."),
      self: z.string().optional().describe("The URL of the project details."),
      simplified: z.boolean().optional().describe("Whether or not the project is simplified."),
    }).optional().describe("The project the item has scope in."),
    type: z.enum(["PROJECT", "TEMPLATE"]).optional().describe("The type of scope."),
  }).optional().describe("The scope of the notification scheme."),
  self: z.string().optional(),
}).describe("Details about a notification scheme.")

export const getNotificationScheme = pikkuSessionlessFunc({
  description: "Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg), including the list of events and the recipients who will receive notifications for those events.\n\n**[Permissions](#permissions) required:** Permission to access Jira, however, the user must have permission to administer at least one project associated with the notification scheme.",
  input: GetNotificationSchemeInput,
  output: GetNotificationSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/notificationscheme/{id}", data) as any
  },
})
