import { z } from 'zod'
import { exec } from 'node:child_process'
import { pikkuSessionlessFunc } from '#pikku'

export const ExecuteInput = z.object({
  command: z.string().describe('The shell command to run'),
  cwd: z.string().optional().describe('Working directory for the command'),
  timeout: z
    .number()
    .optional()
    .describe('Kill the command if it runs longer than this many milliseconds'),
})

export const ExecuteOutput = z.object({
  stdout: z.string().describe('Standard output'),
  stderr: z.string().describe('Standard error'),
  exitCode: z.number().describe('Process exit code (0 on success)'),
})

export const execute = pikkuSessionlessFunc({
  description: 'Run a shell command, capturing stdout, stderr, and the exit code',
  input: ExecuteInput,
  output: ExecuteOutput,
  node: { displayName: 'Execute Command', category: 'DevOps', type: 'action' },
  func: async (_services, { command, cwd, timeout }) => {
    return await new Promise<{
      stdout: string
      stderr: string
      exitCode: number
    }>((resolve) => {
      exec(
        command,
        { cwd, timeout, encoding: 'utf8' },
        (error, stdout, stderr) => {
          const exitCode =
            error && typeof error.code === 'number' ? error.code : 0
          resolve({ stdout: stdout ?? '', stderr: stderr ?? '', exitCode })
        }
      )
    })
  },
})
