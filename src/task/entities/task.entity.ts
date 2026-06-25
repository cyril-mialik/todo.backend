import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PriorityEntity } from 'src/priority/entities/priotiry.entity';
import { StatusEntity } from 'src/status/entities/status.entity';

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

  @ManyToOne(() => PriorityEntity, { nullable: true })
  @JoinColumn({ name: 'priority_id' })
  priority!: PriorityEntity | null;

  @ManyToOne(() => StatusEntity, { nullable: true })
  @JoinColumn({ name: 'status_id' })
  status!: StatusEntity | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
