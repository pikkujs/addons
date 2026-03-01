import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestElevenLabsInput = Record<string, never>
export type TestElevenLabsOutput = { passed: number; failed: string[] }

export const testElevenLabs = pikkuSessionlessFunc<TestElevenLabsInput, TestElevenLabsOutput>({
  func: async (services, _data, { rpc }) => {
    let passed = 0
    const failed: string[] = []

    const run = async (name: string, fn: () => Promise<void>) => {
      try {
        await fn()
        passed++
      } catch (e: any) {
        failed.push(`${name}: ${e.message}`)
      }
    }

    // ── synthesize (TTS) ───────────────────────────────────
    let synthesizedAudio: string | undefined

    await run('synthesize returns audio', async () => {
      const result = await rpc.invoke('elevenlabs:synthesize', {
        text: 'Hello, this is a test.',
        format: 'mp3_44100_128',
      })
      assert.ok(typeof result.audio === 'string', `Expected audio to be a base64 string`)
      assert.ok(result.audio.length > 0, 'Expected non-empty audio data')
      assert.ok(typeof result.format === 'string', `Expected format to be a string`)
      synthesizedAudio = result.audio
    })

    // ── transcribe (STT) ───────────────────────────────────

    await run('transcribe returns text', async () => {
      assert.ok(synthesizedAudio, 'Need synthesized audio from previous test')
      const result = await rpc.invoke('elevenlabs:transcribe', {
        audio: synthesizedAudio!,
        format: 'audio/mpeg',
      })
      assert.ok(typeof result === 'string', `Expected result to be a string, got: ${typeof result}`)
      assert.ok(result.length > 0, 'Expected non-empty transcription')
      const text = result.toLowerCase()
      assert.ok(
        text.includes('hello') || text.includes('test'),
        `Expected transcription to contain "hello" or "test", got: "${result}"`
      )
    })

    return { passed, failed }
  },
})
