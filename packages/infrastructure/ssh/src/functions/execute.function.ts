import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SshExecuteInput = z.object({
  command: z.string().describe('Shell command to execute'),
  cwd: z.string().optional().describe('Working directory for the command'),
})

export const SshExecuteOutput = z.object({
  stdout: z.string().describe('Standard output'),
  stderr: z.string().describe('Standard error'),
  exitCode: z.number().describe('Exit code of the command'),
})

export const sshExecute = pikkuSessionlessFunc({
  description: 'Execute a command on a remote server via SSH',
  input: SshExecuteInput,
  output: SshExecuteOutput,
  node: { displayName: 'SSH Execute', category: 'Infrastructure', type: 'action' },
  func: async ({ sshClient }, { command, cwd }) => {
    const fullCommand = cwd ? `cd ${cwd} && ${command}` : command

    return new Promise((resolve, reject) => {
      sshClient.exec(fullCommand, (err, stream) => {
        if (err) return reject(err)

        let stdout = ''
        let stderr = ''

        stream.on('data', (data: Buffer) => {
          stdout += data.toString()
        })
        stream.stderr.on('data', (data: Buffer) => {
          stderr += data.toString()
        })
        stream.on('close', (code: number) => {
          resolve({ stdout, stderr, exitCode: code ?? 0 })
        })
        stream.on('error', reject)
      })
    })
  },
})
