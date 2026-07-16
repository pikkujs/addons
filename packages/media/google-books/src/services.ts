import { GoogleBooksService } from './google-books-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleBooks = new GoogleBooksService(secrets, variables)

  return { googleBooks }
})
