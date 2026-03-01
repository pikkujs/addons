# @pikku/addon-assemblyai

Speech-to-text transcription via AssemblyAI.

## Functions

- `uploadFile` — upload audio file for transcription
- `createTranscript` — start a new transcription job
- `getTranscript` — retrieve transcription result
- `listTranscripts` — list all transcripts
- `deleteTranscript` — delete a transcript
- `getSentences` — get transcript split into sentences
- `getParagraphs` — get transcript split into paragraphs
- `getSubtitles` — get SRT/VTT subtitles
- `getRedactedAudio` — get PII-redacted audio
- `wordSearch` — search for words in a transcript
- `createStreamingToken` — create a real-time streaming session token

## Secrets

`ASSEMBLYAI_API_KEY` — AssemblyAI API key (string)

## Dependencies

No additional runtime dependencies.
