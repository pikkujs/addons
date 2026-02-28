import { ImapFlow, type ImapFlowOptions } from 'imapflow'
import type { ImapSecrets } from './imap.secret.js'

export class ImapService {
  private config: ImapFlowOptions

  constructor(private creds: ImapSecrets) {
    this.config = {
      host: creds.host.trim(),
      port: creds.port,
      secure: creds.secure,
      auth: {
        user: creds.user,
        pass: creds.password,
      },
      logger: false,
      ...(creds.allowUnauthorizedCerts ? { tls: { rejectUnauthorized: false } } : {}),
    }
  }

  /**
   * Create a new IMAP connection
   */
  async connect(): Promise<ImapFlow> {
    const client = new ImapFlow(this.config)
    await client.connect()
    return client
  }

  /**
   * Test the IMAP connection
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const client = await this.connect()
      await client.list()
      await client.logout()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  /**
   * Execute an operation with automatic connection management
   */
  async withConnection<T>(
    operation: (client: ImapFlow) => Promise<T>
  ): Promise<T> {
    const client = await this.connect()
    try {
      return await operation(client)
    } finally {
      await client.logout()
    }
  }
}
