
import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Project {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column({ length: 50 })
  public title: string;

  @Column({ length: 50 })
  public description: string;

  // TODO: relation, delete field?
  @Column({ length: 50 })
  public managerName: string;

  // TODO: relation
  @Column()
  public managerId: string;

  // TODO: relation, delete field?
  @Column()
  public managerEmail: string;

  @Column()
  public cost: string;

  @Column()
  public dateStarted: Date;

  @Column()
  public dateEnded: Date;

  @Column()
  public videoUrl: string;

  @Column()
  public imageUrl: string;

  // TODO: type: [Schema.Types.ObjectId]
  @Column()
  public taskIds: string[];

  @Column()
  public donations: string[];

  @Column()
  public totalDonationsReceived: string[];
}
