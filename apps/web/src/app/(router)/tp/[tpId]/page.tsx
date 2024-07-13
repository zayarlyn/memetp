import { Button } from 'antd'

import { TpCard } from '@components/app'
import { tpFetch } from '@util/core'
import Title from 'antd/es/typography/Title'
import { ITemplate } from 'types/api'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
export default async function Home({ params }: any) {
	const tp: ITemplate = await tpFetch('/api/template/' + params.tpId)

	return (
		<div className='px-3'>
			<div className='mt-2'>
				<Title level={2} className='text-center'>
					Find high quality meme templates
				</Title>
			</div>
			<TpCard tp={tp} autoplay details />

			<div className='mt-5'>
				<a href={serverUrl + '/api/file/download/' + tp.s3Objects[0].id} download>
					<Button type='primary' block>
						Download
					</Button>
				</a>
			</div>
		</div>
	)
}
