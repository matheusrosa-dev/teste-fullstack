import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, ReviewDto, UpdateReviewDto } from './dtos';
import { Serialize } from '../../interceptors';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':bookId')
  @Serialize(ReviewDto)
  create(
    @Param('bookId') bookId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(bookId, createReviewDto);
  }

  @Get('/book/:bookId')
  @Serialize(ReviewDto)
  findByBookId(@Param('bookId') bookId: string) {
    return this.reviewsService.findByBookId(bookId);
  }

  @Get(':id')
  @Serialize(ReviewDto)
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Put(':id')
  @Serialize(ReviewDto)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
