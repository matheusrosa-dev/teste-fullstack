import mongoose from 'mongoose';
import { validationSchema } from './validation-schema';

import 'dotenv/config';
import { BooksSchema } from '../apps/books/schemas';
import { ReviewsSchema } from '../apps/reviews/schemas';
import { BOOKS_MOCK, REVIEWS_MOCK } from './mock';

async function seed() {
  const env = await validationSchema.validateAsync({
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  const { host, name, username, password, port } = env;

  await mongoose.connect(
    `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`,
  );

  const Books = mongoose.model('Books', BooksSchema);
  const Reviews = mongoose.model('Reviews', ReviewsSchema);

  await Books.deleteMany();
  await Reviews.deleteMany();

  const books = await Promise.all(
    BOOKS_MOCK.map((book) =>
      Books.create({
        title: book.title,
        author: book.author,
        description: book.description,
      }),
    ),
  );

  for (const book of books) {
    await Promise.all(
      REVIEWS_MOCK.map((review) =>
        Reviews.create({
          bookId: book._id,
          comment: review.comment,
          rating: Math.floor(Math.random() * 5) + 1,
        }),
      ),
    );
  }

  console.log('Seeding complete.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
