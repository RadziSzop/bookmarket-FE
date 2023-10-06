interface ApiResponseSuccess<T> {
  response: {
    success: boolean;
    data: T;
  };
}
export interface ApiResponseFailure {
  response: {
    success: false;
    errors: {
      message: string;
      errorCode: number;
      field?: string;
    }[];
  };
}
export type RegisterResponse = ApiResponseSuccess<{
  message: string;
}>;
export type VerifyResponse = ApiResponseSuccess<{
  message: string;
  token: {
    accessToken: {
      token: string;
      expireDate: number;
    };
    refreshToken: {
      token: string;
      expireDate: number;
    };
  };
}>;
