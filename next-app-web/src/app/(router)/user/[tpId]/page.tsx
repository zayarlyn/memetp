import TpCard from '@components/TpCard'
import Title from 'antd/es/typography/Title'

const vids = ['./bar-tone-ha.mp4', '/lawkadan.mp4']

export default function Home({ params }: any) {
	console.log('layla', params.tpId)
	return (
		<div>
			<div className='mt-2'>
				<Title level={2} className='text-center'>
					Find high quality meme templates
				</Title>
			</div>
			<TpCard vid={'/' + params.tpId + '.mp4'} autoplay />
		</div>
	)
}
