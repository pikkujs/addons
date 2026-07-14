# @pikku/addon-mistral

Mistral AI for document OCR, structured extraction, embeddings, and speech-to-text.

## Functions

- `ocrProcess` — extract text (as markdown) from a PDF or image
- `ocrExtract` — OCR a document and extract structured fields against a JSON Schema
- `textEmbedding` — generate text embeddings
- `audioTranscribe` — transcribe an audio file to text (Voxtral)

Chat/completions are intentionally omitted — reach for the generic AI agent
runner (or the OpenAI-compatible provider) for chat. This addon covers what the
chat path can't: OCR, structured document extraction, embeddings, and STT.

## Secrets

`MISTRAL_API_KEY` — Mistral API key (string)

## Dependencies

- @mistralai/mistralai
