# @pikku/addon-redis

Redis cache, data structures, and pub/sub.

## Functions

**Keys:** `keyGet`, `keySet`, `keyDelete`, `keyIncr`, `keys`, `info`
**Hashes:** `hashGet`, `hashSet`, `hashGetAll`, `hashDelete`
**Sets:** `setAdd`, `setMembers`, `setRemove`, `setIsMember`
**Lists:** `listPush`, `listPop`, `listLength`, `listRange`
**Pub/Sub:** `publish`, `subscribe`

## Secrets

`REDIS_PASSWORD` — Redis authentication password (string, optional)

## Dependencies

- ioredis
