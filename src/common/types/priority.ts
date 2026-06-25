import { PRIORITIES } from '../constants';

export type Priority = (typeof PRIORITIES)[keyof typeof PRIORITIES];
