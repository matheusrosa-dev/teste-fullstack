import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  author: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;
}
