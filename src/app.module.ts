import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { getConfigModule } from './config/app.config';
import { PriorityModule } from './priority/priority.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModule()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    TaskModule,
    PriorityModule,
    StatusModule,
  ],
})
export class AppModule {}
