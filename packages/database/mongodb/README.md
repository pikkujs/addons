# @pikku/addon-mongodb

MongoDB database operations.

## Functions

- `mongoFind` — query documents
- `mongoInsertOne` / `mongoInsertMany` — insert documents
- `mongoUpdateOne` / `mongoUpdateMany` — update documents
- `mongoFindOneAndUpdate` — find and update a document atomically
- `mongoDeleteOne` / `mongoDeleteMany` — delete documents
- `mongoAggregate` — run aggregation pipelines
- `mongoCount` — count documents
- `mongoListCollections` — list collections

## Secrets

`MONGODB_CREDENTIALS` — fields: connectionString, database, caCertificate, clientCertificate, clientPrivateKey

## Dependencies

- mongodb
