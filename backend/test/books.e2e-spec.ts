import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Books (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return an array of top books ordered by rating and number of reviews', async () => {
    const response = await request(app.getHttpServer()).get('/books/top');

    expect(response.status).toBe(200);

    const reviews = response.body.data.map((book) => ({
      avgRating: book.avgRating,
      totalReviews: book.totalReviews,
    }));

    const sorted = [...reviews].sort((a, b) => {
      if (a.avgRating > b.avgRating) return -1;
      if (a.avgRating < b.avgRating) return 1;
      if (a.totalReviews > b.totalReviews) return -1;
      if (a.totalReviews < b.totalReviews) return 1;
      return 0;
    });

    expect(response.body.data.length).toBeGreaterThan(0);
    expect(reviews).toEqual(sorted);
  });

  afterAll(async () => {
    await app.close();
  });
});
