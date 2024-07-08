export interface ITemplate {
  id: number;
  title: string;
  s3Object: string;
  likes: number;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  url: string;
}

export interface ITemplateCreate {
  title: string;
  s3ObjectKeys: string[];
}
