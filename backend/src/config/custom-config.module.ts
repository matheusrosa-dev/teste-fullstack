import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { apiConfig, dbConfig, validationSchema } from './custom-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig, dbConfig],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
})
export class CustomConfigModule {}
