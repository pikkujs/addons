import { z } from 'zod'
import { spawn } from 'node:child_process'
import { pikkuSessionlessFunc } from '#pikku'

export const SpawnCommandInput = z.object({
  command: z.string().describe('The program to run (no shell interpretation)'),
  args: z
    .array(z.string())
    .optional()
    .describe('Arguments passed to the program'),
  cwd: z.string().optional().describe('Working directory for the process'),
  timeout: z
    .number()
    .optional()
    .describe('Kill the process if it runs longer than this many milliseconds'),
})

export const SpawnCommandOutput = z.object({
  stdout: z.string().describe('Standard output'),
  stderr: z.string().describe('Standard error'),
  exitCode: z.number().describe('Process exit code (0 on success)'),
})

export const spawnCommand = pikkuSessionlessFunc({
  description:
    'Spawn a program with an argument array (no shell), capturing stdout, stderr, and the exit code',
  input: SpawnCommandInput,
  output: SpawnCommandOutput,
  node: { displayName: 'Spawn Process', category: 'DevOps', type: 'action' },
  func: async (_services, { command, args, cwd, timeout }) => {
    return await new Promise<{
      stdout: string
      stderr: string
      exitCode: number
    }>((resolve) => {
      const child = spawn(command, args ?? [], { cwd, timeout, shell: false })
      let stdout = ''
      let stderr = ''
      child.stdout.on('data', (chunk) => (stdout += chunk))
      child.stderr.on('data', (chunk) => (stderr += chunk))
      child.on('error', (error) =>
        resolve({ stdout, stderr: stderr || String(error), exitCode: 1 })
      )
      child.on('close', (code) =>
        resolve({ stdout, stderr, exitCode: code ?? 0 })
      )
    })
  },
})
