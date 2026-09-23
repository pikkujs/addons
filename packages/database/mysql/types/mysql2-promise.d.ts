import 'mysql2/promise'

declare module 'mysql2/promise' {
  interface Connection {
    query(sql: string, values?: any | any[]): Promise<any>
    execute(sql: string, values?: any | any[]): Promise<any>
  }
}
