import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { ViewVacationDays } from '@app-types/ViewVacationDays';

export const getAllVacationsDays = async (filters: string) => {
  const response = await marksApi.get<any, ApiResponse<ViewVacationDays[]>>(
    `VacationDays?filters=${filters}&thenInclude=true&pageNumber=1&pageSize=1000`,
  );

  return response.data;
};
