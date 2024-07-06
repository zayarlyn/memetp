import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const Header = () => {
	return (
		<header className='flex items-center justify-between p-2 px-3'>
			<Link href='/'>
				<span className='font-mono tracking-wide'>MEMETP</span>
			</Link>
			<Button className='ml-auto' size='large'>
				Login
			</Button>
		</header>
	)
}

export default Header
