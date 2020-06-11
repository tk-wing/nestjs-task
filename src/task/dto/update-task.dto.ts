import { IUpdateTaskDto } from '@/models/task/dto/task.dto';
import { Transform, Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto implements IUpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @Transform(listId => parseInt(listId))
  @IsInt()
  listId!: number

  @IsOptional()
  @Type( () => Date)
  @IsDate()
  @IsNotEmpty()
  expiredAt!: Date;
}
