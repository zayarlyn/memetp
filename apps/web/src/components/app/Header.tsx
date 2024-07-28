import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import LoadingBar from 'react-top-loading-bar'

export const Header = () => {
	return (
		<header className='flex items-center justify-between p-2 px-3 border-b-[1px]'>
			<a href='/'>
				<span className='font-mono tracking-wide'>MEMETP</span>
			</a>
			{/* <Link href='/upload'>
				<button className='btn ml-auto'>Upload</button>
			</Link> */}
			{/* <Link href='/upload'>
				<Button className='ml-auto' size='large'>
					Upload
				</Button>
			</Link> */}
		</header>
	)
}
