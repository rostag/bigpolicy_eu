import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as config from 'config';

@Injectable()
export class CheckJwtMiddleware implements NestMiddleware {
  public resolve(...args: any[]): MiddlewareFunction {
    return jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.get('AUTH0_DOMAIN')}/.well-known/jwks.json`,
      }),
      audience: config.get('AUTH0_API_AUDIENCE'),
      issuer: `https://${config.get('AUTH0_DOMAIN')}/`,
      algorithms: ['RS256'],
    });
  }
}
