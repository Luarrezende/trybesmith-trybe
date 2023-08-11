export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    SUCCESSFUL: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    INVALID_USER: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
  };
  return statusHTTPMap[status] ?? 500;
}