import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto, UpdateReviewDto } from './dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Reviews, ReviewsDocument } from './schemas';
import { isValidObjectId, Model, Types } from 'mongoose';
import { BooksService } from '../books/books.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name) private reviewsModel: Model<ReviewsDocument>,
    private booksService: BooksService,
  ) {}

  async create(bookId: string, createReviewDto: CreateReviewDto) {
    if (!isValidObjectId(bookId)) {
      throw new NotFoundException('Book not found');
    }

    await this.booksService.findOne(bookId);

    const review = await this.reviewsModel.create({
      bookId,
      comment: createReviewDto.comment,
      rating: createReviewDto.rating,
    });

    return {
      data: review,
    };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Review not found');
    }

    const review = await this.reviewsModel.findById(id);

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return {
      data: review,
    };
  }

  async findByBookId(bookId: string) {
    if (!isValidObjectId(bookId)) {
      throw new NotFoundException('Book not found');
    }

    await this.booksService.findOne(bookId);

    const reviews = await this.reviewsModel.find({
      bookId: new Types.ObjectId(bookId),
    });

    console.log(reviews);

    return {
      data: reviews,
    };
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Review not found');
    }

    const review = await this.reviewsModel.findByIdAndUpdate(
      id,
      updateReviewDto,
      {
        new: true,
      },
    );

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return {
      data: review,
    };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Review not found');
    }

    const review = await this.reviewsModel.findById(id);

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await review.deleteOne();
  }
}
