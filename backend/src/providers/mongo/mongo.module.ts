import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CustomConfigModule } from '../../config/custom-config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const username = config.get<string>('db.username');
        const password = config.get<string>('db.password');
        const host = config.get<string>('db.host');
        const port = config.get<number>('db.port');
        const name = config.get<string>('db.name');

        return {
          uri: `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`,
        };
      },
    }),
  ],
})
export class MongoModule {}
