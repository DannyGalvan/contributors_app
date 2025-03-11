export interface VacationResponse {
  id: number;
  applicationDate: string;
  contributorId: number;
  period: string;
  startDate: string;
  endDate: string;
  days: number;
  vacationType: number;
  state: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
  updatedBy: number | null;
}
