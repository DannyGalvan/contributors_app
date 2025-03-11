import { Center } from './Center';
import { Company } from './Company';

export interface Location {
  id: number;
  centerId: string;
  description: string;
  address: string;
  departmentId: number;
  municipalityId: number;
  zoneId: number;
  sectorId: number;
  deliveryTime: string;
  notes: string;
  latitude: number;
  longitude: number;
  companyId: number;
  date: string;
  user: string;
  state: number;
  budget: number;
  limit: number;
  dischargeDate: string;
  nMaterials: number;
  visa: number;
  signed: number;
  pressValidation: number;
  personalType: string;
  personalAmount: number;
  contact: number;
  deliveryOrder: number;
  initialDay: number;
  beforeOperation: number;
  finalDay: number;
  montOfOperation: number;
  billable: number;
  initialDate: string;
  center: Center | null;
}
