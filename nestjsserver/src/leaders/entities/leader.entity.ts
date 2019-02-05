
import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Leader {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column({ length: 50 })
  public name: string;
}
