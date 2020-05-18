import { IsNotEmpty, IsOptional, IsDate, IsInt } from "class-validator";
import { Type, Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  @Transform(listId => parseInt(listId))
  @IsInt()
  listId!: number

  @IsOptional()
  @Type( () => Date)
  @IsDate()
  @IsNotEmpty()
  expiredAt!: Date;
}
