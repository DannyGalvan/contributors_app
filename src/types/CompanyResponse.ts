export interface CompanyResponse {
  id: number;
  name: string;
  countryId: number;
  state: number;
  createdBy: number;
  updatedBy: number | null;
  createdAt: string;
  updatedAt: string | null;
}
