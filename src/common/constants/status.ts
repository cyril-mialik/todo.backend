export const CREATED_STATUS = 'created';
export const PROGRESS_STATUS = 'progress';
export const COMPLETED_STATUS = 'completed';
export const CANCELLED_STATUS = 'cancelled';

export const STATUSES = {
  CREATED: CREATED_STATUS,
  PROGRESS: PROGRESS_STATUS,
  COMPLETED: COMPLETED_STATUS,
  CANCELLED: CANCELLED_STATUS,
} as const;

export const DEFAULT_STATUS = STATUSES.CREATED;
