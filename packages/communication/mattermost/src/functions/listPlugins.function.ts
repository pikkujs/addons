// plugins — Endpoints related to uploading and managing plugins.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListPluginsOutput = z.object({
  active: z.array(z.object({
    id: z.string().optional().describe("Globally unique identifier that represents the plugin."),
    name: z.string().optional().describe("Name of the plugin."),
    description: z.string().optional().describe("Description of what the plugin is and does."),
    version: z.string().optional().describe("Version number of the plugin."),
    min_server_version: z.string().optional().describe("The minimum Mattermost server version required for the plugin.\n\nAvailable as server version 5.6.\n"),
    backend: z.object({
      executable: z.string().optional().describe("Path to the executable binary."),
    }).optional().describe("Deprecated in Mattermost 5.2 release."),
    server: z.object({
      executables: z.object({
        "linux-amd64": z.string().optional(),
        "darwin-amd64": z.string().optional(),
        "windows-amd64": z.string().optional(),
      }).optional().describe("Paths to executable binaries, specifying multiple entry points for different platforms when bundled together in a single plugin."),
      executable: z.string().optional().describe("Path to the executable binary."),
    }).optional(),
    webapp: z.object({
      bundle_path: z.string().optional().describe("Path to the webapp JavaScript bundle."),
    }).optional(),
    settings_schema: z.record(z.string(), z.unknown()).optional().describe("Settings schema used to define the System Console UI for the plugin."),
  })).optional(),
  inactive: z.array(z.object({
    id: z.string().optional().describe("Globally unique identifier that represents the plugin."),
    name: z.string().optional().describe("Name of the plugin."),
    description: z.string().optional().describe("Description of what the plugin is and does."),
    version: z.string().optional().describe("Version number of the plugin."),
    min_server_version: z.string().optional().describe("The minimum Mattermost server version required for the plugin.\n\nAvailable as server version 5.6.\n"),
    backend: z.object({
      executable: z.string().optional().describe("Path to the executable binary."),
    }).optional().describe("Deprecated in Mattermost 5.2 release."),
    server: z.object({
      executables: z.object({
        "linux-amd64": z.string().optional(),
        "darwin-amd64": z.string().optional(),
        "windows-amd64": z.string().optional(),
      }).optional().describe("Paths to executable binaries, specifying multiple entry points for different platforms when bundled together in a single plugin."),
      executable: z.string().optional().describe("Path to the executable binary."),
    }).optional(),
    webapp: z.object({
      bundle_path: z.string().optional().describe("Path to the webapp JavaScript bundle."),
    }).optional(),
    settings_schema: z.record(z.string(), z.unknown()).optional().describe("Settings schema used to define the System Console UI for the plugin."),
  })).optional(),
})

export const listPlugins = pikkuSessionlessFunc({
  description: "Get a list of inactive and a list of active plugin manifests. Plugins must be enabled in the server's config settings.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 4.4",
  output: ListPluginsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/plugins") as any
  },
})
