import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { LoginRequest } from '@app-types/LoginRequest';
import { LoginResponse } from '@app-types/LoginResponse';
import { ValidationFailure } from '@app-types/ValidationFailure';

export const login = async (credentials: LoginRequest) => {
  return await marksApi.post<
    any,
    ApiResponse<LoginResponse | ValidationFailure[]>,
    any
  >('Auth', credentials);
};

export const recoveryPasswordService = async (dpi: string) => {
  return await marksApi.post<any, ApiResponse<string>, any>(
    'Auth/RecoveryPassword',
    { dpi },
  );
};

export const changePasswordService = async (data: ChangePasswordRequest) => {
  return await marksApi.put<any, ApiResponse<string>, any>(
    'Auth/ChangePassword',
    data,
  );
};

export const confirmTokenService = async (token: string) => {
  const encodeToken = encodeURIComponent(token);
  console.log('token', `auth/${encodeToken}`);
  return await marksApi.get<any, ApiResponse<string>, any>(
    `Auth/${encodeToken}`,
  );
};
