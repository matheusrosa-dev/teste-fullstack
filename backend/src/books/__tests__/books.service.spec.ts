import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Books, BooksDocument } from '../schemas';
import { NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<BooksDocument>;

  const bookId = new Types.ObjectId().toHexString();
  const mockBook = {
    _id: bookId,
    title: 'Book Title',
    author: 'Author Name',
    description: 'Some desc',
  };

  const mockBookModel = {
    create: jest.fn().mockResolvedValue(mockBook),
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([mockBook]),
    }),
    countDocuments: jest.fn().mockResolvedValue(1),
    findById: jest.fn().mockResolvedValue(mockBook),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockBook),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Books.name),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get(getModelToken(Books.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() should return created book', async () => {
    const result = await service.create({
      title: mockBook.title,
      author: mockBook.author,
      description: mockBook.description,
    });

    expect(model.create).toHaveBeenCalled();
    expect(result.data).toEqual({
      id: mockBook._id,
      title: mockBook.title,
      author: mockBook.author,
      description: mockBook.description,
    });
  });

  it('findAll() should return paginated books', async () => {
    const result = await service.findAll(1, 10);

    expect(result.data.items.length).toBe(1);
    expect(result.data.meta.total).toBe(1);
  });

  it('findOne() should return one book', async () => {
    const result = await service.findOne(bookId);
    expect(result.data.id).toBe(bookId);
  });

  it('findOne() should throw if invalid id', async () => {
    await expect(service.findOne('invalid')).rejects.toThrow(NotFoundException);
  });

  it('update() should return updated book', async () => {
    const result = await service.update(bookId, {
      title: 'Updated Title',
      author: 'Updated Author',
      description: 'Updated Description',
    });
    expect(result.data.title).toBe(mockBook.title);
  });

  it('update() should throw if id is invalid', async () => {
    await expect(
      service.update('invalid', {
        title: 'Updated Title',
        author: 'Updated Author',
        description: 'Updated Description',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('remove() should delete book', async () => {
    model.findById = jest.fn().mockResolvedValue({
      ...mockBook,
      deleteOne: jest.fn().mockResolvedValue(true),
    });

    await expect(service.remove(bookId)).resolves.toBeUndefined();
  });

  it('remove() should throw if id is invalid', async () => {
    await expect(service.remove('invalid')).rejects.toThrow(NotFoundException);
  });
});
