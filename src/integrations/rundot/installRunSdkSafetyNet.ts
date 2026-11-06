import { AccessDeniedError, RundotApiError } from '@series-inc/rundot-game-sdk';

let installed = false;

const SDK_ERROR_NAMES = new Set([
  'AccessDeniedError',
  'RundotApiError',
  'RateLimitedError',
]);

function isRunSdkRejection(reason: unknown): boolean {
  if (reason instanceof AccessDeniedError || reason instanceof RundotApiError) {
    return true;
  }

  if (typeof reason !== 'object' || reason === null) {
    return false;
  }

  const error = reason as { name?: unknown; stack?: unknown };

  if (typeof error.name === 'string' && SDK_ERROR_NAMES.has(error.name)) {
    return true;
  }

  return (
    typeof error.stack === 'string' &&
    (error.stack.includes('@series-inc/rundot-game-sdk') ||
      error.stack.includes('/rundot-game-sdk/'))
  );
}

/**
 * Last-resort safety net for RUN.game SDK rejections only.
 *
 * Application rejections are left untouched so they still surface.
 * Still wrap individual SDK calls with catchVoid() or sdkCall().
 */
export function installRunSdkSafetyNet(): void {
  if (installed || typeof window === 'undefined') {
    return;
  }

  installed = true;

  window.addEventListener('unhandledrejection', (event) => {
    if (!isRunSdkRejection(event.reason)) {
      return;
    }

    console.warn('[RUN.game SDK] unhandled rejection:', event.reason);
    event.preventDefault();
  });
}
