import { TemplateModel } from '@db/models';
import { Body, Injectable, Req } from '@nestjs/common';
import _ from 'lodash';
import { S3Service } from 'src/services/s3.service';
import { ITemplate } from './template.ctype';

@Injectable()
export class TemplateService {
  constructor(private s3Service: S3Service) {}

  async getTemplates({ id }: { id?: string }): Promise<ITemplate[]> {
    const where = id ? { id } : undefined;
    const dbTemplates = await TemplateModel.findAll({ where });
    const templates = _.map(dbTemplates, (tp) => tp.toJSON());
    const s3Urls = await Promise.all(_.map(templates, (tp) => this.s3Service.getS3ObjectUrl({ key: tp.s3Object, promise: true })));
    const result = _.map(templates, (tp, idx) => ({ ...tp, url: s3Urls[idx] }));
    return result;
  }
}
