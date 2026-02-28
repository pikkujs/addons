import type {
  MandrillMessage,
  MandrillSendResult,
  MandrillTemplateContent,
  MandrillSendOptions,
} from './mandrill.types.js'

const BASE_URL = 'https://mandrillapp.com/api/1.0'

export class MandrillService {
  constructor(private apiKey: string) {}

  async request<T>(
    resource: string,
    action: string,
    body: Record<string, unknown> = {}
  ): Promise<T> {
    const response = await fetch(`${BASE_URL}${resource}${action}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body, key: this.apiKey }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Mandrill API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  async sendMessage(
    message: MandrillMessage,
    options?: MandrillSendOptions
  ): Promise<MandrillSendResult[]> {
    return this.request<MandrillSendResult[]>('/messages', '/send', {
      message,
      ...options,
    })
  }

  async sendTemplate(
    templateName: string,
    templateContent: MandrillTemplateContent[],
    message: MandrillMessage,
    options?: MandrillSendOptions
  ): Promise<MandrillSendResult[]> {
    return this.request<MandrillSendResult[]>('/messages', '/send-template', {
      template_name: templateName,
      template_content: templateContent,
      message,
      ...options,
    })
  }
}
