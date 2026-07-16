import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleBooksBaseUrlSchema = z.enum(["https://www.googleapis.com/books"]).default("https://www.googleapis.com/books")

wireVariable({
  name: 'GOOGLE_BOOKS_BASE_URL',
  displayName: 'Google Books Base URL',
  description: 'The base URL for the Google Books API.',
  variableId: 'GOOGLE_BOOKS_BASE_URL',
  schema: googleBooksBaseUrlSchema,
})
