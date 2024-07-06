import TpCard from '@components/TpCard'
import Title from 'antd/es/typography/Title'
import { tpFetch } from '../../../page'

const vids = ['./bar-tone-ha.mp4', '/lawkadan.mp4']

export default async function Home({ params }: any) {
	// console.log('layla', params.tpId)
	const tp = await tpFetch('http://localhost:5050/api/template/' + params.tpId)

	return (
		<div className='px-3'>
			<div className='mt-2'>
				<Title level={2} className='text-center'>
					Find high quality meme templates
				</Title>
			</div>
			<TpCard url={tp.url} autoplay />
		</div>
	)
}