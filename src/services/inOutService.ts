import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { InOutRequest } from '@app-types/InOutRequest';
import { ValidationFailure } from '@app-types/ValidationFailure';

export const createInOut = async (InOut: InOutRequest) => {
  const response = await marksApi.post<
    any,
    ApiResponse<InOutRequest | ValidationFailure[]>
  >('/inOut', InOut);

  console.log('response', response);

  return response;
};
