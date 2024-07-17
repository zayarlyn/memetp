import { useState } from 'react'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const useTpFetch = (path: string, options: RequestInit = {}) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const tpFetch = async (_options: RequestInit = {}) => {
		setLoading(true)
		return fetch(serverUrl + path, { cache: 'no-cache', ...options, ..._options })
			.then((res) => res.json())
			.catch((err) => {
				setError(err.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return [tpFetch, loading, error] as [typeof tpFetch, typeof loading, typeof error]
}
