import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { OvertimeRequest } from '@app-types/OvertimeRequest';
import { OvertimeResponse } from '@app-types/OvertimeResponse';

export const createOvertimeWork = async (overtimeWork: OvertimeRequest) => {
  const response = await marksApi.post<any, ApiResponse<OvertimeResponse>>(
    'OvertimeWork',
    overtimeWork,
  );

  return response;
};
