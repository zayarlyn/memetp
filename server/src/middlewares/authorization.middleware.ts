import { NextFunction, Request, Response } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...')
    next()
  }
}
