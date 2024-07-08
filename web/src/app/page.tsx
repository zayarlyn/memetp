import TpCard from '@components/TpCard'
import Title from 'antd/es/typography/Title'
import _ from 'lodash'
import Link from 'next/link'
import { ITemplate } from 'types/api'
import { tpFetch } from '@util/core'

export default async function Home() {
	const templates: ITemplate[] = await tpFetch('http://localhost:5050/api/template')

	return (
		<div>
			<div className='mt-2 px-3'>
				<Title level={2} className='text-center'>
					Find high quality local meme templates
				</Title>
			</div>
			<div className='p-3 flex flex-col gap-6'>
				{_.map(templates, (tp, idx) => (
					<Link key={idx} href={`tp/${tp.id}`}>
						<TpCard tp={tp} />
					</Link>
				))}
			</div>
		</div>
	)
}
