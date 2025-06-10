import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BooksDocument = Books & Document;

@Schema()
export class Books {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true }) author: string;

  @Prop({ required: true }) genre: string;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
