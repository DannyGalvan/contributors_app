import { ApiResponse } from '@app-types/ApiResponse';
import { marksApi } from '@config/axiosConfig';

export const getAppValueByKey = async (
  key: string,
): Promise<ApiResponse<AppValuesResponse>> => {
  const response = await marksApi.get<unknown, ApiResponse<AppValuesResponse>>(
    `AppValues/${key}`,
  );

  return response;
};
