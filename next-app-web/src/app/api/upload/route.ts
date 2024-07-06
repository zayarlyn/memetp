import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client, _Object } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import _ from 'lodash'
import { NextRequest, NextResponse } from 'next/server'

const s3 = new S3Client({
	region: process.env.AWS_S3_REGION,
	credentials: { accessKeyId: process.env.AWS_ACCESS_KEY as string, secretAccessKey: process.env.AWS_SECRET_KEY as string },
})
const Bucket = process.env.AWS_S3_BUCKET

const listMp4Cmd = new ListObjectsCommand({ Bucket, Delimiter: '.png', EncodingType: 'url' })
export const getS3Objects = async () => {
	const raw = await s3.send(listMp4Cmd)
	// const result: { Key: string; signedUrl: string }[] = []
	const objects = _.get(raw, 'Contents', [])
	const signedUrls = await Promise.all(
		_.map(objects, (object: _Object) => {
			const getObjectParams = {
				Bucket,
				Key: object.Key,
			}

			const cmd = new GetObjectCommand(getObjectParams)

			return getSignedUrl(s3, cmd, { expiresIn: 3600 })
		})
	)

	return signedUrls
}

export async function GET() {
	const response = await getS3Objects()
	return NextResponse.json(response ?? [])
}

export async function POST(request: NextRequest) {
	const formData = await request.formData()
	const files = formData.getAll('file') as File[]

	const response = await Promise.all(
		files.map(async (file) => {
			// not sure why I have to override the types here
			const Body = (await file.arrayBuffer()) as Buffer
			s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }))
		})
	)

	return NextResponse.json(response)
}
