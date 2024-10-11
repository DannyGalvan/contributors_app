import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SessionStorage {
  @PrimaryColumn('varchar')
  key: string;
  @Column('varchar')
  value: string;
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
