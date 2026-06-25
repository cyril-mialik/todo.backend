import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { PriorityEntity } from 'src/priority/entities/priotiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, PriorityEntity])],
  controllers: [TaskController],
  providers: [TaskService, PriorityEntity],
})
export class TaskModule {}
