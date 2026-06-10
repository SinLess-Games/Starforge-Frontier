import { AccessDeniedError } from '@series-inc/rundot-game-sdk';

import { RundotGameAPI } from './rundot';

export type RunAccessTier = 'anonymous' | 'authenticated_18plus';

export type RunAccessDeniedAction = 'prompt_login' | 'prompt_age_gate' | string;

export interface RunPromptLoginResult {
  success: boolean;
  profile?: unknown;
}

export interface RunAccessDeniedInfo {
  error: unknown;
  requiredTier?: RunAccessTier | string;
  action?: RunAccessDeniedAction;
}

export type RunGatedCallResult<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      reason: 'access-denied';
      access: RunAccessDeniedInfo;
    }
  | {
      ok: false;
      reason: 'sdk-error';
      error: unknown;
    };

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

export function getRunAccessDeniedInfo(error: unknown): RunAccessDeniedInfo | undefined {
  if (error instanceof AccessDeniedError) {
    return {
      error,
      requiredTier: error.requiredTier,
      action: error.action,
    };
  }

  if (!isObject(error)) {
    return undefined;
  }

  const requiredTier = error.requiredTier;
  const action = error.action;

  if (typeof requiredTier !== 'string' && typeof action !== 'string') {
    return undefined;
  }

  return {
    error,
    requiredTier: typeof requiredTier === 'string' ? requiredTier : undefined,
    action: typeof action === 'string' ? action : undefined,
  };
}

export function configureRunAccessGate(options: { autoPromptLogin?: boolean } = {}): void {
  try {
    RundotGameAPI.accessGate.autoPromptLogin = options.autoPromptLogin ?? true;
  } catch (error) {
    console.warn('[RUN.game SDK] accessGate.configure failed:', error);
  }
}

export function getRunAccessTier(): RunAccessTier {
  try {
    return RundotGameAPI.accessGate.getAccessTier();
  } catch (error) {
    console.warn('[RUN.game SDK] accessGate.getAccessTier failed:', error);
    return 'anonymous';
  }
}

export function isRunAnonymous(): boolean {
  try {
    return RundotGameAPI.accessGate.isAnonymous();
  } catch (error) {
    console.warn('[RUN.game SDK] accessGate.isAnonymous failed:', error);
    return true;
  }
}

export async function promptRunLogin(): Promise<RunPromptLoginResult> {
  try {
    return await RundotGameAPI.accessGate.promptLogin();
  } catch (error) {
    console.warn('[RUN.game SDK] accessGate.promptLogin failed:', error);

    return {
      success: false,
    };
  }
}

/**
 * Use this for premium gated SDK calls.
 *
 * Do not pre-block the call here. Let the SDK Access Gate do its job,
 * then catch AccessDeniedError so the game can fall back cleanly.
 */
export async function runGatedSdkCall<T>(
  label: string,
  operation: () => Promise<T>,
): Promise<RunGatedCallResult<T>> {
  try {
    return {
      ok: true,
      value: await operation(),
    };
  } catch (error) {
    const access = getRunAccessDeniedInfo(error);

    if (access) {
      console.warn(
        `[RUN.game SDK] ${label} blocked:`,
        access.requiredTier,
        access.action,
      );

      return {
        ok: false,
        reason: 'access-denied',
        access,
      };
    }

    console.warn(`[RUN.game SDK] ${label} failed:`, error);

    return {
      ok: false,
      reason: 'sdk-error',
      error,
    };
  }
}