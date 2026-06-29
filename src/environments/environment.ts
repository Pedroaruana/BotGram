const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';

export const environment = {
  production: !isDev,
  apiUrl: isDev ? 'http://localhost:3000' : 'https://botgram-api.fly.dev',
};
