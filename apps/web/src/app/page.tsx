import _ from 'lodash'
import { ITemplate } from 'types/api'

import { TpCard } from '@components/app'
import { tpFetch } from '@util/core'

export default async function Home() {
	const templates: ITemplate[] = await tpFetch('/api/template')

	return (
		<div>
			<div className='my-2 px-3'>
				<h1 className='text-center text-2xl font-semibold'>Find high quality local meme templates</h1>
			</div>
			<div className='p-3 flex flex-col gap-6'>
				{_.map(templates, (tp, idx) => (
					<TpCard tp={tp} playable />
				))}
			</div>
		</div>
	)
}
