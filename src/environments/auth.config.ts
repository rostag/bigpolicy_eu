// src/app/auth/auth.config.ts
import { ENV } from './env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J',
  CLIENT_DOMAIN: 'bigpolicy.eu.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'https://bigpolicy.eu.auth0.com/api/v2/', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/profile`,
  SCOPE: 'openid profile'
};