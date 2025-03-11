import { Company } from './Company';
import { Location } from './Location';

export interface PermitterMarks {
  id: number;
  companyCode: number;
  employeeCode: string;
  centerId: string;
  locationId: number;
  state: number;
  center: null;
  location: null | Location;
  company: null | Company;
  employee: null;
}
