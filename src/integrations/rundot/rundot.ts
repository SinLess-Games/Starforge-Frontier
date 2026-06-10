import RundotGameAPI from '@series-inc/rundot-game-sdk/api';

import { catchVoid, sdkCall } from './sdkSafety';

export { RundotGameAPI };

export const rundotFireAndForget = {
  log: (...args: Parameters<typeof RundotGameAPI.log>): void => {
    catchVoid(RundotGameAPI.log(...args), 'log');
  },

  haptic: (...args: Parameters<typeof RundotGameAPI.triggerHapticAsync>): void => {
    catchVoid(RundotGameAPI.triggerHapticAsync(...args), 'triggerHapticAsync');
  },

  toast: (...args: Parameters<typeof RundotGameAPI.popups.showToast>): void => {
    catchVoid(RundotGameAPI.popups.showToast(...args), 'popups.showToast');
  },

  analyticsEvent: (
    ...args: Parameters<typeof RundotGameAPI.analytics.recordCustomEvent>
  ): void => {
    catchVoid(
      RundotGameAPI.analytics.recordCustomEvent(...args),
      'analytics.recordCustomEvent',
    );
  },
};

export async function rundotCall<T>(
  label: string,
  operation: () => Promise<T>,
  fallback?: T,
): Promise<T | undefined> {
  return sdkCall(label, operation, {
    fallback,
  });
}