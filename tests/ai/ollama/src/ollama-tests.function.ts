import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestOllamaInput = { model: string; embedModel: string }
export type TestOllamaOutput = { passed: number; failed: string[] }

export const testOllama = pikkuSessionlessFunc<TestOllamaInput, TestOllamaOutput>({
  func: async (_services, { model, embedModel }, { rpc }) => {
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

    // ── generateText ─────────────────────────────────────

    await run('generateText with prompt', async () => {
      const result = await rpc.invoke('ollama:ollamaGenerateText', {
        model,
        prompt: 'Say hello in exactly three words.',
        maxTokens: 50,
        temperature: 0,
      })
      assert.ok(result.text.length > 0, 'Expected non-empty text')
      assert.ok(result.finishReason, 'Expected a finishReason')
      assert.ok(result.usage.totalTokens > 0, 'Expected token usage')
    })

    await run('generateText with messages', async () => {
      const result = await rpc.invoke('ollama:ollamaGenerateText', {
        model,
        messages: [
          { role: 'user', content: 'What is 2 + 2? Reply with just the number.' },
        ],
        maxTokens: 50,
        temperature: 0,
      })
      assert.ok(
        result.text.includes('4') || result.text.toLowerCase().includes('four'),
        `Expected "4" or "four" in response, got: ${result.text}`
      )
    })

    await run('generateText with system message', async () => {
      const result = await rpc.invoke('ollama:ollamaGenerateText', {
        model,
        system: 'You are a pirate. Always respond in pirate speak.',
        prompt: 'Say hello.',
        maxTokens: 50,
        temperature: 0,
      })
      assert.ok(result.text.length > 0, 'Expected non-empty text')
    })

    // ── generateObject ───────────────────────────────────

    const modelsWithoutStructuredOutput = ['smollm2:135m']
    if (modelsWithoutStructuredOutput.includes(model)) {
      console.log(`    ⚠ Skipping generateObject: ${model} does not support structured output`)
    } else {
      await run('generateObject with JSON schema', async () => {
        const result = await rpc.invoke('ollama:ollamaGenerateObject', {
          model,
          prompt: 'Generate a person with name "Alice" and age 30.',
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              age: { type: 'number' },
            },
            required: ['name', 'age'],
          },
          mode: 'json',
          maxTokens: 100,
          temperature: 0,
        })
        assert.ok(result.object, `Expected an object, got: ${JSON.stringify(result.object)}`)
        assert.equal(typeof result.object.name, 'string', `Expected name to be a string in: ${JSON.stringify(result.object)}`)
        assert.equal(typeof result.object.age, 'number', `Expected age to be a number in: ${JSON.stringify(result.object)}`)
        assert.equal(result.object.name, 'Alice')
        assert.equal(result.object.age, 30)
        assert.ok(result.usage.totalTokens > 0, 'Expected token usage')
      })
    }

    // ── embed ────────────────────────────────────────────

    await run('embed single text', async () => {
      const result = await rpc.invoke('ollama:ollamaEmbed', {
        model: embedModel,
        value: 'Hello world',
      })
      assert.ok(Array.isArray(result.embedding), 'Expected embedding array')
      assert.ok(result.embedding.length > 0, 'Expected non-empty embedding')
      assert.ok(typeof result.embedding[0] === 'number', 'Expected numbers in embedding')
    })

    // ── embedMany ────────────────────────────────────────

    await run('embed multiple texts', async () => {
      const result = await rpc.invoke('ollama:ollamaEmbedMany', {
        model: embedModel,
        values: ['Hello world', 'Goodbye world'],
      })
      assert.ok(Array.isArray(result.embeddings), 'Expected embeddings array')
      assert.equal(result.embeddings.length, 2, 'Expected 2 embeddings')
      assert.ok(result.embeddings[0].length > 0, 'Expected non-empty first embedding')
      assert.ok(result.embeddings[1].length > 0, 'Expected non-empty second embedding')
      assert.equal(
        result.embeddings[0].length,
        result.embeddings[1].length,
        'Embeddings should have same dimensions'
      )
    })

    return { passed, failed }
  },
})
