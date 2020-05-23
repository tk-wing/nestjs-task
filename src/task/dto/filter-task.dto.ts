import { IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { IFilterTaskDto } from '@/models/task/dto/task.dto';

export class FilterTaskDto implements IFilterTaskDto {

  @IsOptional()
  @Transform(listId => parseInt(listId))
  @IsNumber()
  listId!: number;
}
