export const ENVIRONMENT_ID_KEY = 'environmentId'

export const resolveEnvironmentId = async (variables: {
  get(name: string): Promise<string | null | undefined>
}): Promise<string | null> =>
  (await variables.get('ENVIRONMENT_ID')) ?? (await variables.get('FABRIC_STAGE_ID')) ?? null

export const withEnvironmentId = (
  environmentId: string | null,
  metadata?: Record<string, string>
): Record<string, string> | undefined =>
  environmentId ? { ...(metadata ?? {}), [ENVIRONMENT_ID_KEY]: environmentId } : metadata

export const isForeignEnvironment = (
  environmentId: string | null,
  object: { metadata?: Record<string, unknown> | null } | undefined
): boolean => {
  const tagged = object?.metadata?.[ENVIRONMENT_ID_KEY]
  return Boolean(environmentId && typeof tagged === 'string' && tagged !== environmentId)
}
