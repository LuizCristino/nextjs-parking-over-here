/**
 * Function to delay an action to be executed into the future
 * @param ms delay in milliseconds
 * @param reject should reject instead of resolve
 * @returns
 */
export const delay = (ms: number, reject = false) =>
  new Promise((res, rej) => setTimeout(reject ? rej : res, ms));
