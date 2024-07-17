import { Button } from 'antd'

import { TpCard } from '@components/app'
import { tpFetch } from '@util/core'
import { ITemplate } from 'types/api'
import { IconPencil } from '@tabler/icons-react'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
export default async function Home({ params }: any) {
	const tp: ITemplate = await tpFetch('/api/template/' + params.tpId)

	return (
		<div className='px-3'>
			<div className='my-4 flex'>
				{/* <a className=' ml-auto text-sm text-blue-500 flex items-center gap-1 cursor-pointer'>
					Contribute
					<IconPencil stroke={1.5} size={20} />
				</a> */}
			</div>
			<TpCard tp={tp} details />

			<div className='mt-5'>
				<a href={serverUrl + '/api/file/download/' + tp.s3Objects[0].id} download>
					<Button type='primary' block>
						Download
					</Button>
				</a>
				<a>
					<Button type='text' block>
						Share
					</Button>
				</a>
			</div>
		</div>
	)
}
