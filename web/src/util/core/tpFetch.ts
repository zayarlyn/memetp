export const tpFetch = async (url: string, options?: RequestInit) => {
	const raw = await fetch(url, options)
	const data = await raw.json()
	return data
}
