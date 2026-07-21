import { z } from 'zod'

// Shared schemas from GitHub v3 REST API v1.1.4

export const codescanningrefSchema = z.string().describe("The full Git reference, formatted as `refs/heads/<branch name>`,\n`refs/pull/<number>/merge`, or `refs/pull/<number>/head`.")
export type codescanningref = z.infer<typeof codescanningrefSchema>

export const codescanninganalysistoolnameSchema = z.string().describe("The name of the tool used to generate the code scanning analysis.")
export type codescanninganalysistoolname = z.infer<typeof codescanninganalysistoolnameSchema>

export const codescanninganalysistoolguidSchema = z.string().nullable().describe("The GUID of the tool used to generate the code scanning analysis, if provided in the uploaded SARIF data.")
export type codescanninganalysistoolguid = z.infer<typeof codescanninganalysistoolguidSchema>

export const alertnumberSchema = z.number().int().describe("The security alert number.")
export type alertnumber = z.infer<typeof alertnumberSchema>
