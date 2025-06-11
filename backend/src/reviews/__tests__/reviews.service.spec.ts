import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../reviews.service';
import { getModelToken } from '@nestjs/mongoose';
import { Reviews, ReviewsDocument } from '../schemas';
import { NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { BooksService } from '../../books/books.service';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let model: Model<ReviewsDocument>;
  let booksService: BooksService;

  const reviewId = new Types.ObjectId().toHexString();
  const bookId = new Types.ObjectId().toHexString();

  const mockReview = {
    _id: reviewId,
    bookId,
    comment: 'Very good!',
    rating: 5,
    deleteOne: jest.fn().mockResolvedValue(true),
  };

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockReview),
    findById: jest.fn().mockResolvedValue(mockReview),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockReview),
  };

  const mockBooksService = {
    findOne: jest.fn().mockResolvedValue({ data: {} }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getModelToken(Reviews.name),
          useValue: mockModel,
        },
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    model = module.get(getModelToken(Reviews.name));
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() should return created review', async () => {
    const result = await service.create(bookId, {
      comment: 'Very good!',
      rating: 5,
    });

    expect(booksService.findOne).toHaveBeenCalledWith(bookId);
    expect(model.create).toHaveBeenCalled();
    expect(result.data).toEqual(mockReview);
  });

  it('create() should throw if bookId is invalid', async () => {
    await expect(
      service.create('invalid', {
        comment: 'Bad',
        rating: 1,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('findOne() should return one review', async () => {
    const result = await service.findOne(reviewId);
    expect(result.data._id).toBe(reviewId);
  });

  it('findOne() should throw if id is invalid', async () => {
    await expect(service.findOne('invalid')).rejects.toThrow(NotFoundException);
  });

  it('update() should return updated review', async () => {
    const result = await service.update(reviewId, {
      comment: 'Updated',
      rating: 4,
    });

    expect(result.data).toEqual(mockReview);
  });

  it('update() should throw if id is invalid', async () => {
    await expect(
      service.update('invalid', {
        comment: 'Updated',
        rating: 4,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('remove() should delete review', async () => {
    model.findById = jest.fn().mockResolvedValue(mockReview);

    await expect(service.remove(reviewId)).resolves.toBeUndefined();
    expect(mockReview.deleteOne).toHaveBeenCalled();
  });

  it('remove() should throw if id is invalid', async () => {
    await expect(service.remove('invalid')).rejects.toThrow(NotFoundException);
  });
});
