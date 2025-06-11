import { Module } from '@nestjs/common';
import { BooksModule } from './apps/books/books.module';
import { CustomConfigModule } from './config/custom-config.module';
import { MongoModule } from './providers/mongo/mongo.module';
import { ReviewsModule } from './apps/reviews/reviews.module';

@Module({
  imports: [CustomConfigModule, MongoModule, BooksModule, ReviewsModule],
})
export class AppModule {}
