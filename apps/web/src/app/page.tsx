import Title from 'antd/es/typography/Title'
import _ from 'lodash'
import { ITemplate } from 'types/api'

import { TpCard } from '@components/app'
import { tpFetch } from '@util/core'

export default async function Home() {
	const templates: ITemplate[] = await tpFetch('/api/template')

	return (
		<div>
			<div className='mt-2 px-3'>
				<Title level={2} className='text-center'>
					Find high quality local meme templates
				</Title>
			</div>
			<div className='p-3 flex flex-col gap-6'>
				{_.map(templates, (tp, idx) => (
					<a key={idx} href={`tp/${tp.id}`}>
						<TpCard tp={tp} />
					</a>
				))}
			</div>
		</div>
	)
}
