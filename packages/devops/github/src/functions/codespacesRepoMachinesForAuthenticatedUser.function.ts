// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const CodespacesRepoMachinesForAuthenticatedUserInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  location: z.string().optional().describe("The location to check for available machines. Assigned by IP if not provided."),
  client_ip: z.string().optional().describe("IP for location auto-detection when proxying a request"),
})

export const CodespacesRepoMachinesForAuthenticatedUserOutput = z.object({
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

export const codespacesRepoMachinesForAuthenticatedUser = pikkuSessionlessFunc({
  description: "List the machine types available for a given repository based on its configuration.\n\nYou must authenticate using an access token with the `codespace` scope to use this endpoint.\n\nGitHub Apps must have write access to the `codespaces_metadata` repository permission to use this endpoint.",
  input: CodespacesRepoMachinesForAuthenticatedUserInput,
  output: CodespacesRepoMachinesForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/codespaces/machines", data) as any
  },
})
