'use client'
import ProgressBar from '@badrap/bar-of-progress'
import {} from 'next/navigation'
import React from 'react'

const progress = new ProgressBar({
	size: 4,
	color: '#805AD5',
	delay: 100,
})

// Router.events.on('routeChangeStart', progress.start)
// Router.events.on('routeChangeComplete', progress.finish)
// Router.events.on('routeChangeError', progress.finish)

const TopLoader = () => {
	return null
}

export default TopLoader
