import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Books, BooksDocument } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private bookModel: Model<BooksDocument>,
  ) {}

  async create(data: CreateBookDto) {
    return `This action adds a new book`;
  }

  async findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
