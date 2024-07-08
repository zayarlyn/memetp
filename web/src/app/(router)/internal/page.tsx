'use client'

import { IconFileUpload } from '@tabler/icons-react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { useState } from 'react'
import { Button } from 'antd'
import _ from 'lodash'
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

const Page = () => {
	const [files, setFiles] = useState<FileWithPath[]>([])
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			setFiles((prev) => [
				...prev,
				...acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				),
			])
		},
	})

	const uploadFile = () => {
		const fd = new FormData()
		for (const file of files) {
			fd.append('files', file)
			// file.
		}
		console.log('all', fd.getAll('files'))
		tpFetch('http://localhost:5050/api/file/upload', { method: 'POST', body: fd })
	}
	console.log(files)

	return (
		<div className='p-3'>
			<div {...getRootProps({})} className='border-dashed border-[1.5px] h-40 grid place-items-center hover:border-blue-300 active:border-blue-400 cursor-pointer'>
				<input {...getInputProps()} />
				{/* <p>Drag and drop some files here, or click to select files</p> */}
				<IconFileUpload size={50} stroke={1} />
			</div>

			<div className='mt-3 flex overflow-auto gap-2'>
				{_.map(files, (file) => (
					<div key={file.name} className='h-40 aspect-square p-1 border-[1.5px] grid place-items-center'>
						<img
							src={file.preview}
							// style={img}
							// Revoke data uri after image is loaded
							// onLoad={() => {
							// 	URL.revokeObjectURL(file.preview)
							// }}
						/>
					</div>
				))}
			</div>

			<div className='mt-3'>
				<Button onClick={uploadFile} type='primary' block>
					Upload
				</Button>
			</div>
		</div>
	)
}

export default Page
