export const SITE_NAME = 'Святе Письмо';

export const SITE_DESCRIPTION = 'Святе Письмо у перекладі отця Івана Хоменка';

// The public origin of the site. Reuses the auth URL, which is already the
// production origin in every environment.
export const SITE_URL = (process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
);
