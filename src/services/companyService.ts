import { marksApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/ApiResponse';
import { CompanyResponse } from '@app-types/CompanyResponse';

export const getCompanies = async (countryId?: number): Promise<CompanyResponse[]> => {
  const filterStr = countryId
    ? `State:eq:1 AND CountryId:eq:${countryId}`
    : 'State:eq:1';
  const filters = encodeURIComponent(filterStr);
  const response = await marksApi.get<any, ApiResponse<CompanyResponse[]>>(
    `/Company?filters=${filters}&pageNumber=1&pageSize=50`,
  );
  return response.data ?? [];
};
