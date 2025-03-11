export interface OvertimeRequest {
  id?: number;
  contributorId?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  reason?: string;
  numberOfHours?: number;
  locationId?: number;
  state?: number;
}
