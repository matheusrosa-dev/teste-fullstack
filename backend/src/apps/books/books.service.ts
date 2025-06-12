import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Books, BooksDocument } from './schemas';
import { isValidObjectId, Model, PipelineStage, Types } from 'mongoose';
import { Reviews, ReviewsDocument } from '../reviews/schemas';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private booksModel: Model<BooksDocument>,
    @InjectModel(Reviews.name) private reviewsModel: Model<ReviewsDocument>,
  ) {}

  async create(data: CreateBookDto) {
    const book = await this.booksModel.create(data);

    return {
      data: book,
    };
  }

  async findTopRated() {
    const aggregationPipeline: PipelineStage[] = [
      {
        $group: {
          _id: '$bookId',
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
      { $sort: { avgRating: -1, totalReviews: -1 } },
    ];

    const books = await this.reviewsModel.aggregate([
      ...aggregationPipeline,
      { $limit: 10 },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book',
        },
      },
      { $unwind: '$book' },
      {
        $project: {
          _id: '$book._id',
          title: '$book.title',
          author: '$book.author',
          description: '$book.description',
          avgRating: 1,
          totalReviews: 1,
        },
      },
    ]);

    return {
      data: books.map((item) => ({
        ...item,
        avgRating: Number(item.avgRating.toFixed(1)),
      })),
    };
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      this.booksModel.find().skip(skip).limit(limit).exec(),
      this.booksModel.countDocuments(),
    ]);

    return {
      data: {
        items: books,

        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Book not found');
    }

    const book = await this.booksModel.findById(id);

    const reviews = await this.reviewsModel.aggregate([
      {
        $match: {
          bookId: new Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: '$bookId',
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      data: {
        ...book.toJSON(),
        avgRating: Number(reviews[0]?.avgRating.toFixed(1)),
        totalReviews: reviews[0]?.totalReviews,
      },
    };
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Book not found');
    }

    const book = await this.booksModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      data: book,
    };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Book not found');
    }

    const book = await this.booksModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await book.deleteOne();
  }
}
