import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Books, BooksDocument } from './schemas';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private booksModel: Model<BooksDocument>,
  ) {}

  async create(data: CreateBookDto) {
    const book = await this.booksModel.create(data);

    return {
      data: book,
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
