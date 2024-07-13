import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// NOTE: should return await Promise here since other parts may use Promise.all

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

  async getS3ObjectUrl({ key }: { key: string }) {
    const getObjectCmd = new GetObjectCommand({ Bucket: this.bucket, Key: key })
    return getSignedUrl(this.s3, getObjectCmd, { expiresIn: 3600 * 4 })
  }

  async uploadS3Object({ file }: { file: Express.Multer.File }) {
    const putObjectCmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: file.filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        originalname: file.originalname,
      },
    })
    return this.s3.send(putObjectCmd)
  }
}

// https://inkdrop-dev-common.s3.ap-southeast-1.amazonaws.com/01J2BNTX7H4ZMATG06A1519YSS?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2UC3DE43O42AWWPD%2F20240709%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240709T122507Z&X-Amz-Expires=36000&X-Amz-Signature=399b5274d7b188b515c8adafa410f78125ffa07d344aae3f25c18dd02f3e3556&X-Amz-SignedHeaders=host&x-id=GetObject
