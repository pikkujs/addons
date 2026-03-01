# @pikku/addon-imap

Read and manage emails via IMAP.

## Functions

- `listMailboxes` — list available mailboxes
- `searchEmails` — search emails with filters
- `getEmail` — get a single email
- `markAsRead` — mark an email as read
- `markAsUnread` — mark an email as unread
- `deleteEmail` — delete an email
- `moveEmail` — move an email to another mailbox

## Secrets

`IMAP_CREDENTIALS` — fields: user, password, host, port, secure, allowUnauthorizedCerts

## Dependencies

- imapflow
- mailparser
