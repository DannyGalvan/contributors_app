export interface VacationRequest {
  contributorId?: number;
  employeeCode?: number;
  period?: string;
  startDate?: string;
  endDate?: string;
  vacationType?: number;
  state?: number;
}
