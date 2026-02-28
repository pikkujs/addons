import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestWhisperASRInput = Record<string, never>
export type TestWhisperASROutput = { passed: number; failed: string[] }

export const testWhisperASR = pikkuSessionlessFunc<TestWhisperASRInput, TestWhisperASROutput>({
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

    // ── transcribe ───────────────────────────────────────

    await run('transcribe returns expected text', async () => {
      const result = await rpc.invoke('whisperASR:transcribe', {
        contentKey: 'test-speech.wav',
        fileName: 'test-speech.wav',
      })
      assert.ok(typeof result.text === 'string', `Expected text to be a string, got: ${typeof result.text}`)
      const text = result.text.toLowerCase()
      assert.ok(text.includes('quick') || text.includes('fox') || text.includes('lazy') || text.includes('dog'),
        `Expected transcription to contain words from "The quick brown fox jumps over the lazy dog", got: "${result.text}"`)
    })

    // ── transcribe-verbose ───────────────────────────────

    await run('transcribe-verbose returns segments with expected text', async () => {
      const result = await rpc.invoke('whisperASR:transcribeVerbose', {
        contentKey: 'test-speech.wav',
        fileName: 'test-speech.wav',
      })
      assert.ok(typeof result.text === 'string', `Expected text to be a string`)
      const text = result.text.toLowerCase()
      assert.ok(text.includes('quick') || text.includes('fox') || text.includes('lazy') || text.includes('dog'),
        `Expected transcription to contain words from "The quick brown fox jumps over the lazy dog", got: "${result.text}"`)
      assert.ok(result.language === 'en', `Expected language to be "en", got: "${result.language}"`)
      assert.ok(Array.isArray(result.segments), `Expected segments to be an array`)
      assert.ok(result.segments.length > 0, `Expected at least one segment`)
    })

    // ── translate ────────────────────────────────────────

    await run('translate returns expected text', async () => {
      const result = await rpc.invoke('whisperASR:translate', {
        contentKey: 'test-speech.wav',
        fileName: 'test-speech.wav',
      })
      assert.ok(typeof result.text === 'string', `Expected text to be a string, got: ${typeof result.text}`)
      const text = result.text.toLowerCase()
      assert.ok(text.includes('quick') || text.includes('fox') || text.includes('lazy') || text.includes('dog'),
        `Expected translation to contain words from "The quick brown fox jumps over the lazy dog", got: "${result.text}"`)
    })

    return { passed, failed }
  },
})
