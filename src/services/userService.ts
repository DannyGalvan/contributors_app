import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { UserRequest } from '@app-types/UserRequest';
import { UserResponse } from '@app-types/UserResponse';

export const createUser = async (data: UserRequest) => {
  const response = await marksApi.post<any, ApiResponse<UserResponse>>(
    '/User',
    data,
  );

  return response;
};
