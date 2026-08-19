import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderCreateChildFolderInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  childFolderCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of immediate child mailFolders in the current mailFolder."),
  displayName: z.string().nullable().optional().describe("The mailFolder's display name."),
  isHidden: z.boolean().nullable().optional().describe("Indicates whether the mailFolder is hidden. This property can be set only when creating the folder. Find more information in Hidden mail folders."),
  parentFolderId: z.string().nullable().optional().describe("The unique identifier for the mailFolder's parent mailFolder."),
  totalItemCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of items in the mailFolder."),
  unreadItemCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of items in the mailFolder marked as unread."),
  childFolders: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    childFolderCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of immediate child mailFolders in the current mailFolder."),
    displayName: z.string().nullable().optional().describe("The mailFolder's display name."),
    isHidden: z.boolean().nullable().optional().describe("Indicates whether the mailFolder is hidden. This property can be set only when creating the folder. Find more information in Hidden mail folders."),
    parentFolderId: z.string().nullable().optional().describe("The unique identifier for the mailFolder's parent mailFolder."),
    totalItemCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of items in the mailFolder."),
    unreadItemCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of items in the mailFolder marked as unread."),
    childFolders: z.any().optional().describe("The collection of child folders in the mailFolder."),
    messageRules: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      actions: z.object({
        assignCategories: z.array(z.string()).optional().describe("A list of categories to be assigned to a message."),
        copyToFolder: z.string().nullable().optional().describe("The ID of a folder that a message is to be copied to."),
        delete: z.boolean().nullable().optional().describe("Indicates whether a message should be moved to the Deleted Items folder."),
        forwardAsAttachmentTo: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("The email addresses of the recipients to which a message should be forwarded as an attachment."),
        forwardTo: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("The email addresses of the recipients to which a message should be forwarded."),
        markAsRead: z.boolean().nullable().optional().describe("Indicates whether a message should be marked as read."),
        markImportance: z.enum(["low", "normal", "high"]).optional(),
        moveToFolder: z.string().nullable().optional().describe("The ID of the folder that a message will be moved to."),
        permanentDelete: z.boolean().nullable().optional().describe("Indicates whether a message should be permanently deleted and not saved to the Deleted Items folder."),
        redirectTo: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("The email addresses to which a message should be redirected."),
        stopProcessingRules: z.boolean().nullable().optional().describe("Indicates whether subsequent rules should be evaluated."),
      }).optional(),
      conditions: z.object({
        bodyContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body of an incoming message in order for the condition or exception to apply."),
        bodyOrSubjectContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body or subject of an incoming message in order for the condition or exception to apply."),
        categories: z.array(z.string()).optional().describe("Represents the categories that an incoming message should be labeled with in order for the condition or exception to apply."),
        fromAddresses: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply."),
        hasAttachments: z.boolean().nullable().optional().describe("Indicates whether an incoming message must have attachments in order for the condition or exception to apply."),
        headerContains: z.array(z.string()).optional().describe("Represents the strings that appear in the headers of an incoming message in order for the condition or exception to apply."),
        importance: z.enum(["low", "normal", "high"]).optional(),
        isApprovalRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an approval request in order for the condition or exception to apply."),
        isAutomaticForward: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply."),
        isAutomaticReply: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply."),
        isEncrypted: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be encrypted in order for the condition or exception to apply."),
        isMeetingRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply."),
        isMeetingResponse: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply."),
        isNonDeliveryReport: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply."),
        isPermissionControlled: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or exception to apply."),
        isReadReceipt: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply."),
        isSigned: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply."),
        isVoicemail: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply."),
        messageActionFlag: z.enum(["any", "call", "doNotForward", "followUp", "fyi", "forward", "noResponseNecessary", "read", "reply", "replyToAll", "review"]).optional(),
        notSentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or exception to apply."),
        recipientContains: z.array(z.string()).optional().describe("Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in order for the condition or exception to apply."),
        senderContains: z.array(z.string()).optional().describe("Represents the strings that appear in the from property of an incoming message in order for the condition or exception to apply."),
        sensitivity: z.enum(["normal", "personal", "private", "confidential"]).optional(),
        sentCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the condition or exception to apply."),
        sentOnlyToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition or exception to apply."),
        sentToAddresses: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("Represents the email addresses that an incoming message must have been sent to in order for the condition or exception to apply."),
        sentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the condition or exception to apply."),
        sentToOrCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming message in order for the condition or exception to apply."),
        subjectContains: z.array(z.string()).optional().describe("Represents the strings that appear in the subject of an incoming message in order for the condition or exception to apply."),
        withinSizeRange: z.object({
          maximumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
          minimumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
        }).optional(),
      }).optional(),
      displayName: z.string().nullable().optional().describe("The display name of the rule."),
      exceptions: z.object({
        bodyContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body of an incoming message in order for the condition or exception to apply."),
        bodyOrSubjectContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body or subject of an incoming message in order for the condition or exception to apply."),
        categories: z.array(z.string()).optional().describe("Represents the categories that an incoming message should be labeled with in order for the condition or exception to apply."),
        fromAddresses: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply."),
        hasAttachments: z.boolean().nullable().optional().describe("Indicates whether an incoming message must have attachments in order for the condition or exception to apply."),
        headerContains: z.array(z.string()).optional().describe("Represents the strings that appear in the headers of an incoming message in order for the condition or exception to apply."),
        importance: z.enum(["low", "normal", "high"]).optional(),
        isApprovalRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an approval request in order for the condition or exception to apply."),
        isAutomaticForward: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply."),
        isAutomaticReply: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply."),
        isEncrypted: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be encrypted in order for the condition or exception to apply."),
        isMeetingRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply."),
        isMeetingResponse: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply."),
        isNonDeliveryReport: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply."),
        isPermissionControlled: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or exception to apply."),
        isReadReceipt: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply."),
        isSigned: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply."),
        isVoicemail: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply."),
        messageActionFlag: z.enum(["any", "call", "doNotForward", "followUp", "fyi", "forward", "noResponseNecessary", "read", "reply", "replyToAll", "review"]).optional(),
        notSentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or exception to apply."),
        recipientContains: z.array(z.string()).optional().describe("Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in order for the condition or exception to apply."),
        senderContains: z.array(z.string()).optional().describe("Represents the strings that appear in the from property of an incoming message in order for the condition or exception to apply."),
        sensitivity: z.enum(["normal", "personal", "private", "confidential"]).optional(),
        sentCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the condition or exception to apply."),
        sentOnlyToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition or exception to apply."),
        sentToAddresses: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("Represents the email addresses that an incoming message must have been sent to in order for the condition or exception to apply."),
        sentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the condition or exception to apply."),
        sentToOrCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming message in order for the condition or exception to apply."),
        subjectContains: z.array(z.string()).optional().describe("Represents the strings that appear in the subject of an incoming message in order for the condition or exception to apply."),
        withinSizeRange: z.object({
          maximumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
          minimumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
        }).optional(),
      }).optional(),
      hasError: z.boolean().nullable().optional().describe("Indicates whether the rule is in an error condition. Read-only."),
      isEnabled: z.boolean().nullable().optional().describe("Indicates whether the rule is enabled to be applied to messages."),
      isReadOnly: z.boolean().nullable().optional().describe("Indicates if the rule is read-only and cannot be modified or deleted by the rules REST API."),
      sequence: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("Indicates the order in which the rule is executed, among other rules."),
    })).optional().describe("The collection of rules that apply to the user's Inbox folder."),
    messages: z.array(z.object({
      bccRecipients: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The Bcc: recipients for the message."),
      body: z.object({
        content: z.string().nullable().optional().describe("The content of the item."),
        contentType: z.enum(["text", "html"]).optional(),
      }).optional(),
      bodyPreview: z.string().nullable().optional().describe("The first 255 characters of the message body. It is in text format."),
      ccRecipients: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The Cc: recipients for the message."),
      conversationId: z.string().nullable().optional().describe("The ID of the conversation the email belongs to."),
      conversationIndex: z.string().nullable().optional().describe("Indicates the position of the message within the conversation."),
      flag: z.object({
        completedDateTime: z.object({
          dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
          timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
        }).optional(),
        dueDateTime: z.object({
          dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
          timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
        }).optional(),
        flagStatus: z.enum(["notFlagged", "complete", "flagged"]).optional(),
        startDateTime: z.object({
          dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
          timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
        }).optional(),
      }).optional(),
      from: z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      }).optional(),
      hasAttachments: z.boolean().nullable().optional().describe("Indicates whether the message has attachments. This property doesn't include inline attachments, so if a message contains only inline attachments, this property is false. To verify the existence of inline attachments, parse the body property to look for a src attribute, such as <IMG src='cid:image001.jpg@01D26CD8.6C05F070'>."),
      importance: z.enum(["low", "normal", "high"]).optional(),
      inferenceClassification: z.enum(["focused", "other"]).optional(),
      internetMessageHeaders: z.array(z.object({
        name: z.string().nullable().optional().describe("Represents the key in a key-value pair."),
        value: z.string().nullable().optional().describe("The value in a key-value pair."),
      })).optional().describe("A collection of message headers defined by RFC5322. The set includes message headers indicating the network path taken by a message from the sender to the recipient. It can also contain custom message headers that hold app data for the message.  Requires $select to retrieve. Read-only."),
      internetMessageId: z.string().nullable().optional().describe("The message ID in the format specified by RFC2822."),
      isDeliveryReceiptRequested: z.boolean().nullable().optional().describe("Indicates whether a read receipt is requested for the message."),
      isDraft: z.boolean().nullable().optional().describe("Indicates whether the message is a draft. A message is a draft if it hasn't been sent yet."),
      isRead: z.boolean().nullable().optional().describe("Indicates whether the message has been read."),
      isReadReceiptRequested: z.boolean().nullable().optional().describe("Indicates whether a read receipt is requested for the message."),
      parentFolderId: z.string().nullable().optional().describe("The unique identifier for the message's parent mailFolder."),
      receivedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time the message was received.  The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
      replyTo: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The email addresses to use when replying."),
      sender: z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      }).optional(),
      sentDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time the message was sent.  The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
      subject: z.string().nullable().optional().describe("The subject of the message."),
      toRecipients: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The To: recipients for the message."),
      uniqueBody: z.object({
        content: z.string().nullable().optional().describe("The content of the item."),
        contentType: z.enum(["text", "html"]).optional(),
      }).optional(),
      webLink: z.string().nullable().optional().describe("The URL to open the message in Outlook on the web.You can append an ispopout argument to the end of the URL to change how the message is displayed. If ispopout is not present or if it is set to 1, then the message is shown in a popout window. If ispopout is set to 0, the browser shows the message in the Outlook on the web review pane.The message opens in the browser if you are signed in to your mailbox via Outlook on the web. You are prompted to sign in if you are not already signed in with the browser.This URL cannot be accessed from within an iFrame.NOTE: When using this URL to access a message from a mailbox with delegate permissions, both the signed-in user and the target mailbox must be in the same database region. For example, an error is returned when a user with a mailbox in the EUR (Europe) region attempts to access messages from a mailbox in the NAM (North America) region."),
      attachments: z.array(z.object({
        id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
        contentType: z.string().nullable().optional().describe("The MIME type."),
        isInline: z.boolean().optional().describe("true if the attachment is an inline attachment; otherwise, false."),
        lastModifiedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z"),
        name: z.string().nullable().optional().describe("The attachment's file name."),
        size: z.number().min(-2147483648).max(2147483647).optional().describe("The length of the attachment in bytes."),
      })).optional().describe("The fileAttachment and itemAttachment attachments for the message."),
      extensions: z.array(z.object({
        id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      })).optional().describe("The collection of open extensions defined for the message. Nullable."),
      multiValueExtendedProperties: z.array(z.object({
        id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
        value: z.array(z.string()).optional().describe("A collection of property values."),
      })).optional().describe("The collection of multi-value extended properties defined for the message. Nullable."),
      singleValueExtendedProperties: z.array(z.object({
        id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
        value: z.string().nullable().optional().describe("A property value."),
      })).optional().describe("The collection of single-value extended properties defined for the message. Nullable."),
    })).optional().describe("The collection of messages in the mailFolder."),
    multiValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.array(z.string()).optional().describe("A collection of property values."),
    })).optional().describe("The collection of multi-value extended properties defined for the mailFolder. Read-only. Nullable."),
    singleValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.string().nullable().optional().describe("A property value."),
    })).optional().describe("The collection of single-value extended properties defined for the mailFolder. Read-only. Nullable."),
  })).optional().describe("The collection of child folders in the mailFolder."),
  messageRules: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    actions: z.object({
      assignCategories: z.array(z.string()).optional().describe("A list of categories to be assigned to a message."),
      copyToFolder: z.string().nullable().optional().describe("The ID of a folder that a message is to be copied to."),
      delete: z.boolean().nullable().optional().describe("Indicates whether a message should be moved to the Deleted Items folder."),
      forwardAsAttachmentTo: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The email addresses of the recipients to which a message should be forwarded as an attachment."),
      forwardTo: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The email addresses of the recipients to which a message should be forwarded."),
      markAsRead: z.boolean().nullable().optional().describe("Indicates whether a message should be marked as read."),
      markImportance: z.enum(["low", "normal", "high"]).optional(),
      moveToFolder: z.string().nullable().optional().describe("The ID of the folder that a message will be moved to."),
      permanentDelete: z.boolean().nullable().optional().describe("Indicates whether a message should be permanently deleted and not saved to the Deleted Items folder."),
      redirectTo: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The email addresses to which a message should be redirected."),
      stopProcessingRules: z.boolean().nullable().optional().describe("Indicates whether subsequent rules should be evaluated."),
    }).optional(),
    conditions: z.object({
      bodyContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body of an incoming message in order for the condition or exception to apply."),
      bodyOrSubjectContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body or subject of an incoming message in order for the condition or exception to apply."),
      categories: z.array(z.string()).optional().describe("Represents the categories that an incoming message should be labeled with in order for the condition or exception to apply."),
      fromAddresses: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply."),
      hasAttachments: z.boolean().nullable().optional().describe("Indicates whether an incoming message must have attachments in order for the condition or exception to apply."),
      headerContains: z.array(z.string()).optional().describe("Represents the strings that appear in the headers of an incoming message in order for the condition or exception to apply."),
      importance: z.enum(["low", "normal", "high"]).optional(),
      isApprovalRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an approval request in order for the condition or exception to apply."),
      isAutomaticForward: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply."),
      isAutomaticReply: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply."),
      isEncrypted: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be encrypted in order for the condition or exception to apply."),
      isMeetingRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply."),
      isMeetingResponse: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply."),
      isNonDeliveryReport: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply."),
      isPermissionControlled: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or exception to apply."),
      isReadReceipt: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply."),
      isSigned: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply."),
      isVoicemail: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply."),
      messageActionFlag: z.enum(["any", "call", "doNotForward", "followUp", "fyi", "forward", "noResponseNecessary", "read", "reply", "replyToAll", "review"]).optional(),
      notSentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or exception to apply."),
      recipientContains: z.array(z.string()).optional().describe("Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in order for the condition or exception to apply."),
      senderContains: z.array(z.string()).optional().describe("Represents the strings that appear in the from property of an incoming message in order for the condition or exception to apply."),
      sensitivity: z.enum(["normal", "personal", "private", "confidential"]).optional(),
      sentCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the condition or exception to apply."),
      sentOnlyToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition or exception to apply."),
      sentToAddresses: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("Represents the email addresses that an incoming message must have been sent to in order for the condition or exception to apply."),
      sentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the condition or exception to apply."),
      sentToOrCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming message in order for the condition or exception to apply."),
      subjectContains: z.array(z.string()).optional().describe("Represents the strings that appear in the subject of an incoming message in order for the condition or exception to apply."),
      withinSizeRange: z.object({
        maximumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
        minimumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
      }).optional(),
    }).optional(),
    displayName: z.string().nullable().optional().describe("The display name of the rule."),
    exceptions: z.object({
      bodyContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body of an incoming message in order for the condition or exception to apply."),
      bodyOrSubjectContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body or subject of an incoming message in order for the condition or exception to apply."),
      categories: z.array(z.string()).optional().describe("Represents the categories that an incoming message should be labeled with in order for the condition or exception to apply."),
      fromAddresses: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply."),
      hasAttachments: z.boolean().nullable().optional().describe("Indicates whether an incoming message must have attachments in order for the condition or exception to apply."),
      headerContains: z.array(z.string()).optional().describe("Represents the strings that appear in the headers of an incoming message in order for the condition or exception to apply."),
      importance: z.enum(["low", "normal", "high"]).optional(),
      isApprovalRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an approval request in order for the condition or exception to apply."),
      isAutomaticForward: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply."),
      isAutomaticReply: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply."),
      isEncrypted: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be encrypted in order for the condition or exception to apply."),
      isMeetingRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply."),
      isMeetingResponse: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply."),
      isNonDeliveryReport: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply."),
      isPermissionControlled: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or exception to apply."),
      isReadReceipt: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply."),
      isSigned: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply."),
      isVoicemail: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply."),
      messageActionFlag: z.enum(["any", "call", "doNotForward", "followUp", "fyi", "forward", "noResponseNecessary", "read", "reply", "replyToAll", "review"]).optional(),
      notSentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or exception to apply."),
      recipientContains: z.array(z.string()).optional().describe("Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in order for the condition or exception to apply."),
      senderContains: z.array(z.string()).optional().describe("Represents the strings that appear in the from property of an incoming message in order for the condition or exception to apply."),
      sensitivity: z.enum(["normal", "personal", "private", "confidential"]).optional(),
      sentCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the condition or exception to apply."),
      sentOnlyToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition or exception to apply."),
      sentToAddresses: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("Represents the email addresses that an incoming message must have been sent to in order for the condition or exception to apply."),
      sentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the condition or exception to apply."),
      sentToOrCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming message in order for the condition or exception to apply."),
      subjectContains: z.array(z.string()).optional().describe("Represents the strings that appear in the subject of an incoming message in order for the condition or exception to apply."),
      withinSizeRange: z.object({
        maximumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
        minimumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
      }).optional(),
    }).optional(),
    hasError: z.boolean().nullable().optional().describe("Indicates whether the rule is in an error condition. Read-only."),
    isEnabled: z.boolean().nullable().optional().describe("Indicates whether the rule is enabled to be applied to messages."),
    isReadOnly: z.boolean().nullable().optional().describe("Indicates if the rule is read-only and cannot be modified or deleted by the rules REST API."),
    sequence: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("Indicates the order in which the rule is executed, among other rules."),
  })).optional().describe("The collection of rules that apply to the user's Inbox folder."),
  messages: z.array(z.object({
    bccRecipients: z.array(z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    })).optional().describe("The Bcc: recipients for the message."),
    body: z.object({
      content: z.string().nullable().optional().describe("The content of the item."),
      contentType: z.enum(["text", "html"]).optional(),
    }).optional(),
    bodyPreview: z.string().nullable().optional().describe("The first 255 characters of the message body. It is in text format."),
    ccRecipients: z.array(z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    })).optional().describe("The Cc: recipients for the message."),
    conversationId: z.string().nullable().optional().describe("The ID of the conversation the email belongs to."),
    conversationIndex: z.string().nullable().optional().describe("Indicates the position of the message within the conversation."),
    flag: z.object({
      completedDateTime: z.object({
        dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
        timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
      }).optional(),
      dueDateTime: z.object({
        dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
        timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
      }).optional(),
      flagStatus: z.enum(["notFlagged", "complete", "flagged"]).optional(),
      startDateTime: z.object({
        dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
        timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
      }).optional(),
    }).optional(),
    from: z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    }).optional(),
    hasAttachments: z.boolean().nullable().optional().describe("Indicates whether the message has attachments. This property doesn't include inline attachments, so if a message contains only inline attachments, this property is false. To verify the existence of inline attachments, parse the body property to look for a src attribute, such as <IMG src='cid:image001.jpg@01D26CD8.6C05F070'>."),
    importance: z.enum(["low", "normal", "high"]).optional(),
    inferenceClassification: z.enum(["focused", "other"]).optional(),
    internetMessageHeaders: z.array(z.object({
      name: z.string().nullable().optional().describe("Represents the key in a key-value pair."),
      value: z.string().nullable().optional().describe("The value in a key-value pair."),
    })).optional().describe("A collection of message headers defined by RFC5322. The set includes message headers indicating the network path taken by a message from the sender to the recipient. It can also contain custom message headers that hold app data for the message.  Requires $select to retrieve. Read-only."),
    internetMessageId: z.string().nullable().optional().describe("The message ID in the format specified by RFC2822."),
    isDeliveryReceiptRequested: z.boolean().nullable().optional().describe("Indicates whether a read receipt is requested for the message."),
    isDraft: z.boolean().nullable().optional().describe("Indicates whether the message is a draft. A message is a draft if it hasn't been sent yet."),
    isRead: z.boolean().nullable().optional().describe("Indicates whether the message has been read."),
    isReadReceiptRequested: z.boolean().nullable().optional().describe("Indicates whether a read receipt is requested for the message."),
    parentFolderId: z.string().nullable().optional().describe("The unique identifier for the message's parent mailFolder."),
    receivedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time the message was received.  The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
    replyTo: z.array(z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    })).optional().describe("The email addresses to use when replying."),
    sender: z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    }).optional(),
    sentDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time the message was sent.  The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
    subject: z.string().nullable().optional().describe("The subject of the message."),
    toRecipients: z.array(z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    })).optional().describe("The To: recipients for the message."),
    uniqueBody: z.object({
      content: z.string().nullable().optional().describe("The content of the item."),
      contentType: z.enum(["text", "html"]).optional(),
    }).optional(),
    webLink: z.string().nullable().optional().describe("The URL to open the message in Outlook on the web.You can append an ispopout argument to the end of the URL to change how the message is displayed. If ispopout is not present or if it is set to 1, then the message is shown in a popout window. If ispopout is set to 0, the browser shows the message in the Outlook on the web review pane.The message opens in the browser if you are signed in to your mailbox via Outlook on the web. You are prompted to sign in if you are not already signed in with the browser.This URL cannot be accessed from within an iFrame.NOTE: When using this URL to access a message from a mailbox with delegate permissions, both the signed-in user and the target mailbox must be in the same database region. For example, an error is returned when a user with a mailbox in the EUR (Europe) region attempts to access messages from a mailbox in the NAM (North America) region."),
    attachments: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      contentType: z.string().nullable().optional().describe("The MIME type."),
      isInline: z.boolean().optional().describe("true if the attachment is an inline attachment; otherwise, false."),
      lastModifiedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z"),
      name: z.string().nullable().optional().describe("The attachment's file name."),
      size: z.number().min(-2147483648).max(2147483647).optional().describe("The length of the attachment in bytes."),
    })).optional().describe("The fileAttachment and itemAttachment attachments for the message."),
    extensions: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    })).optional().describe("The collection of open extensions defined for the message. Nullable."),
    multiValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.array(z.string()).optional().describe("A collection of property values."),
    })).optional().describe("The collection of multi-value extended properties defined for the message. Nullable."),
    singleValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.string().nullable().optional().describe("A property value."),
    })).optional().describe("The collection of single-value extended properties defined for the message. Nullable."),
  })).optional().describe("The collection of messages in the mailFolder."),
  multiValueExtendedProperties: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    value: z.array(z.string()).optional().describe("A collection of property values."),
  })).optional().describe("The collection of multi-value extended properties defined for the mailFolder. Read-only. Nullable."),
  singleValueExtendedProperties: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    value: z.string().nullable().optional().describe("A property value."),
  })).optional().describe("The collection of single-value extended properties defined for the mailFolder. Read-only. Nullable."),
}),
})

export const UserMailFolderCreateChildFolderOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  childFolderCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of immediate child mailFolders in the current mailFolder."),
  displayName: z.string().nullable().optional().describe("The mailFolder's display name."),
  isHidden: z.boolean().nullable().optional().describe("Indicates whether the mailFolder is hidden. This property can be set only when creating the folder. Find more information in Hidden mail folders."),
  parentFolderId: z.string().nullable().optional().describe("The unique identifier for the mailFolder's parent mailFolder."),
  totalItemCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of items in the mailFolder."),
  unreadItemCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of items in the mailFolder marked as unread."),
  childFolders: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    childFolderCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of immediate child mailFolders in the current mailFolder."),
    displayName: z.string().nullable().optional().describe("The mailFolder's display name."),
    isHidden: z.boolean().nullable().optional().describe("Indicates whether the mailFolder is hidden. This property can be set only when creating the folder. Find more information in Hidden mail folders."),
    parentFolderId: z.string().nullable().optional().describe("The unique identifier for the mailFolder's parent mailFolder."),
    totalItemCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of items in the mailFolder."),
    unreadItemCount: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The number of items in the mailFolder marked as unread."),
    childFolders: z.any().optional().describe("The collection of child folders in the mailFolder."),
    messageRules: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      actions: z.object({
        assignCategories: z.array(z.string()).optional().describe("A list of categories to be assigned to a message."),
        copyToFolder: z.string().nullable().optional().describe("The ID of a folder that a message is to be copied to."),
        delete: z.boolean().nullable().optional().describe("Indicates whether a message should be moved to the Deleted Items folder."),
        forwardAsAttachmentTo: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("The email addresses of the recipients to which a message should be forwarded as an attachment."),
        forwardTo: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("The email addresses of the recipients to which a message should be forwarded."),
        markAsRead: z.boolean().nullable().optional().describe("Indicates whether a message should be marked as read."),
        markImportance: z.enum(["low", "normal", "high"]).optional(),
        moveToFolder: z.string().nullable().optional().describe("The ID of the folder that a message will be moved to."),
        permanentDelete: z.boolean().nullable().optional().describe("Indicates whether a message should be permanently deleted and not saved to the Deleted Items folder."),
        redirectTo: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("The email addresses to which a message should be redirected."),
        stopProcessingRules: z.boolean().nullable().optional().describe("Indicates whether subsequent rules should be evaluated."),
      }).optional(),
      conditions: z.object({
        bodyContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body of an incoming message in order for the condition or exception to apply."),
        bodyOrSubjectContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body or subject of an incoming message in order for the condition or exception to apply."),
        categories: z.array(z.string()).optional().describe("Represents the categories that an incoming message should be labeled with in order for the condition or exception to apply."),
        fromAddresses: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply."),
        hasAttachments: z.boolean().nullable().optional().describe("Indicates whether an incoming message must have attachments in order for the condition or exception to apply."),
        headerContains: z.array(z.string()).optional().describe("Represents the strings that appear in the headers of an incoming message in order for the condition or exception to apply."),
        importance: z.enum(["low", "normal", "high"]).optional(),
        isApprovalRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an approval request in order for the condition or exception to apply."),
        isAutomaticForward: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply."),
        isAutomaticReply: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply."),
        isEncrypted: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be encrypted in order for the condition or exception to apply."),
        isMeetingRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply."),
        isMeetingResponse: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply."),
        isNonDeliveryReport: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply."),
        isPermissionControlled: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or exception to apply."),
        isReadReceipt: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply."),
        isSigned: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply."),
        isVoicemail: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply."),
        messageActionFlag: z.enum(["any", "call", "doNotForward", "followUp", "fyi", "forward", "noResponseNecessary", "read", "reply", "replyToAll", "review"]).optional(),
        notSentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or exception to apply."),
        recipientContains: z.array(z.string()).optional().describe("Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in order for the condition or exception to apply."),
        senderContains: z.array(z.string()).optional().describe("Represents the strings that appear in the from property of an incoming message in order for the condition or exception to apply."),
        sensitivity: z.enum(["normal", "personal", "private", "confidential"]).optional(),
        sentCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the condition or exception to apply."),
        sentOnlyToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition or exception to apply."),
        sentToAddresses: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("Represents the email addresses that an incoming message must have been sent to in order for the condition or exception to apply."),
        sentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the condition or exception to apply."),
        sentToOrCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming message in order for the condition or exception to apply."),
        subjectContains: z.array(z.string()).optional().describe("Represents the strings that appear in the subject of an incoming message in order for the condition or exception to apply."),
        withinSizeRange: z.object({
          maximumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
          minimumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
        }).optional(),
      }).optional(),
      displayName: z.string().nullable().optional().describe("The display name of the rule."),
      exceptions: z.object({
        bodyContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body of an incoming message in order for the condition or exception to apply."),
        bodyOrSubjectContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body or subject of an incoming message in order for the condition or exception to apply."),
        categories: z.array(z.string()).optional().describe("Represents the categories that an incoming message should be labeled with in order for the condition or exception to apply."),
        fromAddresses: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply."),
        hasAttachments: z.boolean().nullable().optional().describe("Indicates whether an incoming message must have attachments in order for the condition or exception to apply."),
        headerContains: z.array(z.string()).optional().describe("Represents the strings that appear in the headers of an incoming message in order for the condition or exception to apply."),
        importance: z.enum(["low", "normal", "high"]).optional(),
        isApprovalRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an approval request in order for the condition or exception to apply."),
        isAutomaticForward: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply."),
        isAutomaticReply: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply."),
        isEncrypted: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be encrypted in order for the condition or exception to apply."),
        isMeetingRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply."),
        isMeetingResponse: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply."),
        isNonDeliveryReport: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply."),
        isPermissionControlled: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or exception to apply."),
        isReadReceipt: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply."),
        isSigned: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply."),
        isVoicemail: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply."),
        messageActionFlag: z.enum(["any", "call", "doNotForward", "followUp", "fyi", "forward", "noResponseNecessary", "read", "reply", "replyToAll", "review"]).optional(),
        notSentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or exception to apply."),
        recipientContains: z.array(z.string()).optional().describe("Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in order for the condition or exception to apply."),
        senderContains: z.array(z.string()).optional().describe("Represents the strings that appear in the from property of an incoming message in order for the condition or exception to apply."),
        sensitivity: z.enum(["normal", "personal", "private", "confidential"]).optional(),
        sentCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the condition or exception to apply."),
        sentOnlyToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition or exception to apply."),
        sentToAddresses: z.array(z.object({
          emailAddress: z.object({
            address: z.string().nullable().optional().describe("The email address of the person or entity."),
            name: z.string().nullable().optional().describe("The display name of the person or entity."),
          }).optional(),
        })).optional().describe("Represents the email addresses that an incoming message must have been sent to in order for the condition or exception to apply."),
        sentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the condition or exception to apply."),
        sentToOrCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming message in order for the condition or exception to apply."),
        subjectContains: z.array(z.string()).optional().describe("Represents the strings that appear in the subject of an incoming message in order for the condition or exception to apply."),
        withinSizeRange: z.object({
          maximumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
          minimumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
        }).optional(),
      }).optional(),
      hasError: z.boolean().nullable().optional().describe("Indicates whether the rule is in an error condition. Read-only."),
      isEnabled: z.boolean().nullable().optional().describe("Indicates whether the rule is enabled to be applied to messages."),
      isReadOnly: z.boolean().nullable().optional().describe("Indicates if the rule is read-only and cannot be modified or deleted by the rules REST API."),
      sequence: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("Indicates the order in which the rule is executed, among other rules."),
    })).optional().describe("The collection of rules that apply to the user's Inbox folder."),
    messages: z.array(z.object({
      bccRecipients: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The Bcc: recipients for the message."),
      body: z.object({
        content: z.string().nullable().optional().describe("The content of the item."),
        contentType: z.enum(["text", "html"]).optional(),
      }).optional(),
      bodyPreview: z.string().nullable().optional().describe("The first 255 characters of the message body. It is in text format."),
      ccRecipients: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The Cc: recipients for the message."),
      conversationId: z.string().nullable().optional().describe("The ID of the conversation the email belongs to."),
      conversationIndex: z.string().nullable().optional().describe("Indicates the position of the message within the conversation."),
      flag: z.object({
        completedDateTime: z.object({
          dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
          timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
        }).optional(),
        dueDateTime: z.object({
          dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
          timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
        }).optional(),
        flagStatus: z.enum(["notFlagged", "complete", "flagged"]).optional(),
        startDateTime: z.object({
          dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
          timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
        }).optional(),
      }).optional(),
      from: z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      }).optional(),
      hasAttachments: z.boolean().nullable().optional().describe("Indicates whether the message has attachments. This property doesn't include inline attachments, so if a message contains only inline attachments, this property is false. To verify the existence of inline attachments, parse the body property to look for a src attribute, such as <IMG src='cid:image001.jpg@01D26CD8.6C05F070'>."),
      importance: z.enum(["low", "normal", "high"]).optional(),
      inferenceClassification: z.enum(["focused", "other"]).optional(),
      internetMessageHeaders: z.array(z.object({
        name: z.string().nullable().optional().describe("Represents the key in a key-value pair."),
        value: z.string().nullable().optional().describe("The value in a key-value pair."),
      })).optional().describe("A collection of message headers defined by RFC5322. The set includes message headers indicating the network path taken by a message from the sender to the recipient. It can also contain custom message headers that hold app data for the message.  Requires $select to retrieve. Read-only."),
      internetMessageId: z.string().nullable().optional().describe("The message ID in the format specified by RFC2822."),
      isDeliveryReceiptRequested: z.boolean().nullable().optional().describe("Indicates whether a read receipt is requested for the message."),
      isDraft: z.boolean().nullable().optional().describe("Indicates whether the message is a draft. A message is a draft if it hasn't been sent yet."),
      isRead: z.boolean().nullable().optional().describe("Indicates whether the message has been read."),
      isReadReceiptRequested: z.boolean().nullable().optional().describe("Indicates whether a read receipt is requested for the message."),
      parentFolderId: z.string().nullable().optional().describe("The unique identifier for the message's parent mailFolder."),
      receivedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time the message was received.  The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
      replyTo: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The email addresses to use when replying."),
      sender: z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      }).optional(),
      sentDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time the message was sent.  The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
      subject: z.string().nullable().optional().describe("The subject of the message."),
      toRecipients: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The To: recipients for the message."),
      uniqueBody: z.object({
        content: z.string().nullable().optional().describe("The content of the item."),
        contentType: z.enum(["text", "html"]).optional(),
      }).optional(),
      webLink: z.string().nullable().optional().describe("The URL to open the message in Outlook on the web.You can append an ispopout argument to the end of the URL to change how the message is displayed. If ispopout is not present or if it is set to 1, then the message is shown in a popout window. If ispopout is set to 0, the browser shows the message in the Outlook on the web review pane.The message opens in the browser if you are signed in to your mailbox via Outlook on the web. You are prompted to sign in if you are not already signed in with the browser.This URL cannot be accessed from within an iFrame.NOTE: When using this URL to access a message from a mailbox with delegate permissions, both the signed-in user and the target mailbox must be in the same database region. For example, an error is returned when a user with a mailbox in the EUR (Europe) region attempts to access messages from a mailbox in the NAM (North America) region."),
      attachments: z.array(z.object({
        id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
        contentType: z.string().nullable().optional().describe("The MIME type."),
        isInline: z.boolean().optional().describe("true if the attachment is an inline attachment; otherwise, false."),
        lastModifiedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z"),
        name: z.string().nullable().optional().describe("The attachment's file name."),
        size: z.number().min(-2147483648).max(2147483647).optional().describe("The length of the attachment in bytes."),
      })).optional().describe("The fileAttachment and itemAttachment attachments for the message."),
      extensions: z.array(z.object({
        id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      })).optional().describe("The collection of open extensions defined for the message. Nullable."),
      multiValueExtendedProperties: z.array(z.object({
        id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
        value: z.array(z.string()).optional().describe("A collection of property values."),
      })).optional().describe("The collection of multi-value extended properties defined for the message. Nullable."),
      singleValueExtendedProperties: z.array(z.object({
        id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
        value: z.string().nullable().optional().describe("A property value."),
      })).optional().describe("The collection of single-value extended properties defined for the message. Nullable."),
    })).optional().describe("The collection of messages in the mailFolder."),
    multiValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.array(z.string()).optional().describe("A collection of property values."),
    })).optional().describe("The collection of multi-value extended properties defined for the mailFolder. Read-only. Nullable."),
    singleValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.string().nullable().optional().describe("A property value."),
    })).optional().describe("The collection of single-value extended properties defined for the mailFolder. Read-only. Nullable."),
  })).optional().describe("The collection of child folders in the mailFolder."),
  messageRules: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    actions: z.object({
      assignCategories: z.array(z.string()).optional().describe("A list of categories to be assigned to a message."),
      copyToFolder: z.string().nullable().optional().describe("The ID of a folder that a message is to be copied to."),
      delete: z.boolean().nullable().optional().describe("Indicates whether a message should be moved to the Deleted Items folder."),
      forwardAsAttachmentTo: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The email addresses of the recipients to which a message should be forwarded as an attachment."),
      forwardTo: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The email addresses of the recipients to which a message should be forwarded."),
      markAsRead: z.boolean().nullable().optional().describe("Indicates whether a message should be marked as read."),
      markImportance: z.enum(["low", "normal", "high"]).optional(),
      moveToFolder: z.string().nullable().optional().describe("The ID of the folder that a message will be moved to."),
      permanentDelete: z.boolean().nullable().optional().describe("Indicates whether a message should be permanently deleted and not saved to the Deleted Items folder."),
      redirectTo: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("The email addresses to which a message should be redirected."),
      stopProcessingRules: z.boolean().nullable().optional().describe("Indicates whether subsequent rules should be evaluated."),
    }).optional(),
    conditions: z.object({
      bodyContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body of an incoming message in order for the condition or exception to apply."),
      bodyOrSubjectContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body or subject of an incoming message in order for the condition or exception to apply."),
      categories: z.array(z.string()).optional().describe("Represents the categories that an incoming message should be labeled with in order for the condition or exception to apply."),
      fromAddresses: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply."),
      hasAttachments: z.boolean().nullable().optional().describe("Indicates whether an incoming message must have attachments in order for the condition or exception to apply."),
      headerContains: z.array(z.string()).optional().describe("Represents the strings that appear in the headers of an incoming message in order for the condition or exception to apply."),
      importance: z.enum(["low", "normal", "high"]).optional(),
      isApprovalRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an approval request in order for the condition or exception to apply."),
      isAutomaticForward: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply."),
      isAutomaticReply: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply."),
      isEncrypted: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be encrypted in order for the condition or exception to apply."),
      isMeetingRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply."),
      isMeetingResponse: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply."),
      isNonDeliveryReport: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply."),
      isPermissionControlled: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or exception to apply."),
      isReadReceipt: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply."),
      isSigned: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply."),
      isVoicemail: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply."),
      messageActionFlag: z.enum(["any", "call", "doNotForward", "followUp", "fyi", "forward", "noResponseNecessary", "read", "reply", "replyToAll", "review"]).optional(),
      notSentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or exception to apply."),
      recipientContains: z.array(z.string()).optional().describe("Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in order for the condition or exception to apply."),
      senderContains: z.array(z.string()).optional().describe("Represents the strings that appear in the from property of an incoming message in order for the condition or exception to apply."),
      sensitivity: z.enum(["normal", "personal", "private", "confidential"]).optional(),
      sentCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the condition or exception to apply."),
      sentOnlyToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition or exception to apply."),
      sentToAddresses: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("Represents the email addresses that an incoming message must have been sent to in order for the condition or exception to apply."),
      sentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the condition or exception to apply."),
      sentToOrCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming message in order for the condition or exception to apply."),
      subjectContains: z.array(z.string()).optional().describe("Represents the strings that appear in the subject of an incoming message in order for the condition or exception to apply."),
      withinSizeRange: z.object({
        maximumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
        minimumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
      }).optional(),
    }).optional(),
    displayName: z.string().nullable().optional().describe("The display name of the rule."),
    exceptions: z.object({
      bodyContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body of an incoming message in order for the condition or exception to apply."),
      bodyOrSubjectContains: z.array(z.string()).optional().describe("Represents the strings that should appear in the body or subject of an incoming message in order for the condition or exception to apply."),
      categories: z.array(z.string()).optional().describe("Represents the categories that an incoming message should be labeled with in order for the condition or exception to apply."),
      fromAddresses: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply."),
      hasAttachments: z.boolean().nullable().optional().describe("Indicates whether an incoming message must have attachments in order for the condition or exception to apply."),
      headerContains: z.array(z.string()).optional().describe("Represents the strings that appear in the headers of an incoming message in order for the condition or exception to apply."),
      importance: z.enum(["low", "normal", "high"]).optional(),
      isApprovalRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an approval request in order for the condition or exception to apply."),
      isAutomaticForward: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply."),
      isAutomaticReply: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply."),
      isEncrypted: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be encrypted in order for the condition or exception to apply."),
      isMeetingRequest: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply."),
      isMeetingResponse: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply."),
      isNonDeliveryReport: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply."),
      isPermissionControlled: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or exception to apply."),
      isReadReceipt: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply."),
      isSigned: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply."),
      isVoicemail: z.boolean().nullable().optional().describe("Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply."),
      messageActionFlag: z.enum(["any", "call", "doNotForward", "followUp", "fyi", "forward", "noResponseNecessary", "read", "reply", "replyToAll", "review"]).optional(),
      notSentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or exception to apply."),
      recipientContains: z.array(z.string()).optional().describe("Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in order for the condition or exception to apply."),
      senderContains: z.array(z.string()).optional().describe("Represents the strings that appear in the from property of an incoming message in order for the condition or exception to apply."),
      sensitivity: z.enum(["normal", "personal", "private", "confidential"]).optional(),
      sentCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the condition or exception to apply."),
      sentOnlyToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition or exception to apply."),
      sentToAddresses: z.array(z.object({
        emailAddress: z.object({
          address: z.string().nullable().optional().describe("The email address of the person or entity."),
          name: z.string().nullable().optional().describe("The display name of the person or entity."),
        }).optional(),
      })).optional().describe("Represents the email addresses that an incoming message must have been sent to in order for the condition or exception to apply."),
      sentToMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the condition or exception to apply."),
      sentToOrCcMe: z.boolean().nullable().optional().describe("Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming message in order for the condition or exception to apply."),
      subjectContains: z.array(z.string()).optional().describe("Represents the strings that appear in the subject of an incoming message in order for the condition or exception to apply."),
      withinSizeRange: z.object({
        maximumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
        minimumSize: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply."),
      }).optional(),
    }).optional(),
    hasError: z.boolean().nullable().optional().describe("Indicates whether the rule is in an error condition. Read-only."),
    isEnabled: z.boolean().nullable().optional().describe("Indicates whether the rule is enabled to be applied to messages."),
    isReadOnly: z.boolean().nullable().optional().describe("Indicates if the rule is read-only and cannot be modified or deleted by the rules REST API."),
    sequence: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("Indicates the order in which the rule is executed, among other rules."),
  })).optional().describe("The collection of rules that apply to the user's Inbox folder."),
  messages: z.array(z.object({
    bccRecipients: z.array(z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    })).optional().describe("The Bcc: recipients for the message."),
    body: z.object({
      content: z.string().nullable().optional().describe("The content of the item."),
      contentType: z.enum(["text", "html"]).optional(),
    }).optional(),
    bodyPreview: z.string().nullable().optional().describe("The first 255 characters of the message body. It is in text format."),
    ccRecipients: z.array(z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    })).optional().describe("The Cc: recipients for the message."),
    conversationId: z.string().nullable().optional().describe("The ID of the conversation the email belongs to."),
    conversationIndex: z.string().nullable().optional().describe("Indicates the position of the message within the conversation."),
    flag: z.object({
      completedDateTime: z.object({
        dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
        timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
      }).optional(),
      dueDateTime: z.object({
        dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
        timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
      }).optional(),
      flagStatus: z.enum(["notFlagged", "complete", "flagged"]).optional(),
      startDateTime: z.object({
        dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
        timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
      }).optional(),
    }).optional(),
    from: z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    }).optional(),
    hasAttachments: z.boolean().nullable().optional().describe("Indicates whether the message has attachments. This property doesn't include inline attachments, so if a message contains only inline attachments, this property is false. To verify the existence of inline attachments, parse the body property to look for a src attribute, such as <IMG src='cid:image001.jpg@01D26CD8.6C05F070'>."),
    importance: z.enum(["low", "normal", "high"]).optional(),
    inferenceClassification: z.enum(["focused", "other"]).optional(),
    internetMessageHeaders: z.array(z.object({
      name: z.string().nullable().optional().describe("Represents the key in a key-value pair."),
      value: z.string().nullable().optional().describe("The value in a key-value pair."),
    })).optional().describe("A collection of message headers defined by RFC5322. The set includes message headers indicating the network path taken by a message from the sender to the recipient. It can also contain custom message headers that hold app data for the message.  Requires $select to retrieve. Read-only."),
    internetMessageId: z.string().nullable().optional().describe("The message ID in the format specified by RFC2822."),
    isDeliveryReceiptRequested: z.boolean().nullable().optional().describe("Indicates whether a read receipt is requested for the message."),
    isDraft: z.boolean().nullable().optional().describe("Indicates whether the message is a draft. A message is a draft if it hasn't been sent yet."),
    isRead: z.boolean().nullable().optional().describe("Indicates whether the message has been read."),
    isReadReceiptRequested: z.boolean().nullable().optional().describe("Indicates whether a read receipt is requested for the message."),
    parentFolderId: z.string().nullable().optional().describe("The unique identifier for the message's parent mailFolder."),
    receivedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time the message was received.  The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
    replyTo: z.array(z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    })).optional().describe("The email addresses to use when replying."),
    sender: z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    }).optional(),
    sentDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time the message was sent.  The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
    subject: z.string().nullable().optional().describe("The subject of the message."),
    toRecipients: z.array(z.object({
      emailAddress: z.object({
        address: z.string().nullable().optional().describe("The email address of the person or entity."),
        name: z.string().nullable().optional().describe("The display name of the person or entity."),
      }).optional(),
    })).optional().describe("The To: recipients for the message."),
    uniqueBody: z.object({
      content: z.string().nullable().optional().describe("The content of the item."),
      contentType: z.enum(["text", "html"]).optional(),
    }).optional(),
    webLink: z.string().nullable().optional().describe("The URL to open the message in Outlook on the web.You can append an ispopout argument to the end of the URL to change how the message is displayed. If ispopout is not present or if it is set to 1, then the message is shown in a popout window. If ispopout is set to 0, the browser shows the message in the Outlook on the web review pane.The message opens in the browser if you are signed in to your mailbox via Outlook on the web. You are prompted to sign in if you are not already signed in with the browser.This URL cannot be accessed from within an iFrame.NOTE: When using this URL to access a message from a mailbox with delegate permissions, both the signed-in user and the target mailbox must be in the same database region. For example, an error is returned when a user with a mailbox in the EUR (Europe) region attempts to access messages from a mailbox in the NAM (North America) region."),
    attachments: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      contentType: z.string().nullable().optional().describe("The MIME type."),
      isInline: z.boolean().optional().describe("true if the attachment is an inline attachment; otherwise, false."),
      lastModifiedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z"),
      name: z.string().nullable().optional().describe("The attachment's file name."),
      size: z.number().min(-2147483648).max(2147483647).optional().describe("The length of the attachment in bytes."),
    })).optional().describe("The fileAttachment and itemAttachment attachments for the message."),
    extensions: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    })).optional().describe("The collection of open extensions defined for the message. Nullable."),
    multiValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.array(z.string()).optional().describe("A collection of property values."),
    })).optional().describe("The collection of multi-value extended properties defined for the message. Nullable."),
    singleValueExtendedProperties: z.array(z.object({
      id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
      value: z.string().nullable().optional().describe("A property value."),
    })).optional().describe("The collection of single-value extended properties defined for the message. Nullable."),
  })).optional().describe("The collection of messages in the mailFolder."),
  multiValueExtendedProperties: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    value: z.array(z.string()).optional().describe("A collection of property values."),
  })).optional().describe("The collection of multi-value extended properties defined for the mailFolder. Read-only. Nullable."),
  singleValueExtendedProperties: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    value: z.string().nullable().optional().describe("A property value."),
  })).optional().describe("The collection of single-value extended properties defined for the mailFolder. Read-only. Nullable."),
})

export const userMailFolderCreateChildFolder = pikkuSessionlessFunc({
  input: UserMailFolderCreateChildFolderInput,
  output: UserMailFolderCreateChildFolderOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders", data) as any
  },
})
