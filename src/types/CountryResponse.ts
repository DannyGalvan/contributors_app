export interface CountryResponse {
  id: number;
  name: string;
  code: string;
  state: number;
  createdBy: number;
  updatedBy: number | null;
  createdAt: string;
  updatedAt: string | null;
}
