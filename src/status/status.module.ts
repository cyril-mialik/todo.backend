import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/entities/task.entity';
import { StatusEntity } from './entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, StatusEntity])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
