import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleBooksBaseUrlSchema = z.enum(["https://www.googleapis.com/books"]).default("https://www.googleapis.com/books")

defineVariable({
  name: 'GOOGLE_BOOKS_BASE_URL',
  displayName: 'Google Books Base URL',
  description: 'The base URL for the Google Books API.',
  variableId: 'GOOGLE_BOOKS_BASE_URL',
  schema: googleBooksBaseUrlSchema,
})
