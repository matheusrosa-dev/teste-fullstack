import { Expose, Transform, Type } from 'class-transformer';
import { BooksDocument } from '../schemas';

class Item {
  @Expose()
  @Transform(({ obj }) => (obj as BooksDocument)._id)
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  author: string;
}

class Meta {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  totalPages: number;
}

class Data {
  @Expose()
  @Transform(({ obj }) => (obj as BooksDocument)._id)
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  author: string;

  @Expose()
  avgRating: number;

  @Expose()
  totalReviews: number;

  @Expose()
  @Type(() => Item)
  items: Item[];

  @Expose()
  @Type(() => Meta)
  meta: Meta;
}

export class BookDto {
  @Expose()
  @Type(() => Data)
  data: Data;
}
