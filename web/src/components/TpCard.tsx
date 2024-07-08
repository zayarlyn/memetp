import { IconDownload, IconHeart } from '@tabler/icons-react'
import { Button, Typography } from 'antd'
import React from 'react'
import { ITemplate } from 'types/api'

const TpCard = ({ tp, autoplay }: { tp: ITemplate; autoplay?: boolean }) => {
	return (
		<div className='p-2 border-[1.5px] rounded-md h-auto hover:border-blue-400 active:border-blue-500'>
			<div className='w-full'>
				<video src={tp.url} playsInline autoPlay={autoplay} className='h-40' />
				<div className='mt-1.5 flex items-center justify-between'>
					<div>
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
					<Button type='primary' size='middle'>
						Download
					</Button>
				</div>
			</div>
		</div>
	)
}

export default TpCard
