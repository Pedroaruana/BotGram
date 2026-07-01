const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';

export const environment = {
  production: !isDev,
  apiUrl: isDev ? 'http://localhost:8787' : 'https://botgram-api.pedroaruana.workers.dev',
};
