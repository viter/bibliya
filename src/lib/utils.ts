export { cn } from 'cn';

/**
 * Only allow same-site relative paths (e.g. "/tsytaty"), rejecting anything
 * that could redirect off-site (absolute URLs, protocol-relative "//host").
 */
export function safeRedirectPath(path: string | undefined, fallback = '/'): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return fallback;
  }
  return path;
}
