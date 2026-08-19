// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const CodespacesCodespaceMachinesForAuthenticatedUserInput = z.object({
  codespace_name: z.string().describe("The name of the codespace."),
})

export const CodespacesCodespaceMachinesForAuthenticatedUserOutput = z.object({
  machines: z.array(z.object({
    cpus: z.number().int().describe("How many cores are available to the codespace."),
    display_name: z.string().describe("The display name of the machine includes cores, memory, and storage."),
    memory_in_bytes: z.number().int().describe("How much memory is available to the codespace."),
    name: z.string().describe("The name of the machine."),
    operating_system: z.string().describe("The operating system of the machine."),
    prebuild_availability: z.enum(["none", "ready", "in_progress"]).nullable().describe("Whether a prebuild is currently available when creating a codespace for this machine and repository. If a branch was not specified as a ref, the default branch will be assumed. Value will be \"null\" if prebuilds are not supported or prebuild availability could not be determined. Value will be \"none\" if no prebuild is available. Latest values \"ready\" and \"in_progress\" indicate the prebuild availability status."),
    storage_in_bytes: z.number().int().describe("How much storage is available to the codespace."),
  })),
  total_count: z.number().int(),
})

export const codespacesCodespaceMachinesForAuthenticatedUser = pikkuSessionlessFunc({
  description: "List the machine types a codespace can transition to use.\n\nYou must authenticate using an access token with the `codespace` scope to use this endpoint.\n\nGitHub Apps must have read access to the `codespaces_metadata` repository permission to use this endpoint.",
  input: CodespacesCodespaceMachinesForAuthenticatedUserInput,
  output: CodespacesCodespaceMachinesForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/codespaces/{codespace_name}/machines", data) as any
  },
})
