import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from './schemas';
import { Reviews, ReviewsSchema } from '../reviews/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Books.name, schema: BooksSchema },
      { name: Reviews.name, schema: ReviewsSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
