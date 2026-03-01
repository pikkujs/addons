# @pikku/addon-gmail

Gmail API for messages, drafts, labels, and threads.

## Functions

**Messages:** `messageSend`, `messageList`, `messageGet`, `messageDelete`, `messageAddLabel`, `messageRemoveLabel`, `messageMarkRead`, `messageMarkUnread`, `messageReply`, `messageGetAttachment`
**Triggers:** `onMessage`
**Drafts:** `draftCreate`, `draftDelete`, `draftGet`, `draftList`
**Labels:** `labelCreate`, `labelDelete`, `labelGet`, `labelList`
**Threads:** `threadGet`, `threadList`, `threadDelete`, `threadTrash`, `threadUntrash`, `threadAddLabel`, `threadRemoveLabel`, `threadReply`

## Secrets

`GMAIL_APP_CREDENTIALS` — Google OAuth2 credentials (OAuth2 flow)

## Dependencies

No additional runtime dependencies.
