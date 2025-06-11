import * as Joi from 'joi';

type MongoConfig = {
  host: string;
  name: string;
  username: string;
  password: string;
  port: number;
};

export const validationSchema = Joi.object<MongoConfig>({
  host: Joi.string().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  port: Joi.number().required(),
});
