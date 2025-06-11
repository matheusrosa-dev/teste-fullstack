import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { CreateBookDto, UpdateBookDto } from '../dtos';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBooks = [
    {
      _id: '1',
      title: 'Book 1',
      author: 'Author 1',
      description: 'Desc 1',
    },
    {
      _id: '2',
      title: 'Book 2',
      author: 'Author 2',
      description: 'Desc 2',
    },
  ];

  const mockBooksService = {
    findAll: jest.fn().mockResolvedValue(mockBooks),
    findOne: jest.fn().mockResolvedValue(mockBooks[0]),
    create: jest.fn().mockResolvedValue(mockBooks[0]),
    update: jest.fn().mockResolvedValue(mockBooks[0]),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should return an array of books', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockBooks);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a book', async () => {
    const id = '1';
    const result = await controller.findOne(id);
    expect(result).toEqual(mockBooks[0]);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should create a book', async () => {
    const dto: CreateBookDto = {
      title: 'Book 3',
      author: 'Author 3',
      description: 'Desc 3',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockBooks[0]);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should update a book', async () => {
    const id = '1';
    const dto: UpdateBookDto = {
      title: 'Updated Book 1',
      author: 'Updated Author 1',
      description: 'Updated Desc 1',
    };
    const result = await controller.update(id, dto);
    expect(result).toEqual(mockBooks[0]);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove a book', async () => {
    const id = '1';
    await controller.remove(id);

    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
