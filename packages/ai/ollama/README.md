# @pikku/addon-ollama

Local LLM inference via Ollama.

## Functions

- `ollamaGenerateText` — generate text completions
- `ollamaGenerateObject` — generate structured JSON objects
- `ollamaEmbed` — generate an embedding for a single input
- `ollamaEmbedMany` — generate embeddings for multiple inputs

## Secrets

No secrets required. Uses variable `OLLAMA_BASE_URL` (defaults to `http://localhost:11434/v1`).

## Dependencies

- @ai-sdk/openai
- ai
