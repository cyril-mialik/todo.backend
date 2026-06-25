export const LOW_PRIORITY = 'low';
export const MEDIUM_PRIORITY = 'medium';
export const HIGH_PRIORITY = 'high';

export const PRIORITIES = {
  LOW: LOW_PRIORITY,
  MEDIUM: MEDIUM_PRIORITY,
  HIGH: HIGH_PRIORITY,
} as const;

export const DEFAULT_PRIORITY = PRIORITIES.MEDIUM;
