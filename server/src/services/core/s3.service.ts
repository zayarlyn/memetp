import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client, UploadPartCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class S3Service {
  private s3: S3Client
  private bucket: string

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_S3_REGION'),
      credentials: { accessKeyId: this.configService.get('AWS_ACCESS_KEY'), secretAccessKey: this.configService.get('AWS_SECRET_KEY') },
    })
    this.bucket = this.configService.get('AWS_S3_BUCKET')
  }

  async getS3ObjectUrl({ key, promise = false }: { key: string; promise?: boolean }) {
    const getObjectCmd = new GetObjectCommand({ Bucket: this.bucket, Key: key })
    const prom = getSignedUrl(this.s3, getObjectCmd, { expiresIn: 3600 })
    return promise ? prom : await prom
  }

  async uploadS3Object({ file, promise = false }: { file: Express.Multer.File; promise?: boolean }) {
    const putObjectCmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: file.filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        originalname: file.originalname,
      },
    })
    const cmd = this.s3.send(putObjectCmd)
    return promise ? cmd : await cmd
  }
}
