export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitUntil(
  conditionFn,
  { timeout = 1000, interval = 50 } = {},
) {
  const startTime = Date.now();
  while (true) {
    if (conditionFn()) {
      return; // Condition is true, exit
    }

    if (Date.now() - startTime > timeout) {
      throw new Error(`waitUntil timed out after ${timeout}ms`);
    }

    await wait(interval); // Wait before checking again
  }
}
