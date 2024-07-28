'use client'

import _ from 'lodash'
import React, { useEffect, useRef } from 'react'
import { ITemplate } from 'types/api'

import { IconDownload, IconHeart } from '@tabler/icons-react'

export const TpCard = ({ tp, playable = false, details = false }: { tp: ITemplate; playable?: boolean; details?: boolean }) => {
	const s3Object = _.head(tp.s3Objects)
	const vidRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (vidRef.current) vidRef.current.load()
	}, [])

	return (
		<div className='p-2 border-[1.5px] rounded-md h-auto'>
			<div className='w-full'>
				<div className='h-40 grid place-items-center'>
					{s3Object?.mimetype.startsWith('video') ? (
						<video
							playsInline
							className='h-40'
							ref={vidRef}
							onClick={() => {
								// vidRef.current?.load()
								if (!playable) return
								vidRef.current?.play()
							}}
						>
							{/* <source src='https://media.w3.org/2010/05/sintel/trailer.mp4' /> */}
							<source src={s3Object.url} />
						</video>
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
						<a href={`tp/${tp.id}`}>
							<button className='btn-primary'>Download</button>
						</a>
					)}
				</div>
			</div>
		</div>
	)
}
