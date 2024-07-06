import TpCard from '@components/TpCard'
import Title from 'antd/es/typography/Title'
import Link from 'next/link'
import { getS3Objects } from './api/upload/route'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const vids = ['/bar-tone-ha.mp4', '/lawkadan.mp4', 'sa-dr-pr-byr.mp4']

export default async function Home() {
	const s3Objects = await getS3Objects()
	// const mp4s = s3Objects?.map((s3) => ({ id: s3.Key, url: `https://inkdrop-dev-common.s3.ap-southeast-1.amazonaws.com/${s3.Key}` }))
	// https://inkdrop-dev-common.s3.ap-southeast-1.amazonaws.com/bar-tone-ha.mp4

	return (
		<div>
			<div className='mt-2'>
				<Title level={2} className='text-center'>
					Find high quality local meme templates
				</Title>
			</div>
			<div className='p-3 flex flex-col gap-6'>
				{[...s3Objects, ...vids].map((vid, idx) => (
					<Link key={idx} href={`tp/${vid.split('.')[0]}`}>
						<TpCard vid={vid} />
					</Link>
				))}
			</div>
		</div>
	)
}
