
interface IDefault {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

interface IS3Object extends IDefault {
  id: string
  filename: string
  mimetype: string
  size: number
  modelName: string
  modelId: string
  width: number
  height: number

  url: string
}
export interface ITemplate extends IDefault {
  id: number
  title: string
  likes: number
  downloads: number

  s3Objects: IS3Object[]
}

export interface ITemplateCreate {
  title: string
  s3ObjectKeys: string[]
}
