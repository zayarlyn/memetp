'use client'

import { Button, Input } from 'antd'
import _ from 'lodash'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { IconFileUpload } from '@tabler/icons-react'
import { useTpFetch } from '@tp/hooks'

interface IFileWithPreview extends File {
	preview: string
}

const Page = () => {
	const [files, setFiles] = useState<IFileWithPreview[]>([])
	const [s3ObjectKeys, setS3ObjectKeys] = useState<string[]>([])
	const [title, setTitle] = useState('')

	const [uploadFile, fileUploading, fileUploadError] = useTpFetch('/api/file/upload', { method: 'POST' })
	const [uploadTp, tpUploading, tpUploadError] = useTpFetch('/api/template', { method: 'POST', headers: { 'Content-Type': 'application/json' } })

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: { 'video/mp4': ['.mp4'] },
		onDrop: async (acceptedFiles) => {
			setFiles((prev) => [
				...prev,
				...(acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				) as IFileWithPreview[]),
			])

			const body = new FormData()
			for (const file of acceptedFiles) {
				body.append('files', file)
			}

			const data = await uploadFile({ body })
			setS3ObjectKeys((prev) => [...prev, ...data.filenames])
		},
	})

	const createTemplate = () => {
		// if (!title) return
		uploadTp({ body: JSON.stringify({ title, s3ObjectKeys }) })
	}

	return (
		<div className='p-3'>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Enter template title'
				className='input input-bordered input-sm w-full focus:border-blue-300 focus:outline-none rounded-md mb-2'
				disabled={fileUploading || tpUploading}
			/>

			<div {...getRootProps({})} className='border-dashed border-[1.5px] h-40 grid place-items-center hover:border-blue-300 active:border-blue-400 cursor-pointer'>
				<input {...getInputProps()} />
				<IconFileUpload size={50} stroke={1} />
			</div>

			<div className='mt-3 flex overflow-auto gap-2'>
				{_.map(files, (file) => {
					return (
						<div key={file.name} className='h-40 aspect-square p-1 border-[1.5px] grid place-items-center'>
							{file.type.startsWith('video') ? <video src={file.preview} /> : <img src={file.preview} />}
						</div>
					)
				})}
			</div>

			<span className='text-sm text-red-500'>{fileUploadError || tpUploadError}</span>
			<div className='mt-3'>
				<Button onClick={createTemplate} type='primary' block disabled={fileUploading || tpUploading}>
					Upload
				</Button>
			</div>
		</div>
	)
}

export default Page

// {
//   "path": "sa-dr-pr-byr.mp4",
//   "preview": "blob:http://localhost:3000/625c9894-490a-42eb-859c-1e596b8335dd"
// }
