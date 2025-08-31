import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { ViewVacationDays } from '@app-types/ViewVacationDays';
import { filterOptions } from '@app-types/FilterOptions';

export const getAllVacationsDays = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<ViewVacationDays[]> => {
  let baseQuery = `VacationDays?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&include=${encodeURIComponent(include)}`;
  }
  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return (
    await marksApi.get<unknown, ApiResponse<ViewVacationDays[]>>(baseQuery)
  ).data;
};
