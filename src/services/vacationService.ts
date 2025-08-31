import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { VacationRequest } from '@app-types/VacationRequest';
import { VacationResponse } from '@app-types/VacationResponse';

export const createVacations = async (vacation: VacationRequest) => {
  const response = await marksApi.post<any, ApiResponse<VacationResponse>>(
    'Vacation',
    vacation,
  );

  return response;
};

export const getAllVacations = async (userId: number) => {
  const response = await marksApi.get<any, ApiResponse<VacationResponse[]>>(
    `Vacation??Filters=ContributorId:eq:${userId}&Include=contributor&PageNumber=1&PageSize=1000&IncludeTotal=false`,
  );

  return response;
};
