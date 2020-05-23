import { IsNotEmpty, IsOptional, IsDate, IsInt } from "class-validator";
import { Type, Transform } from 'class-transformer';
import { ICreateTaskDto } from '@/models/task/dto/task.dto';

export class CreateTaskDto implements ICreateTaskDto {
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
