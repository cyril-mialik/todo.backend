import type { Priority } from 'src/common/types';
import { TaskEntity } from 'src/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'priorities' })
export class PriorityEntity {
  @PrimaryColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 128,
    unique: true,
  })
  name!: Priority;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => TaskEntity, (task) => task.priority)
  tasks?: TaskEntity[];
}
