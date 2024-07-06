import { IconDownload } from '@tabler/icons-react'
import { Button, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'

const TpCard = ({ vid, autoplay }: { vid: string; autoplay?: boolean }) => {
	console.log(vid)

	return (
		<Button className='p-0 h-auto' style={{ height: 'auto', padding: 8 }} block>
			<div>
				<video src={vid} playsInline autoPlay={autoplay} />
				<div className='mt-1'>
					<Typography style={{ whiteSpace: 'wrap' }}>{vid}</Typography>
					<div>
						<IconDownload />
					</div>
				</div>
			</div>
		</Button>
	)
}

export default TpCard
