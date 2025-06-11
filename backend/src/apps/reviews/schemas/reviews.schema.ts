import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Books } from '../../books/schemas';

export type ReviewsDocument = Reviews & Document;

@Schema()
export class Reviews {
  @Prop({ type: Types.ObjectId, ref: Books.name, required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  rating: number;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);
