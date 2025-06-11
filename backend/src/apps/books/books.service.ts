import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Books, BooksDocument } from './schemas';
import { isValidObjectId, Model, PipelineStage } from 'mongoose';
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

  async findTopRated(page: number, limit: number) {
    const skip = (page - 1) * limit;

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

    const totalAgg = await this.reviewsModel.aggregate(
      aggregationPipeline.concat({ $count: 'total' }),
    );

    const totalCount = totalAgg[0]?.total ?? 0;

    const books = await this.reviewsModel.aggregate([
      ...aggregationPipeline,
      { $skip: skip },
      { $limit: limit },
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
      data: {
        items: books,
        meta: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
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

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      data: book,
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
