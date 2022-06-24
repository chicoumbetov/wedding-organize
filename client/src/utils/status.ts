export const IDLE = 'IDLE';
export const PENDING = 'PENDING';
export const LOADING = 'LOADING';
export const SUCCESS_FETCH = 'SUCCESS_FETCH';
export const SUCCESS_CREATE = 'SUCCESS_CREATE';
export const SUCCESS_CHECK = 'SUCCESS_CHECK';
export const SUCCESS_UPDATE = 'SUCCESS_UPDATE';
export const SUCCESS_DELETE = 'SUCCESS_DELETE';
export const ERROR = 'ERROR';

export const isIdle = (status: Status) => status === IDLE;
export const isPending = (status: Status) => status === PENDING;
export const isLoading = (status: Status) => status === LOADING;
export const isSuccessFetch = (status: Status) => status === SUCCESS_FETCH;
export const isSuccessCreate = (status: Status) => status === SUCCESS_CREATE;
export const isSuccessCheck = (status: Status) => status === SUCCESS_CHECK;
export const isSuccessUpdate = (status: Status) => status === SUCCESS_UPDATE;
export const isSuccessDelete = (status: Status) => status === SUCCESS_DELETE;
export const isError = (status: Status) => status === ERROR;

export type Status =
    | typeof IDLE
    | typeof PENDING
    | typeof LOADING
    | typeof SUCCESS_FETCH
    | typeof SUCCESS_CREATE
    | typeof SUCCESS_CHECK
    | typeof SUCCESS_UPDATE
    | typeof SUCCESS_DELETE
    | typeof ERROR;
