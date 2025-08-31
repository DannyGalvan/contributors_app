import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { PermitterMarks } from '@app-types/PermitterMarks';
import { filterOptions } from '@app-types/FilterOptions';

export const getLocationByEmployeeCode = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<PermitterMarks[]> => {
  let baseQuery = `PermittedMarkings?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&include=${encodeURIComponent(include)}`;
  }
  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return (await marksApi.get<unknown, ApiResponse<PermitterMarks[]>>(baseQuery))
    .data;
};
