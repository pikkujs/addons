export interface PostHogCaptureEvent {
  event: string
  distinct_id: string
  timestamp: string
  properties: Record<string, unknown>
}

export interface PostHogBatchBody {
  api_key: string
  batch: PostHogCaptureEvent[]
}
