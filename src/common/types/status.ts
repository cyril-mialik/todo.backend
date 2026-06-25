import { STATUSES } from '../constants';

export type Status = (typeof STATUSES)[keyof typeof STATUSES];
