import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LocationStore {
  @PrimaryColumn('int', { generated: false })
  Id: number;
  @Column('int')
  companyCode: number;
  @Column('varchar')
  employeeCode: string;
  @Column('varchar')
  centerId: string;
  @Column('int')
  locationId: number;
  @Column('int')
  state: number;
  @Column('varchar')
  location: string;
  @Column('varchar')
  company: string;
}
