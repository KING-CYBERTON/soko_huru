/**
 * Response Utilities
 *
 * Helper functions for creating consistent JSON responses across the API.
 */

/**
 * Success response
 * Returns { success: true, data: ... }
 */
export const ok = (data: unknown) =>
  Response.json({ success: true, data });

/**
 * Error response
 * Returns { success: false, error: ... } with appropriate status code
 */
export const err = (message: string, status = 400) =>
  Response.json({ success: false, error: message }, { status });
