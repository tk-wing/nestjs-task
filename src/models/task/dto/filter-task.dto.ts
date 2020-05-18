import { IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterTaskDto {

  @IsOptional()
  @Transform(listId => parseInt(listId))
  @IsNumber()
  listId?: number;
}
