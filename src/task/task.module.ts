import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { PriorityEntity } from 'src/priority/entities/priotiry.entity';
import { StatusEntity } from 'src/status/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, PriorityEntity, StatusEntity]),
  ],
  controllers: [TaskController],
  providers: [TaskService, PriorityEntity, StatusEntity],
})
export class TaskModule {}
