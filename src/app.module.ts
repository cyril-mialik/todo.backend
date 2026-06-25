import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './common/config/typeorm.config';
import { getConfigModule } from './common/config/app.config';
import { PriorityModule } from './priority/priority.module';

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
  ],
})
export class AppModule {}
