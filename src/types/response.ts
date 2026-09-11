export interface ErrorDetail {
  field: string;
  message: string;
}

export interface ErrorInfo {
  codeMsg: string;
  details: ErrorDetail[];
}

export interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  error: null;
}

export interface FailureResponse {
  success: false;
  message: string;
  data: null;
  error: ErrorInfo;
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | FailureResponse;