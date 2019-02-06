import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as config from 'config';
import { NextFunction, Request, Response } from 'express';

export interface IContext {
  user: any;
}

export interface IContextProvider {
  context: IContext;
}

@Injectable()
export class ACLMiddleware implements NestMiddleware {
  public resolve(...args: any[]): MiddlewareFunction {
    return async (req: Request & IContextProvider, res: Response, next: NextFunction): Promise<any> => {
      const roles = req.user[config.NAMESPACE] || [];
      // tslint:disable-next-line:no-console
      console.log('Roles:', roles, req.user);

      if (roles.indexOf('admin') > -1) {
        next();
      } else {
        res.status(401).send({message: 'Not authorized for admin access'});
      }
    };
  }
}
