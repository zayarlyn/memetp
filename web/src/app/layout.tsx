import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import Header from '@components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<AntdRegistry>
				<body className={inter.className + ' flex flex-col h-screen '}>
					<Header />
					<main className='overflow-auto'>{children}</main>
				</body>
			</AntdRegistry>
		</html>
	)
}