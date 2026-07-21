import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileGetAllOutput = z.record(z.string(), z.unknown())

export const fileGetAll = pikkuSessionlessFunc({
  description: "Get many company files",
  output: FileGetAllOutput,
  func: async ({ bambooHr }) => {
    return bambooHr.call("GET", "/files/view") as any
  },
})
