import { Module } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { PriorityController } from './priority.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/entities/task.entity';
import { PriorityEntity } from './entities/priotiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, PriorityEntity])],
  controllers: [PriorityController],
  providers: [PriorityService],
})
export class PriorityModule {}
