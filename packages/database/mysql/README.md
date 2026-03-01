# @pikku/addon-mysql

MySQL database operations.

## Functions

- `executeQuery` — execute a raw SQL query
- `select` — select rows with filters and ordering
- `insert` / `insertMany` — insert rows
- `update` — update rows
- `deleteRows` — delete rows
- `truncate` — truncate a table
- `upsert` — insert or update on conflict
- `dropTable` — drop a table
- `count` — count rows
- `describeTable` — get table schema
- `listTables` — list all tables
- `transaction` — execute queries in a transaction

## Secrets

`MYSQL_CREDENTIALS` — fields: user, password, caCertificate, clientCertificate, clientPrivateKey

## Dependencies

- mysql2
