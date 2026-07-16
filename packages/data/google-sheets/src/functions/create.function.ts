import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateInput = z.any()

export const CreateOutput = z.any()

export const create = pikkuSessionlessFunc({
  description: "Creates a spreadsheet, returning the newly created spreadsheet.",
  input: CreateInput,
  output: CreateOutput,
  func: async ({ googleSheets }, data) => {
    return googleSheets.call("POST", "/v4/spreadsheets", data) as any
  },
})
