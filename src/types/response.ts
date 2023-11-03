interface ApiResponseSuccess<T> {
  success: boolean;
  data: T;
}
export interface Token {
  accessToken: {
    token: string;
    expireDate: number;
  };
  refreshToken: {
    token: string;
    expireDate: number;
  };
}
export interface ApiResponseFailure {
  success: false;
  errors: {
    message: string;
    errorCode: number;
    field?: string;
  }[];
}
export type RegisterResponse = ApiResponseSuccess<{
  message: string;
}>;
export type RefreshResponse = ApiResponseSuccess<{
  message: string;
  token: Token;
}>;

export type ProfileResponse = ApiResponseSuccess<{
  email: string;
  role: "USER" | "ADMIN";
  profile: {
    name: string;
    phoneNumber?: string;
    contactEmail?: string;
  };
}>;
