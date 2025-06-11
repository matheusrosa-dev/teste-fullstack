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
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto, CreateBookDto, UpdateBookDto } from './dtos';
import { Serialize } from '../interceptors';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Serialize(BookDto)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @Serialize(BookDto)
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.booksService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @Serialize(BookDto)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @Serialize(BookDto)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
