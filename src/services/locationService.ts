import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { PermitterMarks } from '@app-types/PermitterMarks';

export const getLocationByEmployeeCode = async (filters: string) => {
  const response = await marksApi.get<any, ApiResponse<PermitterMarks[]>>(
    `PermittedMarkings?filters=${filters}&thenInclude=true&pageNumber=1&pageSize=100`,
  );

  return response.data;
};
