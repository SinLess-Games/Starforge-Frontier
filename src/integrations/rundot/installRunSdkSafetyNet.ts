let installed = false;

/**
 * Last-resort global safety net.
 *
 * This prevents a missed SDK rejection from crashing the host.
 * Still wrap individual SDK calls with catchVoid() or sdkCall().
 */
export function installRunSdkSafetyNet(): void {
  if (installed || typeof window === 'undefined') {
    return;
  }

  installed = true;

  window.addEventListener('unhandledrejection', (event) => {
    console.warn('[RUN.game SDK] unhandled rejection:', event.reason);
    event.preventDefault();
  });
}