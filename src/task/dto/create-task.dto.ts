import { ICreateTaskDto } from '@/models/task/dto/task.dto';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional } from "class-validator";

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
