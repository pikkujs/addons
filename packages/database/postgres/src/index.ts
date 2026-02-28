export { postgresSecretsSchema, type PostgresSecrets } from './postgres.secret.js'

export { WhereCondition, WhereClause, OrderByClause, escapeIdentifier, buildWhereClause, buildOrderByClause } from './shared.js'

export { executeQuery, ExecuteQueryInput, ExecuteQueryOutput } from './functions/execute-query.function.js'
export { select, SelectInput, SelectOutput } from './functions/select.function.js'
export { insert, InsertInput, InsertOutput } from './functions/insert.function.js'
export { insertMany, InsertManyInput, InsertManyOutput } from './functions/insert-many.function.js'
export { update, UpdateInput, UpdateOutput } from './functions/update.function.js'
export { deleteRows, DeleteInput, DeleteOutput } from './functions/delete.function.js'
export { truncate, TruncateInput, TruncateOutput } from './functions/truncate.function.js'
export { upsert, UpsertInput, UpsertOutput } from './functions/upsert.function.js'
export { dropTable, DropTableInput, DropTableOutput } from './functions/drop-table.function.js'
export { count, CountInput, CountOutput } from './functions/count.function.js'
export { describeTable, DescribeTableInput, DescribeTableOutput, ColumnInfo } from './functions/describe-table.function.js'
export { listTables, ListTablesInput, ListTablesOutput } from './functions/list-tables.function.js'
export { transaction, TransactionInput, TransactionOutput } from './functions/transaction.function.js'

export { onChanges, OnChangesConfig, OnChangesOutput } from './functions/on-changes.trigger.js'
