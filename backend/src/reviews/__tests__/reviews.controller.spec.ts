import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from '../reviews.controller';
import { ReviewsService } from '../reviews.service';
import { CreateReviewDto, UpdateReviewDto } from '../dtos';

describe('ReviewsController', () => {
  let controller: ReviewsController;

  const mockService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
  });

  it('should create a review', async () => {
    const dto: CreateReviewDto = {
      comment: 'Great book!',
      rating: 5,
    };

    const result = { data: { id: '123', ...dto, bookId: 'abc' } };
    mockService.create.mockResolvedValue(result);

    const response = await controller.create('abc', dto);
    expect(response).toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith('abc', dto);
  });

  it('should return a review by id', async () => {
    const result = { data: { id: '123', comment: 'Nice', rating: 4 } };
    mockService.findOne.mockResolvedValue(result);

    const response = await controller.findOne('123');
    expect(response).toEqual(result);
    expect(mockService.findOne).toHaveBeenCalledWith('123');
  });

  it('should update a review', async () => {
    const dto: UpdateReviewDto = { comment: 'Updated comment', rating: 4 };
    const result = { data: { id: '123', ...dto } };

    mockService.update.mockResolvedValue(result);

    const response = await controller.update('123', dto);
    expect(response).toEqual(result);
    expect(mockService.update).toHaveBeenCalledWith('123', dto);
  });

  it('should delete a review', async () => {
    mockService.remove.mockResolvedValue(undefined);

    const response = await controller.remove('123');
    expect(response).toBeUndefined();
    expect(mockService.remove).toHaveBeenCalledWith('123');
  });
});
