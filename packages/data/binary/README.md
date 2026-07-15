# @pikku/addon-binary

Convert between binary file data (base64) and JSON, without any heavy parser
dependencies. For format-specific parsing use `@pikku/addon-read-pdf`,
`@pikku/addon-spreadsheet`, or `@pikku/addon-xml`.

## Functions

- `extractText` — decode base64 file bytes into a text string
- `extractJson` — parse base64 file bytes as JSON
- `toTextFile` — encode a text string into base64 file bytes
- `toJsonFile` — serialize a JSON value into base64 file bytes
- `moveBinaryData` — move data between the JSON and binary channels in either direction

## Secrets

No secrets required.

## Dependencies

None (pure `Buffer` / `JSON`).
