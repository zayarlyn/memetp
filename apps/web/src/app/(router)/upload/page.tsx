'use client'

import { Button, Input } from 'antd'
import _ from 'lodash'
import { useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

import { IconFileUpload } from '@tabler/icons-react'
import { tpFetch } from '@util/core'

// [
// 		{
// 			path: 'github.com_zayarlyn_tab=overview&from=2024-06-01&to=2024-06-29.png',
// 			preview: 'blob:http://localhost:3000/b5976831-7561-428d-bb13-e070396020d1',
// 		},
// 		{
// 			path: 'meet.google.com_mop-hftn-ged.png',
// 			preview: 'blob:http://localhost:3000/7a5480f0-4544-46c1-aa85-35c8a4744f5e',
// 		},
// 		{
// 			path: 'github.com_mnutha.png',
// 			preview: 'blob:http://localhost:3000/c2c63eb0-b6f7-4cad-9080-a536fe93f645',
// 		},
// 	]

const uploadFile = (files: File[]) => {
	const fd = new FormData()
	for (const file of files) {
		fd.append('files', file)
	}
	return tpFetch('/api/file/upload', { method: 'POST', body: fd })
}

interface IFileWithPreview extends File {
	preview: string
}

const Page = () => {
	const [files, setFiles] = useState<IFileWithPreview[]>([])
	const [s3ObjectKeys, setS3ObjectKeys] = useState<string[]>([])
	const [title, setTitle] = useState('')

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: async (acceptedFiles) => {
			setFiles((prev) => [
				...prev,
				...(acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				) as IFileWithPreview[]),
			])

			const data = await uploadFile(acceptedFiles)
			setS3ObjectKeys((prev) => [...prev, ...data.filenames])
		},
	})

	const createTemplate = () => {
		if (!title) return
		tpFetch('/api/template', { method: 'POST', body: JSON.stringify({ title, s3ObjectKeys }), headers: { 'Content-Type': 'application/json' } })
	}

	return (
		<div className='p-3'>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Enter template title'
				className='input input-bordered input-sm w-full focus:border-blue-300 focus:outline-none rounded-md mb-2'
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

			<div className='mt-3'>
				<Button onClick={createTemplate} type='primary' block>
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
