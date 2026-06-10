type CatchableThenable = {
  catch: (onRejected: (reason: unknown) => unknown) => unknown;
};

function isCatchableThenable(value: unknown): value is CatchableThenable {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    'catch' in value &&
    typeof (value as { catch?: unknown }).catch === 'function'
  );
}

/**
 * Attach .catch() to any thenable returned by a fire-and-forget RUN.game SDK call.
 *
 * Use this for SDK calls where the game does not need a returned value:
 * log, analytics, haptics, toasts, lightweight tracking calls, etc.
 */
export function catchVoid(result: unknown, label: string): void {
  try {
    if (!isCatchableThenable(result)) {
      return;
    }

    void result.catch((error) => {
      console.warn(`[RUN.game SDK] ${label}:`, error);
    });
  } catch {
    // Defensive: SDK safety code should never throw.
  }
}

/**
 * Wrap awaited RUN.game SDK calls.
 *
 * Use this for SDK calls where the game needs a result:
 * storage, ads, purchases, subscriptions, entitlements, currency, etc.
 */
export async function sdkCall<T>(
  label: string,
  operation: () => Promise<T>,
  options: {
    fallback?: T;
    rethrow?: boolean;
  } = {},
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    console.warn(`[RUN.game SDK] ${label}:`, error);

    if (options.rethrow) {
      throw error;
    }

    return options.fallback;
  }
}