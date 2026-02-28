import { z } from 'zod'
import { pikkuTriggerFunc } from '#pikku'
import { escapeIdentifier } from '../shared.js'

export const OnChangesConfig = z.object({
  table: z.string().describe('The table to watch for changes'),
  events: z.array(z.enum(['INSERT', 'UPDATE', 'DELETE'])).describe('Which events to listen for'),
})

export const OnChangesOutput = z.object({
  event: z.enum(['INSERT', 'UPDATE', 'DELETE']).describe('The event type that fired'),
  table: z.string().describe('The table that changed'),
  data: z.record(z.string(), z.any()).describe('The row data (NEW for INSERT/UPDATE, OLD for DELETE)'),
})

export const onChanges = pikkuTriggerFunc({
  node: { displayName: 'Postgres Trigger', category: 'Database', type: 'trigger' },
  title: 'Postgres Trigger',
  description: 'Triggers when rows are inserted, updated, or deleted in a PostgreSQL table',
  input: OnChangesConfig,
  output: OnChangesOutput,
  func: async ({ postgres }, { table, events }, { trigger }) => {
    const client = await postgres.connect()

    const safeName = table.replace(/[^a-zA-Z0-9_]/g, '_')
    const channel = `pikku_notify_${safeName}`
    const functionName = `pikku_trigger_fn_${safeName}`
    const triggerName = `pikku_trigger_${safeName}`

    await client.query(`
      CREATE OR REPLACE FUNCTION ${escapeIdentifier(functionName)}()
      RETURNS trigger AS $$
      BEGIN
        IF TG_OP = 'DELETE' THEN
          PERFORM pg_notify('${channel}', json_build_object(
            'event', TG_OP,
            'table', TG_TABLE_NAME,
            'data', row_to_json(OLD)
          )::text);
          RETURN OLD;
        ELSE
          PERFORM pg_notify('${channel}', json_build_object(
            'event', TG_OP,
            'table', TG_TABLE_NAME,
            'data', row_to_json(NEW)
          )::text);
          RETURN NEW;
        END IF;
      END;
      $$ LANGUAGE plpgsql;
    `)

    await client.query(`
      DROP TRIGGER IF EXISTS ${escapeIdentifier(triggerName)} ON ${escapeIdentifier(table)}
    `)

    const eventList = events.join(' OR ')
    await client.query(`
      CREATE TRIGGER ${escapeIdentifier(triggerName)}
      AFTER ${eventList}
      ON ${escapeIdentifier(table)}
      FOR EACH ROW
      EXECUTE FUNCTION ${escapeIdentifier(functionName)}()
    `)

    client.on('notification', (msg) => {
      if (msg.channel === channel && msg.payload) {
        try {
          const parsed = JSON.parse(msg.payload)
          trigger.invoke({
            event: parsed.event,
            table: parsed.table,
            data: parsed.data,
          })
        } catch {
          // Ignore malformed payloads
        }
      }
    })

    await client.query(`LISTEN ${escapeIdentifier(channel)}`)

    // Return teardown
    return async () => {
      await client.query(`UNLISTEN ${escapeIdentifier(channel)}`).catch(() => {})
      await client.query(`DROP TRIGGER IF EXISTS ${escapeIdentifier(triggerName)} ON ${escapeIdentifier(table)}`).catch(() => {})
      await client.query(`DROP FUNCTION IF EXISTS ${escapeIdentifier(functionName)}()`).catch(() => {})
      client.release()
    }
  },
})
