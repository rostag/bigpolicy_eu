// src/app/auth/auth.config.ts
import { ENV } from '../../../environments/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J',
  CLIENT_DOMAIN: 'bigpolicy.eu.auth0.com',
  AUDIENCE: 'http://bigpolicy.eu/api/',
  REDIRECT: `${ENV.BASE_URI}/profile`,
  SCOPE: 'openid profile user_id name nickname email picture',
  NAMESPACE: 'https://bigpolicy.eu/roles'
};