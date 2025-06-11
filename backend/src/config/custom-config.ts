import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import 'dotenv/config';

export const apiConfig = registerAs('api', () => ({
  port: Number(process.env.API_PORT),
}));

export const dbConfig = registerAs('db', () => ({
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
}));

export const validationSchema = Joi.object({
  API_PORT: Joi.number().optional().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
});
