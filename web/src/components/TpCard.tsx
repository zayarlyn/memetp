import { IconDownload } from '@tabler/icons-react'
import { Button, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'
import { ITemplate } from '../types/api/apiTypes'

const TpCard = ({ tp, autoplay }: { tp: ITemplate; autoplay?: boolean }) => {
	return (
		<Button className='p-0 h-auto' style={{ height: 'auto', padding: 8 }} block>
			<div>
				<video src={tp.url} playsInline autoPlay={autoplay} />
				<div className='mt-1'>
					<Typography style={{ whiteSpace: 'wrap' }}>{tp.title}</Typography>
					<div>
						<IconDownload />
					</div>
				</div>
			</div>
		</Button>
	)
}

export default TpCard
