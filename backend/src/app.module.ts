import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { CustomConfigModule } from './config/custom-config.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [CustomConfigModule, MongoModule, BooksModule],
})
export class AppModule {}
