import { ApiResponse } from '@app-types/ApiResponse';
import { CountryResponse } from '@app-types/CountryResponse';
import { marksApi } from '@config/axiosConfig';

export const getCountries = async (): Promise<CountryResponse[]> => {
  const filters = encodeURIComponent('State:eq:1');
  const response = await marksApi.get<any, ApiResponse<CountryResponse[]>>(
    `/Country?filters=${filters}&pageNumber=1&pageSize=50`,
  );
  return response.data ?? [];
};
