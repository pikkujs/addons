import type { ZapierSecrets } from './zapier.secret.js'

export class ZapierService {
  private webhookUrls: Record<string, string>

  constructor(secrets: ZapierSecrets) {
    this.webhookUrls = secrets.webhookUrls
  }

  getWebhookUrl(name: string): string | undefined {
    return this.webhookUrls[name]
  }

  async triggerWebhook(webhookUrl: string, payload: unknown): Promise<{ status: string; id?: string }> {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Zapier webhook error (${response.status}): ${errorText}`)
    }

    // Zapier webhooks return various formats depending on the zap
    const text = await response.text()
    try {
      return JSON.parse(text) as { status: string; id?: string }
    } catch {
      return { status: text || 'ok' }
    }
  }
}
