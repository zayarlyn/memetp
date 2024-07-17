import { Button } from 'antd'
import _ from 'lodash'
import React from 'react'
import { ITemplate } from 'types/api'

import { IconDownload, IconHeart } from '@tabler/icons-react'

export const TpCard = ({ tp, autoplay, details = false }: { tp: ITemplate; autoplay?: boolean; details?: boolean }) => {
	const s3Object = _.head(tp.s3Objects)

	return (
		<div className='p-2 border-[1.5px] rounded-md h-auto hover:border-blue-400 active:border-blue-500'>
			<div className='w-full'>
				<div className='h-40 grid place-items-center'>
					{s3Object?.mimetype.startsWith('video') ? (
						<video src={s3Object?.url} autoPlay={autoplay} className='h-40' />
					) : (
						<img src={s3Object?.url} alt={tp.title} className='h-40' />
					)}
				</div>
				<div className='mt-1.5 flex items-center justify-between'>
					<div className='mr-auto'>
						<p className='text-slate-800 text-left text-base'>{tp.title}</p>
						<div className='flex items-center gap-3 text-slate-500 mt-0.5'>
							<div className='flex items-center gap-0.5'>
								<span className='text-sm'>{tp.likes}</span>
								<IconHeart size={16} />
							</div>
							<div className='flex items-center gap-0.5'>
								<span className='text-sm'>{tp.downloads}</span>
								<IconDownload size={16} />
							</div>
						</div>
					</div>
					{/* <button className='btn btn-primary btn-sm'>Normal</button> */}
					{!details && (
						<Button type='primary' size='middle'>
							Download
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
