import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env';

export const AUTH0_CONFIG = {
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  scope: 'openid profile email'
};