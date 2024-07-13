const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const tpFetch = async (path: string, options?: RequestInit) => {
	const raw = await fetch(serverUrl + path, { cache: 'no-cache', ...options })
	const data = await raw.json()
	return data
}
