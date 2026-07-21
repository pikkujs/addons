export const USER_AGENT =
  'pikku-addon-wikipedia/0.1 (https://pikku.dev; addons@pikku.dev)'

export const stripHtml = (value: string): string =>
  value.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&')

export const pageUrl = (language: string, title: string): string =>
  `https://${language}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`

export const wikiFetch = async (url: string): Promise<unknown> => {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(
      `Wikipedia request failed (${response.status} ${response.statusText}) for ${url}`
    )
  }
  return response.json()
}
