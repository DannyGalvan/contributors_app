import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Overtime {
  @PrimaryColumn('int', { generated: true })
  id?: number;
  @Column('int')
  contributorId: number;
  @Column('varchar')
  date: string;
  @Column('varchar')
  startTime: string;
  @Column('varchar')
  endTime: string;
  @Column('varchar')
  reason: string;
  @Column('int')
  locationId: number;
  @Column('int')
  state: number;
  @Column('varchar')
  locationName: string;
}
