// Airtable secret
export { airtableSecretsSchema, type AirtableSecrets } from './airtable.secret.js'

// Airtable service
export { AirtableService } from './airtable-api.service.js'

// Airtable record functions
export { listRecords, ListRecordsInput, ListRecordsOutput } from './functions/records/list-records.function.js'
export { getRecord, GetRecordInput, GetRecordOutput } from './functions/records/get-record.function.js'
export { createRecord, CreateRecordInput, CreateRecordOutput } from './functions/records/create-record.function.js'
export { updateRecord, UpdateRecordInput, UpdateRecordOutput } from './functions/records/update-record.function.js'
export { deleteRecord, DeleteRecordInput, DeleteRecordOutput } from './functions/records/delete-record.function.js'
