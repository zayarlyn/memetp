import TpCard from '@components/TpCard'
import Title from 'antd/es/typography/Title'
import Link from 'next/link'
import { ITemplate } from 'types/api'

const vids = ['/bar-tone-ha.mp4', '/lawkadan.mp4', 'sa-dr-pr-byr.mp4']

interface ITpFetch {
	url: string
}
export const tpFetch = async (url: string) => {
	const raw = await fetch(url)
	const data = await raw.json()
	return data
}

export default async function Home() {
	const templates: ITemplate = await tpFetch('http://localhost:5050/api/template')

	return (
		<div>
			<div className='mt-2'>
				<Title level={2} className='text-center'>
					Find high quality local meme templates
				</Title>
			</div>
			<div className='p-3 flex flex-col gap-6'>
				{/* @ts-ignore */}
				{templates.map((tp, idx) => (
					// <Link key={idx} href={`tp/${vid.split('.')[0]}`}>
					<Link key={idx} href={`tp/${tp.id}`}>
						<TpCard tp={tp} />
					</Link>
				))}
			</div>
		</div>
	)
}
