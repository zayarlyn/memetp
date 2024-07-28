import { TpCard } from '@components/app'
import { tpFetch } from '@util/core'
import type { ITemplate } from 'types/api'
import type { Metadata } from 'next'
import _ from 'lodash'

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const tp: ITemplate = await tpFetch('/api/template/' + params.tpId)

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || []

	return {
		title: `memetp | ${tp.title}`,
		openGraph: {
			images: _.map(tp.s3Objects, 'url'),
		},
		// openGraph: {
		//   images: ['/some-specific-page-image.jpg', ...previousImages],
		// },
	}
}

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
			<TpCard tp={tp} details playable />

			<div className='mt-5'>
				<a href={serverUrl + '/api/file/download/' + tp.s3Objects[0].id} download>
					<button className='btn-primary w-full'>Download</button>
				</a>
				<a>
					<button className='btn-outlined w-full mt-2'>Share</button>
				</a>
			</div>
		</div>
	)
}
