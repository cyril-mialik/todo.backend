import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres' as const,
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    port: configService.getOrThrow<number>('POSTGRES_PORT'),
    username: configService.getOrThrow<string>('POSTGRES_USER'),
    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    database: configService.getOrThrow<string>('POSTGRES_DB'),
    entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
    migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
    migrationsRun: false,
    synchronize: configService.get<string>('NODE_ENV') === 'development',
    logging: configService.get<string>('NODE_ENV') === 'development',
  };
}
