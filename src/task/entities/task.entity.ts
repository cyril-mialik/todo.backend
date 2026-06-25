import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Status } from '../types';
import { PriorityEntity } from 'src/priority/entities/priotiry.entity';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.CREATED,
  })
  status!: Status;

  @ManyToOne(() => PriorityEntity, { nullable: true })
  @JoinColumn({ name: 'priority_id' })
  priority!: PriorityEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
