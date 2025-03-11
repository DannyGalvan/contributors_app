export interface OvertimeResponse {
  id: number;
  contributorId: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  numberOfHours: number;
  locationId: number;
  locationName?: string;
  state: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
  updatedBy: number | null;
}
