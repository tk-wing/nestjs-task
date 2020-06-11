import { IFilterTaskDto } from '@/models/task/dto/task.dto';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterTaskDto implements IFilterTaskDto {

  @IsOptional()
  @Transform(listId => parseInt(listId))
  @IsNumber()
  listId!: number;
}
