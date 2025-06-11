import { Expose, Transform, Type } from 'class-transformer';
import { ReviewsDocument } from '../schemas';

class Data {
  @Expose()
  @Transform(({ obj }) => (obj as ReviewsDocument)._id)
  id: string;

  @Expose()
  rating: number;

  @Expose()
  comment: string;

  @Expose()
  bookId: string;
}

export class ReviewDto {
  @Expose()
  @Type(() => Data)
  data: Data;
}
