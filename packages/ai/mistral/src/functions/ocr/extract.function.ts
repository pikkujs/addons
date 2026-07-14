import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { OcrDocument } from './process.function.js'

// OCR + structured extraction in one call: Mistral runs OCR then fills the
// JSON Schema you provide from the whole document (invoices, receipts, forms).
export const OcrExtractInput = z.object({
  document: OcrDocument.describe('The document or image to run OCR on'),
  model: z.string().default('mistral-ocr-latest').describe('OCR model id (e.g. mistral-ocr-latest)'),
  schemaName: z
    .string()
    .default('document')
    .describe('A name for the extraction schema (surfaced to the model)'),
  // A JSON Schema object describing the fields to pull out of the document.
  schema: z
    .record(z.string(), z.unknown())
    .describe('JSON Schema for the structured fields to extract from the document'),
  prompt: z
    .string()
    .optional()
    .describe('Optional instruction to guide extraction'),
})

export const OcrExtractOutput = z.object({
  model: z.string(),
  // The extracted fields, matching the provided schema. Shape is caller-defined
  // so it is typed loosely here — cast to your own type at the call site.
  annotation: z
    .record(z.string(), z.unknown())
    .nullable()
    .describe('The structured fields extracted from the document, or null if none'),
})

type Input = z.infer<typeof OcrExtractInput>
type Output = z.infer<typeof OcrExtractOutput>

export const ocrExtract = pikkuSessionlessFunc({
  description: 'OCR a document and extract structured fields against a JSON Schema',
  node: { displayName: 'Extract Document', category: 'OCR', type: 'action' },
  input: OcrExtractInput,
  output: OcrExtractOutput,
  func: async ({ mistral }, data: Input) => {
    const res = await mistral.ocr.process({
      model: data.model,
      document: data.document,
      documentAnnotationFormat: {
        type: 'json_schema',
        jsonSchema: {
          name: data.schemaName,
          schemaDefinition: data.schema,
          strict: true,
        },
      },
      documentAnnotationPrompt: data.prompt,
    })
    // Mistral returns the annotation as a JSON string; parse to an object.
    let annotation: Record<string, unknown> | null = null
    if (res.documentAnnotation) {
      annotation = JSON.parse(res.documentAnnotation) as Record<string, unknown>
    }
    return { model: res.model, annotation } satisfies Output
  },
})
