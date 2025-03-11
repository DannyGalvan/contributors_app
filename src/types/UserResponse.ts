export interface UserResponse {
  id: number;
  dpi: string;
  name: string;
  square: string;
  employeeCode: number;
  businessCode: number;
  entryDate: string;
  recoveryToken: string;
  state: number;
  reset: boolean;
  number: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
  updatedBy: number | null;
}
