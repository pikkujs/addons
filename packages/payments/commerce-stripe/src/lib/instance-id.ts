export const INSTANCE_ID_KEY = 'instanceId'

export const resolveInstanceId = async (variables: {
  get(name: string): Promise<string | null | undefined>
}): Promise<string | null> =>
  (await variables.get('FABRIC_INSTANCE_ID')) ?? (await variables.get('FABRIC_STAGE_ID')) ?? null

export const withInstanceId = (
  instanceId: string | null,
  metadata?: Record<string, string>
): Record<string, string> | undefined =>
  instanceId ? { ...(metadata ?? {}), [INSTANCE_ID_KEY]: instanceId } : metadata

export const isForeignInstance = (
  instanceId: string | null,
  object: { metadata?: Record<string, unknown> | null } | undefined
): boolean => {
  const tagged = object?.metadata?.[INSTANCE_ID_KEY]
  return Boolean(instanceId && typeof tagged === 'string' && tagged !== instanceId)
}
