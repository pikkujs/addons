import { ObjectId } from 'mongodb'

/**
 * Recursively converts ObjectId instances to strings in a document
 */
export function stringifyObjectIds(doc: any): any {
  if (doc === null || doc === undefined) return doc
  if (doc instanceof ObjectId) return doc.toHexString()
  if (Array.isArray(doc)) return doc.map(stringifyObjectIds)
  if (typeof doc === 'object') {
    const result: Record<string, any> = {}
    for (const [key, value] of Object.entries(doc)) {
      result[key] = stringifyObjectIds(value)
    }
    return result
  }
  return doc
}
