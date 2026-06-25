/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export function getConfigModule(): ConfigModuleOptions {
  return {
    isGlobal: true,
    envFilePath: [
      '.env',
      `.env.${process.env.NODE_ENV || 'development'}.local`,
    ],
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
      PORT: Joi.number().default(3000),

      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().default(5432),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),

      PGADMIN_EMAIL: Joi.string().email(),
      PGADMIN_PASSWORD: Joi.string(),
      PGADMIN_PORT: Joi.number().default(5050),
    }),
    validationOptions: {
      abortEarly: false,
    },
  };
}
