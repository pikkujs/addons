import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContainerGetInput = z.object({
  containerId: z.string(),
})

export const ContainerGetOutput = z.record(z.string(), z.unknown())

export const containerGet = pikkuSessionlessFunc({
  description: "Get a container",
  input: ContainerGetInput,
  output: ContainerGetOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("GET", "/containers/{containerId}", data) as any
  },
})
