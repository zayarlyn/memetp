import { GetObjectCommand, ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: { accessKeyId: process.env.AWS_ACCESS_KEY as string, secretAccessKey: process.env.AWS_SECRET_KEY as string },
// });
// const Bucket = process.env.AWS_S3_BUCKET;

// const listMp4Cmd = new ListObjectsCommand({ Bucket, EncodingType: 'url', Delimiter: '/png' });

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_S3_REGION'),
      credentials: { accessKeyId: this.configService.get('AWS_ACCESS_KEY'), secretAccessKey: this.configService.get('AWS_SECRET_KEY') },
    });
    this.bucket = this.configService.get('AWS_S3_BUCKET');
  }

  async getS3ObjectUrl({ key, promise = false }: { key: string; promise: boolean }) {
    const getObjectCmd = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    const prom = getSignedUrl(this.s3, getObjectCmd, { expiresIn: 3600 });
    return promise ? prom : await prom;
  }
}
